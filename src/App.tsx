import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { config } from "./config";

import { Home } from "./pages/Home";
import { Mint } from "./pages/Mint";
import { Raffle } from "./pages/Raffle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/raffle" element={<Raffle />} />
          </Routes>
        </Router>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
