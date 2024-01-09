import { Header } from "../components/Header";
import { useState } from "react";

import raffleImg from "../imgs/raffle-img.png";

export const Raffle = () => {
  const [isRaffleReady, setIsRaffleReady] = useState(true);
  return (
    <div>
      <Header />
      <div className="w-full text-center mt-8">
        <h1 className="text-white text-4xl">Daily Raffle</h1>

        <div className="w-full flex flex-col items-center my-6">
          <img
            className="rounded-sm sm:w-[40%] w-[70%]  border"
            src={raffleImg}
            alt="raffle-img"
          />
          <div className="my-8 text-white">
            {isRaffleReady ? (
              <button className="bg-blue-400 p-2 rounded-sm">
                Start Raffle
              </button>
            ) : (
              <p>Raffle opens in 10 hours</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-white text-2xl">Previous Winners</h2>
          <div className="text-center w-full">
            <div className="text-white flex gap-2 text-center">
              <p>Day #1: smith.eth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
