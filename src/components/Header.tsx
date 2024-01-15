import { ConnectKitButton } from "connectkit";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="p-2 bg-black ">
      <nav className="w-full flex flex-row justify-between items-center h-[50px]">
        <ul className="flex flex-row gap-4 text-white text-lg items-center h-min-[70px]">
          <li className="hover:opacity-[80%]">
            <Link to="/mint">Tickets</Link>
          </li>
          <li className="hover:opacity-[80%]">
            <Link to="/raffle">Raffle</Link>
          </li>
          <li className="hover:opacity-[80%]">
            <Link to="/paint">Paint</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <ConnectKitButton />
        </div>
      </nav>
    </header>
  );
};
