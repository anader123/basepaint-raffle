import { baseSepolia } from "wagmi/chains";
import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";

const chains = [{ ...baseSepolia }];

export const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.REACT_APP_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env
      .REACT_APP_WALLETCONNECT_PROJECT_ID as string,

    appName: "BasePaint Raffle",
    appDescription: "Buy tickets and win a brush for the day.",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    chains,
  })
);
