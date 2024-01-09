import { Header } from "../components/Header";
import { useState } from "react";
import raffleImg from "../imgs/raffle-img.png";
import { BUTTON_CLASS } from "../constants/constants";

export const Raffle = () => {
  const [isRaffleReady, setIsRaffleReady] = useState(true);
  return (
    <div>
      <Header />
      <div className="w-full text-center sm:mt-8 mt-4 flex flex-col items-center">
        <h1 className="text-white text-4xl">Daily Raffle</h1>

        <div className="flex flex-col items-center my-4 sm:w-[40%] md:w-[30%] w-[90%]">
          <p className="text-gray-400 mb-6 sm:text-md text-sm">
            Raffles take place every day and can be initiated by anyone. The
            winner will be able to paint with 1000px brush for a day. You must
            purchase tickets to enter the raffle.
          </p>
          <img
            className="rounded-xl  border border-gray-600 border-2"
            src={raffleImg}
            alt="raffle-img"
          />

          {/* <p> Current Day: Day #153</p> */}

          <div className="my-8 text-white w-full">
            {isRaffleReady ? (
              <button className={`${BUTTON_CLASS} w-full`}>Start Raffle</button>
            ) : (
              <p>Raffle opens in 10 hours</p>
            )}
          </div>
        </div>

        <div className="sm:w-[40%] md:w-[30%] w-[90%] text-white">
          <h2 className="text-2xl">Previous Winners</h2>
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <p className="text-semibold">Day #1:</p> <p>smith.eth</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-semibold">Day #1:</p> <p>smith.eth</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-semibold">Day #1:</p> <p>smith.eth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
