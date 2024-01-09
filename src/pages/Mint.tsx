import { useState } from "react";
import { Header } from "../components/Header";
import { BUTTON_CLASS } from "../constants/constants";
import tickets from "../imgs/tickets.png";

export const Mint = () => {
  const [amount, setAmount] = useState(1);

  const PRICE = 0.0026;

  const handleChange = (change: number) => {
    setAmount((prevAmount) => {
      if (prevAmount === 1 && change === -1) {
        return prevAmount;
      } else {
        return prevAmount + change;
      }
    });
  };

  return (
    <div className="h-full w-full">
      <Header />
      <div className="w-full text-center mt-8 flex flex-col items-center">
        <img
          className="border rounded-xl md:w-[25%] sm:w-[40%] w-[90%] sm:my-10 my-3"
          src={tickets}
          alt="ticket"
        />

        <div className="flex flex-col items-center w-full mt-8">
          <div className="text-white flex flex-col justify-center items-between sm:w-[40%] w-[90%] gap-3">
            <div className="flex gap-12 justify-center text-xl">
              <button
                onClick={() => handleChange(-1)}
                className={`${BUTTON_CLASS} px-6`}
              >
                -
              </button>
              <button
                onClick={() => handleChange(1)}
                className={`${BUTTON_CLASS} px-6`}
              >
                +
              </button>
            </div>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between">
                <p className="font-semibold">Amount:</p>
                <p>{amount}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Total:</p>
                <p>{PRICE * amount} ETH</p>
              </div>
            </div>
            <button className={BUTTON_CLASS}>Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
};
