import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Draw } from "../components/Draw";
import { useToday } from "../hooks/useToday";
import { abis, deploymentAddresses } from "../constants/constants";
import { useContractRead } from "wagmi";

export const Paint = () => {
  const today = useToday();
  const [winner, setWinner] = useState("0x0");

  const winnerData = useContractRead({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "winners",
    args: [today],
  });

  const winningTokenId = Number(winnerData.data);

  const winningAddressData = useContractRead({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "ownerOf",
    args: [winningTokenId],
  });

  useEffect(() => {
    if (winningAddressData.data) {
      setWinner(winningAddressData.data as string);
    }
  }, [winningAddressData.data]);

  return (
    <div className="w-full">
      <Header />
      <div>
        <h1 className="text-white text-3xl mb-4 mt-6 text-center">
          BasePaint Day #{today}
        </h1>
      </div>

      {winningTokenId > 0 ? (
        <div className="w-full">
          <div className="text-gray-400 flex flex-wrap justify-center gap-4">
            <p>Winning Ticket: #{winningTokenId}</p>
            <p>Owner: {shortAddress(winner)}</p>
          </div>
          <Draw />
        </div>
      ) : (
        <div className="w-full text-white text-4xl text-center mt-8">
          <p>Raffle hasn't been drawn for this day.</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

function shortAddress(address?: string) {
  if (!address) return "N/A";
  return address.substring(0, 6) + "…" + address.substring(address.length - 4);
}
