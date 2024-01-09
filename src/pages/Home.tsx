import { Header } from "../components/Header";
import hero from "../imgs/basepaint-hero.png";

export const Home = () => {
  return (
    <div className="h-full">
      <Header />
      <div className="w-full text-center mt-8">
        <h1 className="text-white text-4xl">Basepaint Raffle</h1>

        <div className="w-full flex flex-col items-center my-8">
          <img
            className="rounded-sm sm:w-[40%] w-[70%]  border"
            src={hero}
            alt="raffle-img"
          />
        </div>
        <p className="text-gray-400 mt-2 text-lg">
          Buy tickets and win a brush for the day!
        </p>
      </div>
    </div>
  );
};
