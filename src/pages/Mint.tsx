import { Header } from "../components/Header";

export const Mint = () => {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="w-full text-center mt-8">
        <h1 className="text-white text-4xl">Buy Tickets</h1>
        <p className="text-gray-400 mt-2 text-lg">
          Buy tickets and win a brush for the day!
        </p>

        <div className="flex flex-col items-center w-full mt-8">
          <div className="text-white flex flex-col justify-center items-between w-[40%] gap-2">
            <div className="flex gap-8 justify-center">
              <button>-</button>
              <button>+</button>
            </div>
            <div className="flex justify-between gap-8">
              <p>Price:</p>
              <p>0.0026 ETH</p>
            </div>
            <div className="flex justify-between gap-8">
              <p>Amount:</p>
              <p>4</p>
            </div>
            <button>Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
};
