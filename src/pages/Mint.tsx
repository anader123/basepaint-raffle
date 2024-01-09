import { Header } from "../components/Header";
import tickets from "../imgs/tickets.png";

export const Mint = () => {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="w-full text-center mt-8 flex flex-col items-center">
        <h1 className="text-white text-4xl">Buy Tickets</h1>

        <img
          className="border rounded-xl h-[400px] my-10"
          src={tickets}
          alt="ticket"
        />

        <div className="flex flex-col items-center w-full mt-8">
          <div className="text-white flex flex-col justify-center items-between w-[40%] gap-2">
            <div className="flex gap-12 justify-center text-2xl">
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
