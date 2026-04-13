"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

interface ConnectButtonProps {
  buttonClassName?: string;
}

export const ConnectButton = ({}: ConnectButtonProps) => {
  const t = useTranslations("WalletConnect");

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="outline"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <Wallet className="mr-2" size={16} /> {t("connect")}
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    variant="outline"
                    onClick={openChainModal}
                    type="button"
                  >
                    <Wallet className="mr-2" size={16} /> {t("wrongNetwork")}
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    variant="outline"
                    onClick={openAccountModal}
                    type="button"
                  >
                    <Wallet className="mr-2" size={16} /> {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
