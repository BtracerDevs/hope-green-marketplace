import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChartNoAxesColumnIcon,
  House,
  LifeBuoy,
  ChevronUp,
  ChevronDown,
  X,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface NavItemProps {
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  href?: string;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  href,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;
  const hasChildren = Boolean(children);
  const t = useTranslations("Sidebar");

  if (href && !hasChildren) {
    return (
      <li>
        <Link
          href={href}
          className={`w-full flex items-center text-xl font-semibold cursor-pointer p-2 rounded ${
            isActive ? "bg-gray-300" : "hover:bg-gray-100"
          }`}
        >
          {Icon && <Icon className="mr-2" size={20} />}
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center text-xl font-semibold cursor-pointer p-2 rounded ${
          isActive ? "bg-gray-400" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          {Icon && <Icon className="mr-2" size={20} />}
          {label}
        </div>
        {hasChildren &&
          (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </button>
      {hasChildren && isOpen && (
        <ul className="ml-6 space-y-2 text-gray-600">
          {/* Exemplo para "Visão Geral": */}
          <Link
            href="/dashboard/overview"
            className={`block p-1 rounded ${
              pathname.startsWith("/dashboard/overview")
                ? "bg-gray-300"
                : "hover:text-gray-800"
            }`}
          >
            {t("nav.showcase")}
          </Link>
          <Link
            href="/dashboard/nfts"
            className={`block p-1 rounded ${
              pathname.startsWith("/dashboard/nfts")
                ? "bg-gray-300"
                : "hover:text-gray-800"
            }`}
          >
            {t("nav.yourNfts")}
          </Link>
          <Link
            href="/dashboard/producer"
            className={`block p-1 rounded ${
              pathname.startsWith("/dashboard/producer")
                ? "bg-gray-300"
                : "hover:text-gray-800"
            }`}
          >
            {t("nav.producers")}
          </Link>
          <Link
            href="https://buy.stripe.com/14A5kDaLe4v48Ie0yhefC05"
            target="_blank"
            className={`block p-1 rounded ${
              pathname.startsWith("/dashboard/history")
                ? "bg-gray-300"
                : "hover:text-gray-800"
            }`}
          >
            {t("nav.buyHere")}
          </Link>
        </ul>
      )}
    </li>
  );
};

interface ISidebar {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: ISidebar) {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  return (
    <>
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out z-50 w-64 sm:w-72 md:w-80 bg-white p-6 border border-gray-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
        aria-label="Sidebar"
      >
        {/* Botão para fechar a sidebar (visível somente em mobile) */}
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fechar Sidebar"
        >
          <X size={24} />
        </button>
        <div className="flex items-center justify-center w-full mb-4">
          <Image src="/logo-amazonas.png" alt="Logo Amazonas" width={200} height={80} />
        </div>

        <form className="relative mb-4" role="search">
          <label htmlFor="search" className="sr-only ">
            {t("search.label")}
          </label>
          <Search className="absolute left-3 top-10 text-gray-500" size={16} />
          <Input id="search" placeholder="Search" className="pl-10 mt-7" />
        </form>

        <nav className="h-[calc(100%-6rem)]">
          <ul className="space-y-2">
            <NavItem icon={House} label="Home" href="/dashboard" />
            <NavItem icon={ChartNoAxesColumnIcon} label="Dashboard">
              <Link
                href="/dashboard/overview"
                className={`block p-1 rounded ${
                  pathname.startsWith("/dashboard/overview")
                    ? "bg-gray-300"
                    : "hover:text-gray-800"
                }`}
              >
                {t("nav.showcase")}
              </Link>
              <Link
                href="/dashboard/nfts"
                className={`p-1 rounded ${
                  pathname === "/dashboard/nfts"
                    ? "bg-gray-300"
                    : "hover:text-gray-800"
                }`}
              >
                {t("nav.yourNfts")}
              </Link>
              <Link
                href="/dashboard/producers"
                className={`p-1 rounded ${
                  pathname.startsWith("/dashboard/producer")
                    ? "bg-gray-300"
                    : "hover:text-gray-800"
                }`}
              >
                {t("nav.producers")}
              </Link>
              <Link
                href="https://buy.stripe.com/14A5kDaLe4v48Ie0yhefC05"
                target="_blank"
                className={`block p-1 rounded ${
                  pathname.startsWith("/dashboard/history")
                    ? "bg-gray-300"
                    : "hover:text-gray-800"
                }`}
              >
                {t("nav.buyHere")}
              </Link>
            </NavItem>
          </ul>

          <ul className="space-y-2 mt-7">
            <a
              href="mailto:marcio.pessoa@btracer.com.br?subject=Suporte%20Osten&body=Olá,%20preciso%20de%20ajuda%20com..."
              className="text-xl font-semibold flex items-center p-2 hover:bg-gray-100 rounded"
            >
              <LifeBuoy className="mr-2" size={20} />
              {t("support.label")}
            </a>
          </ul>

          <div className="mt-7 flex justify-center">
            <Image src="/logo.png" alt="Hope Green Logo" width={150} height={60} />
          </div>
        </nav>
      </aside>
    </>
  );
}
