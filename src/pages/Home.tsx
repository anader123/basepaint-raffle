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
            className="rounded-xl my-12 border w-[1000px]"
            src={hero}
            alt="raffle-img"
          />
          <p className="text-gray-400 mt-2 text-lg text-center">
            Buy tickets and win a brush for the day! BasePaint Raffle is a fun
            event where users can buy ticket for the chance to paint with a
            1000px brush for the day.
          </p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-8 text-white fixed inset-x-0 bottom-20">
        <div className="w-[33%] flex flex-col items-center">
          <h3 className="text-xl font-bold">1000px Brush 🖌️</h3>
          <p className="text-gray-400">
            One lucky winner gets to paint with 1000px brush for a day.
          </p>
        </div>

        <div className="w-[33%] flex flex-col items-center">
          <h3 className="text-xl font-bold">OnChain Art 🎨</h3>
          <p className="text-gray-400">
            The contribution will be stored on the blockchain.
          </p>
        </div>

        <div className="w-[33%] flex flex-col items-center">
          <h3 className="text-xl font-bold">Paid for Painting 💸</h3>
          <p className="text-gray-400">
            More pixels equals more ETH from contributing for a day on
            basepaint.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
