import { useState } from "react";
import { BUTTON_CLASS } from "../constants/constants";
import { abis } from "../constants/constants";
import { deploymentAddresses } from "../constants/constants";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import SuccessModal from "../components/SuccessModal";
import { ConnectKitButton } from "connectkit";
import { formatEther } from "viem";

export const Purchase = ({
  price,
  address,
  chainId,
  ticketSupply,
  ticketBalance,
  setTicketBalance,
  setTicketSupply,
}: {
  price: string;
  address: `0x${string}`;
  chainId: number;
  ticketBalance: number;
  ticketSupply: number;
  setTicketBalance: React.Dispatch<React.SetStateAction<number>>;
  setTicketSupply: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [amount, setAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prepare = usePrepareContractWrite({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "buyTickets",
    args: [address, BigInt(amount)],
    value: BigInt(price) * BigInt(amount),
    chainId,
    enabled: !!price,
  });

  // @ts-ignore
  const formattedPrice = Number(formatEther(price ?? 0n));

  const write = useContractWrite(prepare.config);
  const error = prepare.error || write.error;
  const hash = write.data?.hash;

  const tx = useWaitForTransaction({
    hash,
    confirmations: 1,
    onSuccess: (x) => {
      setTicketBalance(ticketBalance + amount);
      setTicketSupply(ticketSupply + amount);
      setAmount(1);
      setIsModalOpen(true);
    },
  });

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
        <SuccessModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel={"Purchase Complete"}
          message={`${amount} ticket(s) successfully purchased 🎉`}
        />
      </div>
    </div>
  );
};
