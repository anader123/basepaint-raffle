import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import hero from "../imgs/basepaint-hero.png";

export const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center justify-between mt-14">
        {/* <h1 className="text-white text-4xl">BasePaint Raffle 🎟️</h1> */}

        <div className="w-full flex flex-col items-center  sm:w-[40%] w-[70%]">
          <img
            className="rounded-xl sm:my-12 border md:w-[1000px] w-[90%]"
            src={hero}
            alt="raffle-img"
          />
          <p className="text-gray-400 my-8 sm:text-lg text-md text-center">
            Buy tickets and win a brush for the day! BasePaint Raffle is a fun
            event where users can buy ticket for the chance to paint with a
            1000px brush for the day.
          </p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center gap-8 text-white sm:fixed sm:inset-x-0 sm:bottom-20">
        <div className="sm:w-[33%] w-[90%] text-center flex flex-col items-center">
          <h3 className="sm:text-xl text-lg font-bold">1000px Brush 🖌️</h3>
          <p className="text-gray-400 text-sm">
            A lucky winner gets to paint with 1000px brush for a day.
          </p>
        </div>

        <div className="sm:w-[33%] w-[90%] text-center flex flex-col items-center">
          <h3 className="sm:text-xl text-lg font-bold">OnChain Art 🎨</h3>
          <p className="text-gray-400 text-sm">
            The contribution will be stored on the blockchain.
          </p>
        </div>

        <div className="sm:w-[33%] w-[90%] text-center flex flex-col items-center">
          <h3 className="sm:text-xl text-lg font-bold">Paid for Painting 💸</h3>
          <p className="text-gray-400 text-sm">
            More pixels equals more ETH from contributing for a day on
            basepaint.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
