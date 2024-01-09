import { ConnectKitButton } from "connectkit";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="p-2 bg-black ">
      <nav className="w-full flex flex-row justify-between items-center h-[50px]">
        <ul className="flex flex-row gap-4 text-white text-lg items-center h-min-[70px]">
          <Link to="/">
            <img
              src="/basepaint-raffle.svg"
              alt="basepaint-raffle-logo"
              className="hover:opacity-[80%] w-[40px] rounded-full"
            />
          </Link>
          <li className="hover:opacity-[80%]">
            <Link to="/mint">Tickets</Link>
          </li>
          <li className="hover:opacity-[80%]">
            <Link to="/raffle">Raffle</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <ConnectKitButton />
        </div>
      </nav>
    </header>
  );
};
