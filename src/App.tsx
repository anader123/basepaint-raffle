import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { Home } from "./pages/Home";
import { Mint } from "./pages/Mint";
import { Raffle } from "./pages/Raffle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { baseSepolia } from "wagmi/chains";

const chains = [{ ...baseSepolia }];

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID as string,

    appName: "BasePaint Raffle",
    appDescription: "Buy tickets and win a brush for the day.",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    chains,
  })
);

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
