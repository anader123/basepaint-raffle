import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { config } from "./config";

import { Home } from "./pages/Home";
import { Mint } from "./pages/Mint";
import { Raffle } from "./pages/Raffle";
import { Paint } from "./pages/Paint";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/raffle" element={<Raffle />} />
            <Route path="/paint" element={<Paint />} />
          </Routes>
        </Router>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
