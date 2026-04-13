"use client";

import { Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ConnectButton } from "../wallet/connect";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

interface IHeader {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export function Header({ setSidebarOpen }: IHeader) {
  const t = useTranslations("Header");

  return (
    <header className="p-4 flex items-center justify-between" role="banner">
      <div className="flex items-center">
        {/* Botão de menu somente para mobile */}
        <button
          className="md:hidden p-2 mr-2"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <span className="block text-sm">{t("subtitle")}</span>
        </div>
      </div>
      {/* Botões exibidos somente em telas médias e maiores */}
      <div className="hidden md:flex space-x-2">
        <ConnectButton />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
