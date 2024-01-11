// SPDX-License-Identifier: MIT
// Author: @0xNader
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";

interface BasePaint {
    function today() external view returns (uint256);
    function authorWithdraw(uint256[] calldata indexes) external;
    function paint(uint256 day, uint256 tokenId, bytes calldata pixels) external;
}

contract BasePaintRaffle is ERC721A, Ownable {
    error NotWinner();
    error AlreadyDrawn();
    error ZeroTicketAmount();
    error IncorrectEthAmount();
    error FailedToWithdraw();
    error AlreadyClaimed();
    error NonExistentToken();
    error InvalidDay();

    using Strings for uint256;

    BasePaint public immutable basePaint;
    uint256 public ticketPrice;
    uint256 public brushId;
    string imageURI;

    mapping(uint256 => uint256) public winners;
    mapping(uint256 => bool) public claimedEarnings;

    event TicketsPurchased(address recipent, uint256 amount, uint256 price);
    event TicketPriceUpdated(uint256 prevPrice, uint256 updatedPrice);
    event RaffleWinner(uint256 winningTokenId, uint256 day);

    constructor(
        address _basePaintAddress, 
        uint256 _brushId, 
        string memory _imageURI
    ) ERC721A("BasePaint Tickets", "BPT") {
        basePaint = BasePaint(_basePaintAddress);
        brushId = _brushId;
        imageURI = _imageURI;
    }

    function startRaffle() public {
        uint256 today = basePaint.today();
        if(winners[today] != 0) revert AlreadyDrawn();
        
        uint256 semiRandomNumber = uint256(keccak256(abi.encodePacked(block.prevrandao, today)));
        uint256 winningTokenId = semiRandomNumber % this.totalSupply();
        winners[today] = winningTokenId;

        emit RaffleWinner(winningTokenId, today);
    }

    function buyTickets(address _recipient, uint256 _amount) external payable {
        if(_amount == 0) revert ZeroTicketAmount();
        if(msg.value != ticketPrice * _amount) revert IncorrectEthAmount();
        

        _mint(msg.sender, _amount);
        emit TicketsPurchased(_recipient, _amount, ticketPrice);
    }

    function paint(bytes calldata _pixels) external payable {
        uint256 today = basePaint.today();
        uint256 winningTokenId = winners[today];
        if(msg.sender != this.ownerOf(winningTokenId)) revert NotWinner();
        
        basePaint.paint(today, brushId, _pixels);
    }

    function withdawEarnings(uint256 _day) external {
        if(claimedEarnings[_day]) revert AlreadyClaimed();
        if(_day >= basePaint.today()) revert InvalidDay();

        uint256[] memory dayArr = new uint256[](1);
        dayArr[0] = _day; 

        uint256 balanceBefore = address(this).balance;
        basePaint.authorWithdraw(dayArr);
        uint256 balanceAfter = address(this).balance;

        uint256 earning = balanceAfter - balanceBefore;
        uint256 winningTokenId = winners[_day];

        address winner = this.ownerOf(winningTokenId);
        (bool sent, ) = winner.call{value: earning}("");

        if(!sent) revert FailedToWithdraw();
        claimedEarnings[_day] = true;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        if (!_exists(_tokenId)) revert NonExistentToken();

        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "BasePaint Ticket ', _tokenId.toString(), '",',
                '"description": "', "Just a ticket...", '",',
                '"image": "', imageURI, '"',
            '}'
        );
        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(dataURI)
        ));
    }

    // Admin Functions
    function updateTicketPrice(uint256 _newPrice) external onlyOwner {
        uint256 prevTicketPrice = ticketPrice;
        ticketPrice = _newPrice;

        emit TicketPriceUpdated(prevTicketPrice, _newPrice);
    }

    function withdrawTicketSales(address _recipient) external onlyOwner {
        (bool sent, ) = _recipient.call{value: address(this).balance}("");
        if(!sent) revert FailedToWithdraw();
    }

    // Override to make sure that tokenIds start 1 instead of 0
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }
}
