import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import raffleImg from "../imgs/raffle-img.png";
import { BUTTON_CLASS } from "../constants/constants";
import { abis, deploymentAddresses } from "../constants/constants";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useChainId,
  useWaitForTransaction,
} from "wagmi";
import { useToday } from "../hooks/useToday";
import SuccessModal from "../components/SuccessModal";

export const Raffle = () => {
  const today = useToday();
  const chainId = useChainId();
  const [isRaffleReady, setIsRaffleReady] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const winnerData = useContractRead({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "winners",
    args: [today],
    chainId,
  });

  const winningTokenId = Number(winnerData.data);

  const prepare = usePrepareContractWrite({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "startRaffle",
    chainId,
  });

  const write = useContractWrite(prepare.config);
  const error = prepare.error || write.error;
  const hash = write.data?.hash;

  const tx = useWaitForTransaction({
    hash,
    confirmations: 1,
    onSuccess: (x) => {
      const logData = x.logs[0].data;
      const winningTokenIdHex = logData.slice(0, 66);
      const winningTokenId = parseInt(winningTokenIdHex, 16);
      setSelectedWinner(winningTokenId);
      setIsRaffleReady(false);
      setIsModalOpen(true);
    },
  });

  useEffect(() => {
    if (winningTokenId !== 0) {
      setIsRaffleReady(false);
      setSelectedWinner(winningTokenId);
    } else {
      setIsRaffleReady(true);
    }
  }, [winningTokenId]);

  return (
    <div>
      <Header />
      <div className="w-full text-center sm:mt-8 mt-4 flex flex-col items-center">
        <h1 className="text-white text-4xl">Daily Raffle: Day #{today}</h1>

        <div className="flex flex-col items-center my-4 sm:w-[40%] md:w-[30%] w-[90%] gap-6">
          <p className="text-gray-400 mb-4 sm:text-md text-sm">
            Raffles take place every day and can be initiated by anyone. The
            winner will be able to paint with a 1000px brush for a day. You can
            purchase tickets to enter the raffle.
          </p>
          <img
            className="rounded-xl  border border-gray-600 border-2"
            src={raffleImg}
            alt="raffle-img"
          />
          <div className="my-6 text-white w-full">
            <SuccessModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel={"Raffle Drawn"}
              message={`Winning Ticket is TokenId #${selectedWinner} 🎉`}
            />
            {isRaffleReady ? (
              <div>
                <button
                  onClick={() => {
                    write?.write?.();
                  }}
                  className={`${BUTTON_CLASS} w-full`}
                >
                  Start Raffle
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
            ) : (
              <RaffleDrawn winner={selectedWinner} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const RaffleDrawn = ({ winner }: { winner: number }) => {
  const [hoursLeft, setHoursLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetHour = 10;
      const targetMinute = 55;
      let targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        targetHour,
        targetMinute,
        0
      );

      if (now.getTime() > targetTime.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const timeDifference = targetTime.getTime() - now.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));

      return hours;
    };

    setHoursLeft(calculateTimeLeft());
  }, []);

  return (
    <div>
      <p className="mb-4 sm:text-lg text-sm">
        Raffle drawn for today. Winning Ticket is TokenId #{winner}
      </p>
      <button disabled={true} className={`${BUTTON_CLASS} w-full bg-gray-700`}>
        Next draw in {hoursLeft} hours
      </button>
    </div>
  );
};
