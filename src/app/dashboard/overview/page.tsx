"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface Metadata {
  producer: string;
  address: string;
  date: string;
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  latitude: string;
  longitude: string;
  image: string;
  tree_image: string;
}

interface OwnerNFT {
  tokenId: number;
  metadata: Metadata;
}

interface Metadata {
  producer: string;
  address: string;
  date: string;
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  latitude: string;
  longitude: string;
  image: string;
  tree_image: string;
}

export default function Overview() {
  const t = useTranslations("Overview");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const {
    data: items,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["nfts", currentPage, pageSize],
    queryFn: (): Promise<OwnerNFT[]> =>
      api
        .get(
          `hope-green/wallet/0xb63cF834bB717c96Ad65501cccb0a073B4671130?page=${currentPage}&pageSize=${pageSize}`,
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    initialData: [] as OwnerNFT[],
  });

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main
      className="flex flex-col flex-1 py-5 px-12 gap-8 overflow-hidden "
      role="main"
    >
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-2xl font-bold">{t("heading")}</h2>

        {/* Controles de paginação */}
        <div className="flex items-center gap-4">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1 || isLoading || isFetching}
            className="bg-green-600 text-white disabled:bg-gray-400"
          >
            {t("pagination.prev")}
          </Button>
          <span className="font-medium">
            {t("pagination.page", { page: currentPage })}
          </span>
          <Button
            onClick={nextPage}
            disabled={items.length < pageSize || isLoading || isFetching}
            className="bg-green-600 text-white disabled:bg-gray-400"
          >
            {t("pagination.next")}
          </Button>
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="flex items-center justify-center h-64 ">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto flex-1 p-4 rounded-lg max-h-screen mt-5">
            {items.map((item) => (
              <Card
                key={item.tokenId}
                className="p-4 bg-white rounded-lg shadow-md"
              >
                <img
                  src={item.metadata.image}
                  alt={item.metadata.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <CardContent className="mt-4">
                  <div className="flex items-center justify-between md:flex-row flex-col gap-2">
                  <h3 className="text-lg font-semibold">
                    {item.metadata.name} #{item.tokenId}
                  </h3>
                    <Link
                      target="_blank"
                      href={`https://polygonscan.com/nft/0xaebc39bc35af95bf25c1254ea2200a1a5ebcc658/${item.tokenId}`}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      <Image
                        src="/icons/polygon-logo-light.svg"
                        alt="Polygon Logo"
                        width={30}
                        height={30}
                        className="inline-block mr-1"
                      />
                    </Link>
                  </div>

                  <Link
                    href={`/dashboard/overview/${item.tokenId}`}
                    className="block mt-4 text-center bg-green-600 text-white font-bold py-2 rounded-lg"
                  >
                    {t("actions.view")}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mostrar mensagem quando não houver itens */}
          {items.length === 0 && !isLoading && (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">{t("empty.title")}</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
