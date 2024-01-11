import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import raffleImg from "../imgs/raffle-img.png";
import { BUTTON_CLASS } from "../constants/constants";
import { abis } from "../constants/constants";
import { deploymentAddresses } from "../constants/constants";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useChainId,
} from "wagmi";

export const Raffle = () => {
  const chainId = useChainId();
  const [isRaffleReady, setIsRaffleReady] = useState(true);

  const dayData = useContractRead({
    address: deploymentAddresses.basepaintCore,
    abi: abis.basePaint,
    functionName: "today",
    chainId,
  });

  const winnerData = useContractRead({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "winners",
    args: [dayData.data],
    chainId,
  });

  const day = Number(dayData.data);

  const prepare = usePrepareContractWrite({
    address: deploymentAddresses.basepaintRaffle,
    abi: abis.raffle,
    functionName: "startRaffle",
    chainId,
  });

  const write = useContractWrite(prepare.config);
  const error = prepare.error || write.error;

  useEffect(() => {
    if (Number(winnerData.data) !== 0) {
      setIsRaffleReady(false);
    }
  }, [winnerData.data]);

  return (
    <div>
      <Header />
      <div className="w-full text-center sm:mt-8 mt-4 flex flex-col items-center">
        <h1 className="text-white text-4xl">Daily Raffle</h1>

        <div className="flex flex-col items-center my-4 sm:w-[40%] md:w-[30%] w-[90%]">
          <p className="text-gray-400 mb-2 sm:text-md text-sm">
            Raffles take place every day and can be initiated by anyone. The
            winner will be able to paint with 1000px brush for a day. You must
            purchase tickets to enter the raffle.
          </p>
          <p className="mt-4 text-xl text-gray-400">Current Day: #{day}</p>

          <img
            className="rounded-xl  border border-gray-600 border-2"
            src={raffleImg}
            alt="raffle-img"
          />
          <div className="my-6 text-white w-full">
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
              <RaffleDrawn />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RaffleDrawn = () => {
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
      <p className="mb-2">Raffle has been drawn for the day.</p>
      <button disabled={true} className={`${BUTTON_CLASS} w-full`}>
        Opens in {hoursLeft} hours
      </button>
    </div>
  );
};
