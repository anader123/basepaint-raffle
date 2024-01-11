import classNames from "classnames";

export const BUTTON_CLASS = classNames(
  "font-viga text-white font-bold bg-black hover:opacity-[55%] rounded-md py-2 cursor-pointer drop-shadow-lg block text-center",
  "disabled:saturate-0 disabled:cursor-not-allowed"
);

export const DEPLOYMENT_ADDRESSES = {
  // Base-Sepolia Testnet
  basepaintCore: "0x67303ec67f723c807fffaf796c2c489327d3c756",
  basepaintRaffle: "0x49b0ec44a76c2bb400cae913dab3db142097d0f6",
  basepaintBrush: "0x67303ec67f723c807fffaf796c2c489327d3c756",
};
