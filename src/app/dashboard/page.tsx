"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import GoogleMapComponent from "@/components/ui/map";
import { PlanoProdutivo } from "../types";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
  quantMudasFlorestais: number;
  quantMudasFrutiferas: number;
  quantMudasIndustriais: number;
  especiesMudasFlorestais: string[];
  especiesMudasFrutiferas: string[];
  especiesMudasIndustriais: string[];
}

export default function Home() {
  const t = useTranslations("HomePage");

  const { data: produtores } = useQuery({
    queryKey: ["produtores"],
    queryFn: (): Promise<ProdutorResponse[]> =>
      api.get(`produtor`).then((response) => response.data.reverse()),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const { data: planos } = useQuery({
    queryKey: ["planos"],
    queryFn: (): Promise<PlanoProdutivo[]> =>
      api.get(`plano-produtivo`).then((response) => response.data.reverse()),
    refetchOnWindowFocus: false,
    initialData: [],
  });


  const manacapuruMarker = { lat: "-3.63", lng: "-60.45" };
  
  const allMarkers = [
    manacapuruMarker,
    ...planos
      .filter((plano) => plano.lat && plano.lng)
      .map((plano) => ({ lat: plano.lat, lng: plano.lng }))
  ];

  return (
    <main
      className="flex flex-col lg:flex-row py-5 px-4 sm:px-6 lg:px-12 gap-8"
      role="main"
    >
      {/* Main Content */}
      <section className="flex-1">
        <figure>
          <div className="relative w-full h-64 sm:h-72 md:h-[29rem]">
            <GoogleMapComponent
              height="100%"
              zoom={6}
              markers={allMarkers}
            />
          </div>
          <figcaption className="sr-only">{t("map.caption")}</figcaption>
        </figure>
      </section>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white p-6 border border-gray-300 rounded-lg">
        {produtores &&
          produtores.length > 0 &&
          produtores.map((item, key) => (
            <Card className="mb-4" key={key}>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-base">{item.nome}</h3>
                    <p className="text-sm text-green-600">
                      {t("labels.hectares")}: {item.hectare}
                    </p>
                    <div className="flex items-center mt-2">
                      <MapPin className="mr-1" size={14} />
                      <p className="text-xs text-gray-400">
                        {t("labels.location")}
                      </p>
                    </div>
                  </div>
                  <img
                    src={item.pfp}
                    className="w-16 h-16 rounded-full ms-2 object-cover"
                    alt={item.nome}
                  />
                </div>
                <Link href={`dashboard/producer/${item.id}`}>
                  <Button className="text-white w-full mt-4">
                    {t("actions.viewProducer")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
      </aside>
    </main>
  );
}
