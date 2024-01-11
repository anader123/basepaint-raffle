import classNames from "classnames";

export const BUTTON_CLASS = classNames(
  "font-viga text-white font-bold bg-black hover:opacity-[55%] rounded-md py-2 cursor-pointer drop-shadow-lg block text-center",
  "disabled:saturate-0 disabled:cursor-not-allowed"
);

export const DEPLOYMENT_ADDRESSES = {
  // Base-Sepolia Testnet
  basepaintBrush: "0x67303ec67f723c807fffaf796c2c489327d3c756",
  basepaintCore: "0xd1f0b838a0dc3a1a77cd2a4fb51a346aeccd2f5d",
  basepaintRaffle: "0xe9e6c9336e6f2df3dc4e3c8b285dad2fe7a625e0",
};
