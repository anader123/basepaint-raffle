import hre from "hardhat";
import { parseEther } from "viem";

async function main() {
  const epochDuration = 86400;
  const brushId = 1;
  const ticketPrice = parseEther("0.0026");
  const imageURI = "ipfs://QmSQKdPUdUu7x7kKYm51rLuTGiEvsPViTUy8CMXGGTwiph";

  const brush = await hre.viem.deployContract("BasePaintBrush");
  console.log(`Brush Contract deployed to ${brush.address}`);

  const basepaint = await hre.viem.deployContract(
    "contracts/BasePaint.sol:BasePaint",
    [brush.address, epochDuration]
  );
  console.log(`BasePaint Contract deployed to ${basepaint.address}`);

  const raffle = await hre.viem.deployContract("BasePaintRaffle", [
    basepaint.address,
    brushId,
    ticketPrice,
    imageURI,
  ]);
  console.log(`Raffle Contract deployed to ${raffle.address}`);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
