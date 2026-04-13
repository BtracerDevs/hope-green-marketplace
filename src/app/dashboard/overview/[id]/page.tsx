"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import GoogleMapComponent from "@/components/ui/map";
import Link from "next/link";
import { PolygonIcon } from "@/components/icons/polygon";
import { useTranslations } from "next-intl";

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

interface NFTResponse {
  owner: number;
  metadata: Metadata;
}

function parseCoordinate(coord: string): number {
  const match = coord
    .trim()
    .match(/^([\d]+(?:[.,]\d+)?)\s*[°º]?\s*([NnSsEeOoWw])$/);
  if (!match) return NaN;

  // eslint-disable-next-line prefer-const
  let [, value, dir] = match;
  value = value.replace(/,/g, ".");
  let num = parseFloat(value);
  if (/^[SsOoWw]$/.test(dir)) num = -num;
  return num;
}

export default function NFTDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("NFTDetails");

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const { id } = React.use(params);

  const { data: nft, isLoading } = useQuery({
    queryKey: ["nft-by-id", id],
    queryFn: (): Promise<NFTResponse> =>
      api.get(`hope-green/nft/${id}`).then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>{t("loading")}</div>;

  if (!nft || !nft.metadata) return <div>{t("unavailable")}</div>;

  const images = [nft.metadata.image, nft.metadata.tree_image];

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
        : prevIndex - 1
    );
  };

  const metaEntries = Object.entries(nft.metadata).filter(
    ([key]) => key !== "image" && key !== "tree_image"
  );

  const labels: Record<string, string> = {
    producer: t("meta.producer"),
    address: t("meta.address"),
    date: t("meta.date"),
    id: t("meta.id"),
    name: t("meta.name"),
    type: t("meta.type"),
    email: t("meta.email"),
    phone: t("meta.phone"),
    latitude: t("meta.latitude"),
    longitude: t("meta.longitude"),
  };

  const latitude = parseCoordinate(nft.metadata.latitude);
  const longitude = parseCoordinate(nft.metadata.longitude);

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Carousel */}
        <div className="relative overflow-hidden h-96">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.img
              key={images[currentImageIndex]}
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={nft.metadata.name || "NFT"}
              className="w-full h-96 object-cover rounded-lg shadow-md absolute top-0 left-0"
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
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{nft.metadata.name}</h1>
            <Link
              href={`https://polygonscan.com/nft/0xaebc39bc35af95bf25c1254ea2200a1a5ebcc658/${id}`}
              target="_blank"
            >
              <PolygonIcon />
            </Link>
          </div>
          {/* Grid for remaining items on desktop */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {metaEntries.map(([key, value]) => (
              <div key={key}>
                <h2 className="text-lg font-semibold">
                  {labels[key] ?? key.replace(/_/g, " ")}
                </h2>
                <p className="text-gray-700">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-96 mt-10">
        <GoogleMapComponent
          height="100%"
          zoom={12}
          markers={[{ lat: latitude.toString(), lng: longitude.toString() }]}
        />
      </div>
    </div>
  );
}
