"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export interface ProdutorResponse {
  id: string;
  nome: string;
  endereco: string;
  ano: number;
  areas: string[];
  pfp: string;
  email: string;
  telefone: string;
  images: string[];
  tituloDescricao: string;
  descricao: string;
  hectare: number;
  supply: number;
  quantMudasFlorestais: number;
  quantMudasFrutiferas: number;
  quantMudasIndustriais: number;
  especiesMudasFlorestais: string[];
  especiesMudasFrutiferas: string[];
  especiesMudasIndustriais: string[];
  sold: number;
  wallet: string;
}

export default function Producers() {
  const t = useTranslations("Producers");

  const { data: produtores } = useQuery({
    queryKey: ["produtores"],
    queryFn: (): Promise<ProdutorResponse[]> =>
      api.get(`produtor`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return (
    <main
      className="flex flex-col flex-1 py-5 px-12 gap-8 overflow-hidden "
      role="main"
    >
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6 justify-center md:justify-start">
        <Button className="text-white p-2">{t("heading")}</Button>
      </div>

      {/* Grid de NFTs com scroll responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-y-auto flex-1 rounded-lg max-h-screen">
        {produtores.map((item, index) => (
          <Card key={index} className="p-4 bg-white rounded-lg shadow-md">
            <img
              src={item.pfp}
              alt={item.nome}
              className="w-full h-32 sm:h-60 object-cover rounded-lg"
            />
            <CardContent className="mt-2">
              <h3 className="mt-2 text-sm sm:text-base font-semibold">
                {item.nome}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {t("card.nftsCount", { count: item.supply })}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {t("card.inCirculation", { count: item.supply - item.sold })}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {t("card.sold", { count: item.sold })}
              </p>
              <div className="flex w-full justify-between items-center mt-2 flex-wrap gap-2">
                <Link
                  href={`/dashboard/producer/${item.id}`}
                  className="text-base text-white font-bold rounded-lg py-2 px-10 bg-[#1b8852] cursor-pointer"
                >
                  {t("actions.view")}
                </Link>
                <div className="text-sm text-gray-600">
                  <Link
                    target="_blank"
                    href={`https://polygonscan.com/address/${item.wallet}`}
                    className="hover:underline"
                  >
                    <Image
                      src="/icons/polygon-logo.svg"
                      alt="Polygon Logo"
                      width={120}
                      height={50}
                      className="inline-block mr-1"
                    />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {produtores.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">{t("empty.title")}</p>
        </div>
      )}
    </main>
  );
}
