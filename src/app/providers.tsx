"use client";

import { useEffect, useState } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import {
  bitgetWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [polygon],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [bitgetWallet, rainbowWallet, phantomWallet, metaMaskWallet],
    },
  ],
  ssr: true,
});

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      border: "1px solid purple",
                      color: "#FFFFFF",
                      backgroundColor: "#000000",
                    },
                  }}
                />
                <main>{children}</main>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
      ) : null}
    </>
  );
}
