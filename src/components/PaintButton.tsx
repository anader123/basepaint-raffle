import React, { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  abis,
  deploymentAddresses,
  BUTTON_CLASS,
} from "../constants/constants";
import { ConnectKitButton } from "connectkit";

type Point2D = { x: number; y: number };
type PixelColor = number;

const toContractCallPixels = (
  pixels: Map<Point2D, PixelColor>
): `0x${string}` => {
  if (!pixels || pixels.size === 0) {
    return `0x`;
  }

  let hex = "";
  pixels.forEach((color, point) => {
    hex += [point.x, point.y, color]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("");
  });

  return `0x${hex}`;
};

const ContractWriteHandler: React.FC<{
  pixels: string;
}> = ({ pixels }) => {
  const [isSaved, setIsSaved] = useState(false);
  const prepare = usePrepareContractWrite({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "paint",
    args: [pixels],
  });

  const write = useContractWrite(prepare.config);
  const error = prepare.error || write.error;
  const hash = write.data?.hash;

  useWaitForTransaction({
    hash,
    confirmations: 1,
    onSuccess: (x) => {
      setIsSaved(true);
    },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      {isSaved ? (
        <p className="py-2 text-gray-300">Successfully saved onchain 🔵</p>
      ) : (
        <></>
      )}
      <button
        disabled={!!error}
        onClick={() => {
          write?.write?.();
        }}
        className={`${BUTTON_CLASS} px-10 mt-2`}
      >
        Save Onchain
      </button>
      {error ? (
        <p className="w-[50%] text-sm text-red-600 text-center mt-2">
          {`${error.message.slice(0, 100)}...`}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

const PaintButton: React.FC<{
  pixelMap: Map<Point2D, PixelColor>;
}> = ({ pixelMap }) => {
  const [pixels, setPixels] = useState<string>("");
  const [shouldWrite, setShouldWrite] = useState<boolean>(false);

  const handleClick = () => {
    const newPixels = toContractCallPixels(pixelMap);
    setPixels(newPixels);
    setShouldWrite(true);
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, unsupported }) => {
        if (!isConnected || unsupported) {
          return (
            <button
              type="button"
              className={`${BUTTON_CLASS} px-4`}
              onClick={show}
              disabled={isConnecting}
            >
              Connect Wallet
            </button>
          );
        }
        return (
          <div>
            {shouldWrite ? (
              <ContractWriteHandler pixels={pixels} />
            ) : (
              <button
                onClick={handleClick}
                className={`${BUTTON_CLASS} px-10 mt-2`}
              >
                Paint
              </button>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default React.memo(PaintButton);
