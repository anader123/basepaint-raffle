import { useState } from "react";
import { Header } from "../components/Header";
import { BUTTON_CLASS } from "../constants/constants";
import { ConnectKitButton } from "connectkit";
import tickets from "../imgs/tickets.png";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useChainId,
  useAccount,
} from "wagmi";

import { abis } from "../constants/constants";

import { deploymentAddresses } from "../constants/constants";
import { formatEther } from "viem";

export const Mint = () => {
  const chainId = useChainId();
  const { address } = useAccount();

  const price = useContractRead({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "ticketPrice",
    chainId,
  });

  return (
    <div className="h-full w-full">
      <Header />
      <div className="w-full text-center mt-8 flex flex-col items-center">
        <img
          className="border rounded-xl md:w-[25%] sm:w-[40%] w-[90%] sm:my-10 my-3"
          src={tickets}
          alt="ticket"
        />

        <Purchase
          price={price.data as bigint}
          address={address ?? "0x0"}
          chainId={chainId}
        />
      </div>
    </div>
  );
};

export const Purchase = ({
  price,
  address,
  chainId,
}: {
  price: bigint;
  address: `0x${string}`;
  chainId: number;
}) => {
  const [amount, setAmount] = useState(1);

  const prepare = usePrepareContractWrite({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "buyTickets",
    args: [address, BigInt(amount)],
    value: price * BigInt(amount),
    chainId,
    enabled: !!price,
  });

  const write = useContractWrite(prepare.config);
  const error = prepare.error || write.error;

  // @ts-ignore
  const formattedPrice = Number(formatEther(price ?? 0n));

  const handleChange = (change: number) => {
    setAmount((prevAmount) => {
      if (prevAmount === 1 && change === -1) {
        return prevAmount;
      } else {
        return prevAmount + change;
      }
    });
  };

  return (
    <div className="flex flex-col items-center w-full mt-8">
      <div className="text-white flex flex-col justify-center items-between sm:w-[40%] w-[90%] gap-3">
        <div className="flex gap-12 justify-center text-xl">
          <button
            onClick={() => handleChange(-1)}
            className={`${BUTTON_CLASS} px-6`}
          >
            -
          </button>
          <button
            onClick={() => handleChange(1)}
            className={`${BUTTON_CLASS} px-6`}
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between">
            <p className="font-semibold">Amount:</p>
            <p>{amount}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Total:</p>
            <p>{formattedPrice * amount} ETH</p>
          </div>
        </div>
        <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show, unsupported }) => {
            if (!isConnected || unsupported) {
              return (
                <button
                  type="button"
                  className={BUTTON_CLASS}
                  onClick={show}
                  disabled={isConnecting}
                >
                  Connect Wallet
                </button>
              );
            }
            return (
              <div className="w-full flex flex-col justify-center">
                <button
                  onClick={() => {
                    write?.write?.();
                  }}
                  className={BUTTON_CLASS}
                >
                  Purchase
                </button>
                {error && (
                  <div
                    title={error.message}
                    className="line-clamp-2 text-red-300 font-roboto text-xs pt-4 text-center"
                  >
                    <p>{error.message}</p>
                  </div>
                )}
              </div>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
    </div>
  );
};
