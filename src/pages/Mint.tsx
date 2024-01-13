import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import tickets from "../imgs/tickets.png";
import { useChainId, useAccount, useContractReads } from "wagmi";
import { abis } from "../constants/constants";
import { deploymentAddresses } from "../constants/constants";
import { baseSepolia } from "wagmi/chains";
import { Purchase } from "../components/Purchase";

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
          ticketSupply={ticketSupply}
          setTicketBalance={setTicketBalance}
          setTicketSupply={setTicketSupply}
        />
      </div>
      <Footer />
    </div>
  );
};
