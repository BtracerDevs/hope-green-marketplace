"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ReactECharts from "echarts-for-react";
import Image from "next/image";

interface ProducerResponse {
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
  wallet: string;
  quantMudasFlorestais: number;
  quantMudasFrutiferas: number;
  quantMudasIndustriais: number;
  especiesMudasFlorestais: string[];
  especiesMudasFrutiferas: string[];
  especiesMudasIndustriais: string[];
  sold: number;
  supply: number;
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

interface OwnerNFT {
  tokenId: number;
  metadata: Metadata;
}

export default function ProdutorDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("ProducerDetails");

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { id } = React.use(params);

  const { data: producer, isLoading } = useQuery({
    queryKey: ["producer-by-id", id],
    queryFn: (): Promise<ProducerResponse> =>
      api.get(`produtor/${id}`).then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  const {
    data: items,
    isLoading: isLoadingNfts,
    isFetching,
  } = useQuery({
    queryKey: ["nfts", currentPage, pageSize],
    queryFn: (): Promise<OwnerNFT[]> =>
      api
        .get(
          `hope-green/wallet/${producer?.wallet}?page=${currentPage}&pageSize=${pageSize}`,
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    initialData: [] as OwnerNFT[],
  });

  const option = {
    title: { text: t("chart.title") },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
    },
    series: [
      {
        name: t("chart.quantity"),
        type: "pie",
        radius: "50%",
        data: [
          {
            value: Number(producer?.supply) - Number(producer?.sold),
            itemStyle: { color: "#4CAF50" },
            name: t("chart.legend.inStock"),
          },
          {
            value: Number(producer?.sold),
            itemStyle: { color: "#AB47CF" },
            name: t("chart.legend.sold"),
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  if (isLoading) return <div>{t("loading")}</div>;

  if (!producer) return <div>{t("unavailable")}</div>;

  const images = producer.images;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0.9 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0.1 }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prevIndex) =>
      newDirection > 0
        ? prevIndex === images.length - 1
          ? 0
          : prevIndex + 1
        : prevIndex === 0
          ? images.length - 1
          : prevIndex - 1,
    );
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Carousel */}
        <div className="relative overflow-hidden h-96">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.img
              key={images[currentImageIndex]}
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={producer.nome || "NFT"}
              className="w-full h-96 object-cover object-top  rounded-lg shadow-md absolute top-0 left-0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* NFT Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{producer.nome}</h1>

          {/* First metadata item */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{t("sections.address")}</h2>
            <p className="text-gray-700">{producer.endereco}</p>
          </div>

          {/* Grid for remaining items on desktop */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">
                {t("sections.hectares")}
              </h2>
              <p className="text-gray-700">{producer.hectare}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {t("sections.forestSeedlings")}
              </h2>

              <p className="text-gray-700">{producer.quantMudasFlorestais}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {t("sections.fruitSeedlings")}
              </h2>

              <p className="text-gray-700">{producer.quantMudasFrutiferas}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {t("sections.industrialSeedlings")}
              </h2>

              <p className="text-gray-700">{producer.quantMudasIndustriais}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-10 mt-10 justify-between">
        <div className="p-6 flex-1 rounded-xl shadow-2xs border border-slate-800">
          {/* Cabeçalho */}
          <div className="flex justify-between items-end mb-4 border-b border-amber-500/30 pb-2">
            <h3 className="text-black font-bold uppercase tracking-wider text-sm">
              {t("cardDetails.target")}
            </h3>
            <span className="text-black text-xs font-mono">
              {Math.round((producer.sold / producer.supply) * 100)}% {t("cardDetails.completed")}
            </span>
          </div>

          <div className="space-y-6">
            {/* Container da Barra e Infos */}
            <div className="flex flex-col gap-3">
              {/* Barra de Progresso Externa */}
              <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                {/* Barra de Progresso Interna (Dinâmica) */}
                <div
                  className="h-full bg-gradient-to-r from-green-600 to-green-600 transition-all duration-500 ease-out"
                  style={{
                    width: `${(producer.sold / producer.supply) * 100}%`,
                  }}
                />
              </div>

              {/* Legendas */}
              <div className="flex justify-between text-sm font-medium">
                <div className="flex flex-col">
                  <span className="text-black text-[10px] uppercase">
                    {t("cardDetails.completed")}
                  </span>
                  <span className="text-green-600">{producer.sold}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-black text-[10px] uppercase">
                    {t("cardDetails.totalCollection")}
                  </span>
                  <span className="text-slate-200">{producer.supply}</span>
                </div>
              </div>
            </div>

            {/* Ação */}
            <button className="w-full py-3 px-6 bg-green-600 hover:bg-green-500 active:transform active:scale-[0.98] text-white font-bold rounded-lg transition-all shadow-lg shadow-amber-900/20 uppercase tracking-tight cursor-pointer">
              {t("cardDetails.buyHere")}
            </button>
          </div>
        </div>
        <ReactECharts option={option} style={{ height: "300px", width: "300px" }} />
      </div>

      <h1 className="text-2xl font-bold mt-10">{producer.tituloDescricao}</h1>
      <p className="text-base mt-2">{producer.descricao}</p>

      <div className="flex justify-between items-center mt-5">
        <h2 className="text-2xl font-bold">{t("sections.nfts")}</h2>

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

      {isLoadingNfts || isFetching ? (
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
                    href={`/dashboard/nfts/${item.tokenId}`}
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
              <p className="text-gray-500">{t("empty.nfts")}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
