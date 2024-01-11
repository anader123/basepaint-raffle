// SPDX-License-Identifier: UNLICENSED
// Author: @w1nt3r_eth
// To be clear, I (0xNader) didn't write this contract, keeping it here for reference.
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

interface IBasePaintBrush is IERC721 {
    function strengths(uint256 tokenId) external view returns (uint256);
}

contract BasePaintBrush is
    ERC721("BasePaint Brush", "BPB"),
    EIP712("BasePaint Brush", "1"),
    IBasePaintBrush,
    Ownable
{
    uint256 public totalSupply;
    mapping(uint256 => uint256) public strengths;

    address private signer;
    mapping(uint256 => bool) private nonces;
    string private baseURI = "https://basepaint.xyz/api/brush/";

    function mint(uint256 strength) public payable onlyOwner {
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
        strengths[totalSupply] = strength;
    }

    function upgrade(uint256 tokenId, uint256 strength) public payable onlyOwner {
        require(tokenId > 0 && tokenId <= totalSupply, "Invalid tokenId");

        strengths[tokenId] = strength;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setSigner(address newSigner) public onlyOwner {
        signer = newSigner;
    }

    function setBaseURI(string calldata newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    function setStrength(uint256 tokenId, uint256 strength) public onlyOwner {
        strengths[tokenId] = strength;
    }

    function withdraw() public onlyOwner {
        (bool success,) = owner().call{value: address(this).balance}(new bytes(0));
        require(success, "Transfer failed");
    }
}
