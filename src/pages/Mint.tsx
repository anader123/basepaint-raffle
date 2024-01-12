import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BUTTON_CLASS } from "../constants/constants";
import { ConnectKitButton } from "connectkit";
import tickets from "../imgs/tickets.png";
import {
  useContractWrite,
  usePrepareContractWrite,
  useChainId,
  useAccount,
  useWaitForTransaction,
  useContractReads,
} from "wagmi";
import { abis } from "../constants/constants";
import { deploymentAddresses } from "../constants/constants";
import { formatEther } from "viem";
import { baseSepolia } from "wagmi/chains";

export const Mint = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const [ticketPrice, setTicketPrice] = useState("0");
  const [ticketSupply, setTicketSupply] = useState(0);
  const [ticketBalance, setTicketBalance] = useState(0);

  const raffleContract = {
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle as any,
    chainId: baseSepolia.id,
  } as const;

  const { data } = useContractReads({
    contracts: [
      {
        ...raffleContract,
        functionName: "ticketPrice",
      },
      {
        ...raffleContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...raffleContract,
        functionName: "totalSupply",
      },
    ],
    multicallAddress: "0xca11bde05977b3631167028862be2a173976ca11",
  });

  useEffect(() => {
    if (data) {
      setTicketPrice(data[0].result?.toString() || "0");
      setTicketBalance(Number(data[1].result));
      setTicketSupply(Number(data[2].result));
    }
  }, [data]);

  return (
    <div className="h-full w-full">
      <Header />
      <div className="w-full text-center mt-8 flex flex-col items-center">
        <img
          className="border rounded-xl md:w-[25%] sm:w-[40%] w-[90%] sm:my-5 my-3"
          src={tickets}
          alt="ticket"
        />

        {!address ? (
          <div className="gap-6 flex text-gray-400 font-bold">
            <p>Ticket Supply: {ticketSupply} </p>
          </div>
        ) : (
          <div className="gap-6 flex text-gray-400 font-bold">
            <p>Ticket Balance: {ticketBalance}</p>
            <p>Ticket Supply: {ticketSupply} </p>
          </div>
        )}

        <Purchase
          price={ticketPrice}
          address={address ?? "0x0"}
          chainId={chainId}
          ticketBalance={ticketBalance}
          setTicketBalance={setTicketBalance}
        />
      </div>
    </div>
  );
};

export const Purchase = ({
  price,
  address,
  chainId,
  ticketBalance,
  setTicketBalance,
}: {
  price: string;
  address: `0x${string}`;
  chainId: number;
  ticketBalance: number;
  setTicketBalance: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [amount, setAmount] = useState(1);

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
      setAmount(1);
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
      </div>
      <Footer />
    </div>
  );
};
