"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import { useState, useEffect } from "react";

// // pages/index.tsx
// import Head from "next/head";
// import Link from "next/link";
// import { useTranslations } from "next-intl";
// import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

// export default function Home() {
//   const t = useTranslations("LandingPage");

//   return (
//     <>
//       <Head>
//         <title>Semeando o Futuro</title>
//         <meta
//           name="description"
//           content="LP Semeando o Futuro – transformando ideias em realidade"
//         />
//       </Head>
//       <div className="flex flex-col min-h-screen">
//         {/* Hero */}
//         <section
//           id="hero"
//           className="bg-cover bg-center h-[80vh]"
//           style={{ backgroundImage: "url('/lp/hero.png')" }}
//         >
//           <header className="text-white py-6">
//             <div className=" container mx-auto px-4 py-2 flex justify-between items-center">
//               <h1 className="hidden md:flex md:text-3xl font-bold">
//                 {t("title")}
//               </h1>
//               <nav className="space-x-4">
//                 <a href="#sobre" className="hover:underline">
//                   {t("nav.about")}
//                 </a>
//                 <a href="#solucao" className="hover:underline">
//                   {t("nav.solution")}
//                 </a>
//                 <a href="#beneficios" className="hover:underline">
//                   {t("nav.benefits")}
//                 </a>
//                 <a href="#contato" className="hover:underline">
//                   {t("nav.contact")}
//                 </a>
//                 <LocaleSwitcher />
//               </nav>
//             </div>
//           </header>
//           <div className="inset-0 flex flex-col items-center justify-center">
//             <Image
//               src={"/lp/logo.png"}
//               width={300}
//               height={300}
//               alt="logo white"
//             />
//             <div className="text-center text-white px-4">
//               <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
//                 {t("hero.heading")}
//               </h2>
//               <a
//                 href="/dashboard"
//                 className="inline-block bg-yellow-400 text-green-900 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
//               >
//                 {t("hero.cta")}
//               </a>
//             </div>
//           </div>
//         </section>

//         <main className="flex-grow">
//           <section className="min-h-screen px-4 py-8 md:px-12 md:py-12">
//             <h1 className="text-[#045629] text-2xl md:text-3xl font-bold text-left">
//               {t("howItWorks.title")}
//             </h1>

//             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-10 space-y-10 md:space-y-0">
//               {/* Coluna esquerda (passos 1 e 2) */}
//               <div className="flex flex-col justify-center space-y-10 md:space-y-40 w-full md:w-auto">
//                 {[1, 2].map((step) => (
//                   <div
//                     key={step}
//                     className="flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4"
//                   >
//                     <h2 className="text-[#045629] font-extrabold text-5xl md:text-8xl">
//                       {step}
//                     </h2>
//                     <p className="text-[#045629] max-w-full md:max-w-[18rem] text-base md:text-lg">
//                       {step === 1 ? (
//                         <>{t("howItWorks.step1")}</>
//                       ) : (
//                         <>{t("howItWorks.step2")}</>
//                       )}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Imagem central */}
//               <div className="w-full md:w-[500px] flex justify-center">
//                 <Image
//                   src="/lp/comofunciona.png"
//                   alt="como funciona"
//                   width={400}
//                   height={400}
//                   className="w-3/4 md:w-full h-auto"
//                 />
//               </div>

//               {/* Coluna direita (passos 3 e 4) */}
//               <div className="flex flex-col justify-center space-y-10 md:space-y-40 w-full md:w-auto">
//                 {[3, 4].map((step) => (
//                   <div
//                     key={step}
//                     className="flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4"
//                   >
//                     <h2 className="text-[#045629] font-extrabold text-5xl md:text-8xl">
//                       {step}
//                     </h2>
//                     <p className="text-[#045629] max-w-full md:max-w-[18rem] text-base md:text-lg">
//                       {step === 3 ? (
//                         <>{t("howItWorks.step3")}</>
//                       ) : (
//                         <>{t("howItWorks.step4")}</>
//                       )}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Cards informativos */}
//             <div className="flex flex-col md:flex-row w-full justify-center gap-y-6 md:gap-x-36 mt-12">
//               <div className="bg-[#045629] text-white p-4 md:p-5 rounded-lg text-sm md:text-xl max-w-full md:max-w-[32rem] text-center">
//                 {t("infoCards.nftsIssued")}
//               </div>
//               <div className="bg-[#045629] text-white p-4 md:p-5 rounded-lg text-sm md:text-xl max-w-full md:max-w-[32rem] text-center">
//                 {t("infoCards.cost")}
//               </div>
//             </div>
//           </section>

//           {/* Sobre */}
//           <section
//             id="sobre"
//             className="py-20 mx-auto px-2 md:px-20 bg-[#9AD4C0]"
//           >
//             <div className="md:flex flex-col  md:items-center justify-between">
//               <div className="flex w-full justify-between">
//                 <div>
//                   <span className="font-semibold text-xl text-[#045629]">
//                     {t("about.badge")}
//                   </span>
//                   <h1 className="text-2xl font-bold text-[#045629]">
//                     {t("about.title")}
//                   </h1>
//                 </div>
//                 <Image
//                   src={"/lp/logo-green.png"}
//                   width={100}
//                   height={100}
//                   alt="logo white"
//                 />
//               </div>
//               <div className="md:flex md:mt-20 w-full justify-between">
//                 <div className="text-[#045629] md:max-w-3xl ">
//                   <h3 className="text-3xl font-bold mb-4">{t("about.h3")}</h3>
//                   <p className="mb-4 text-xl font-semibold">{t("about.p1")}</p>
//                   <p className="mb-4 text-xl font-semibold">{t("about.p2")}</p>
//                   <p className="text-gray-700 text-xl font-semibold">
//                     {t("about.p3")}
//                   </p>
//                   <p className="text-gray-700 text-xl font-semibold">
//                     {t("about.p4")}
//                   </p>
//                   <p className="text-gray-700 text-xl font-semibold">
//                     {t("about.p5")}
//                   </p>
//                 </div>
//                 <div className="">
//                   <div
//                     style={{ backgroundImage: "url('/lp/sobre.jpg')" }}
//                     className="bg-cover bg-center w-80 h-80 md:w-96 md:h-96 rounded-full"
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Solução */}
//           <section id="solucao" className="bg-gray-100 py-20">
//             <div className="container mx-auto px-4 text-center flex flex-col items-center">
//               <Image
//                 src={"/lp/logo-green.png"}
//                 width={300}
//                 height={300}
//                 alt="logo white"
//               />
//               <h3 className="text-3xl font-bold mb-8">{t("solution.title")}</h3>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {/* Para cada item de solução do PPT, crie um card */}
//                 <div className="bg-white p-6 rounded-lg shadow">
//                   <Link href={"/dashboard/overview"}>
//                     <h4 className="font-semibold text-xl mb-2 bg-[#045629] text-white p-2 h-18 flex items-center justify-center rounded-lg">
//                       {t("solution.cards.overview.title")}
//                     </h4>
//                   </Link>
//                   <p className="text-xl mt-10 text-[#045629] font-bold">
//                     {t("solution.cards.overview.body")}
//                   </p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow">
//                   <Link
//                     href="https://buy.stripe.com/14A5kDaLe4v48Ie0yhefC05"
//                     target="_blank"
//                   >
//                     <h4 className="font-semibold text-xl mb-2 bg-[#045629] text-white p-2 h-18 flex items-center justify-center rounded-lg">
//                       {t("solution.cards.buy.title")}
//                     </h4>
//                   </Link>
//                   <p className="text-xl mt-10 text-[#045629] font-bold">
//                     {t("solution.cards.buy.body")}
//                   </p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow">
//                   <Link href={"/dashboard/nfts"}>
//                     <h4 className="font-semibold text-xl mb-2 bg-[#045629] text-white p-2 h-18 flex items-center justify-center rounded-lg">
//                       {t("solution.cards.myNfts.title")}
//                     </h4>
//                   </Link>
//                   <p className="text-xl mt-10 text-[#045629] font-bold">
//                     {t("solution.cards.myNfts.body")}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Benefícios */}
//           <section
//             id="beneficios"
//             className="bg-cover bg-center w-full flex flex-col md:flex-row justify-between pb-5"
//             style={{ backgroundImage: "url('/lp/bg.png')" }}
//           >
//             <div className="w-full">
//               <Image
//                 src={"/lp/image1.png"}
//                 width={600}
//                 height={600}
//                 alt="logo white"
//                 className="md:rounded-br-[100px]"
//               />
//               <div className="w-full flex flex-col items-center mt-10 px-4">
//                 <h1 className="text-4xl md:text-6xl text-white font-bold">
//                   {t("benefits.social.title")}
//                 </h1>
//                 <h1 className="text-6xl text-white font-bold">75</h1>
//                 <span className="text-xl text-white font-bold">
//                   {t("benefits.social.label")}
//                 </span>
//                 <p className="text-lg text-white text-center mt-10 max-w-96">
//                   {t("benefits.social.text")}
//                 </p>
//               </div>
//             </div>
//             <div className="w-full flex items-center flex-col ">
//               <span className="font-semibold text-white text-3xl md:text-4xl mt-10">
//                 {t("benefits.header.line1")}
//               </span>
//               <h1 className="font-thin text-white text-3xl md:text-4xl">
//                 {t("benefits.header.line2")}
//               </h1>
//               <h1 className="mt-10 font-bold text-white text-5xl">
//                 {t("benefits.header.title")}
//               </h1>
//               <Image
//                 src={"/lp/image2.png"}
//                 width={400}
//                 height={400}
//                 alt="logo white"
//                 className="md:rounded-t-[100px] mt-5"
//               />
//               <div className="w-full flex flex-col items-center mt-10 px-4">
//                 <h1 className="text-4xl md:text-6xl text-white font-bold">
//                   {t("benefits.environmental.title")}
//                 </h1>
//                 <h1 className="text-6xl text-white font-bold">6.152</h1>
//                 <span className="text-xl text-white font-bold">
//                   {t("benefits.environmental.label")}
//                 </span>
//                 <p className="text-lg text-white text-center mt-5 max-w-96">
//                   {t("benefits.environmental.text")}
//                 </p>
//               </div>
//             </div>
//             <div className="w-full">
//               <Image
//                 src={"/lp/image3.png"}
//                 width={600}
//                 height={600}
//                 alt="logo white"
//                 className="md:rounded-bl-[100px]"
//               />
//               <div className="w-full flex flex-col items-center mt-10 px-4">
//                 <h1 className="text-4xl md:text-6xl text-white font-bold">
//                   {t("benefits.sustainable.title")}
//                 </h1>
//                 <h1 className="text-6xl text-white font-bold">51</h1>
//                 <span className="text-xl text-white font-bold">
//                   {t("benefits.sustainable.label")}
//                 </span>
//                 <p className="text-lg text-white text-center mt-10 max-w-96">
//                   {t("benefits.sustainable.text")}
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Chamada para Ação */}
//           <section
//             id="contato"
//             className="bg-[#045629] text-white py-20 text-center"
//           >
//             <h3 className="text-3xl font-bold mb-4">{t("cta.title")}</h3>
//             <p className="mb-8">{t("cta.subtitle")}</p>
//             <a
//               href="mailto:contato@semeando.com"
//               className="inline-block bg-yellow-400 text-green-900 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
//             >
//               {t("cta.button")}
//             </a>
//           </section>
//         </main>

//         {/* Footer */}
//         <footer className="bg-[#045629] text-white py-6 text-center">
//           &copy; {new Date().getFullYear()} {t("footer.copyright")}
//         </footer>
//       </div>
//     </>
//   );
// }

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/logo-amazonas.png" alt="Logo Amazonas" width={150} height={60}/>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Image src="/logo.png" alt="Hope Green Logo" width={120} height={40}/>
            <a href="#missao" className="text-sm font-medium hover:text-primary transition">
              Missão
            </a>
            <a href="#agricultores" className="text-sm font-medium hover:text-primary transition">
              Agricultores
            </a>
            <a href="#impacto" className="text-sm font-medium hover:text-primary transition">
              Impacto
            </a>
            <Button
              className="bg-[#0A7E3E] hover:bg-[#0A7E3E]/90 text-white px-6"
            >
              <a href="/dashboard">Participar</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#missao"
                className="text-sm hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                Missão
              </a>
              <a
                href="#agricultores"
                className="text-sm hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                Agricultores
              </a>
              <a
                href="#impacto"
                className="text-sm hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                Impacto
              </a>
              <Button
                className="bg-[#0A7E3E] hover:bg-[#0A7E3E]/90 w-full"
              >
                <a href="/dashboard">Participar</a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-0 relative overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[auto] lg:min-h-[600px]">
          {/* Left Content */}
          <div className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 flex flex-col justify-center order-2 lg:order-1">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-[#0A7E3E] uppercase tracking-widest">
                  SUSTENTABILIDADE NA AMAZÔNIA
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A5632] leading-tight">
                  Amazonas: o Guardião dos Guardiões da Amazônia
                </h1>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
                O Estado do Amazonas está comprometido com seus agricultores, plantando esperança através do reflorestamento e da preservação da floresta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button
                  className="bg-[#0A7E3E] hover:bg-[#0A7E3E]/90 text-white gap-2 w-full sm:w-auto px-6 py-6 text-base"
                >
                  <a href="/dashboard" className="flex justify-center items-center gap-2">
                    Conheça o Projeto <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto px-6 py-6 text-base"
                >
                  <a href="/dashboard">Saiba Mais</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="h-[280px] sm:h-[380px] lg:h-[600px] overflow-hidden relative order-1 lg:order-2"
            style={{
              transform: typeof window !== "undefined" && window.innerWidth >= 1024
                ? `translateY(${scrollY * 0.2}px)`
                : "none",
            }}
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028523293/G4jCsDV9J7ipDY3HKV5GYW/hero-floresta-amazonica-SanUegego6ZsikUBENV74L.webp"
              alt="Floresta Amazônica"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Missão Section */}
      <section id="missao" className="py-14 sm:py-16 lg:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold text-[#0A7E3E] uppercase tracking-widest mb-3">
              NOSSA MISSÃO
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A5632] mb-6">
              Conectando Inovação e Propósito
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Cada ação do Estado do Amazonas reflete o compromisso com a sustentabilidade, a comunidade local e a preservação do maior tesouro natural do Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-14 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Como Funciona o Projeto
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
              Um processo transparente que conecta você ao impacto real na Amazônia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-6">
            {[
              { num: "01", title: "Agricultor", desc: "Propriedade identificada na Amazônia" },
              { num: "02", title: "Plantio", desc: "Mudas plantadas com cuidado" },
              { num: "03", title: "Rastreamento", desc: "Acompanhe via NFT no dashboard" },
              { num: "04", title: "Impacto", desc: "Floresta restaurada e comunidade fortalecida" }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-accent text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agricultores Section */}
      <section id="agricultores" className="py-14 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-[#0A7E3E] uppercase tracking-widest mb-3">
              CONHEÇA NOSSOS GUARDIÕES
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A5632] mb-6">
              Ramal do Laranjal e Nova Esperança
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Agricultores de Manacapuru que dedicam suas vidas à preservação da Amazônia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Marlon",
                role: "Agricultor Familiar e Guardião da Floresta em Manacapuru",
                image: "/02.jpeg"
              },
              {
                name: "Manuel Dourado",
                role: "Agricultor Familiar e Guardião da Floresta em Manacapuru",
                image: "/03.jpg"
              }
            ].map((farmer, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg mb-4 h-96 sm:h-[28rem] md:h-[32rem]">
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A5632] mb-2 text-center">{farmer.name}</h3>
                <p className="text-sm sm:text-base text-gray-700 font-medium text-center">{farmer.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Poder de Transformação Global Section */}
      <section className="py-14 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A5632] mb-6">
                Poder de Transformação Global
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  A Floresta Amazônica tem um dos maiores potenciais do planeta para atuar como sumidouro de carbono, possivelmente o maior sistema natural de remoção de CO<sub>2</sub> do mundo.
                </p>
                <p>
                  Se ocorrer desmatamento zero, restauração de áreas degradadas e sistemas agroflorestais, podemos estimar que a Amazônia poderia remover 3 a 5 bilhões de toneladas de CO<sub>2</sub> por ano. Isso tornaria a região o maior sumidouro de carbono terrestre do planeta!
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2">
              <div className="rounded-lg overflow-hidden shadow-lg h-64 sm:h-80 lg:h-96">
                <img
                  src="/01.png"
                  alt="Floresta Amazônica - CO2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto Section */}
      <section id="impacto" className="py-14 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Nosso Impacto
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
              Números que mostram nosso compromisso com a Amazônia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { number: "6.152", label: "Mudas Plantadas", icon: "/icons/leaf.png" },
              { number: "51", label: "Hectares Restaurados", icon: "/icons/tree.png" },
              { number: "75+", label: "Pessoas Impactadas", icon: "/icons/people.png" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-lg text-center border border-border hover:shadow-lg transition flex items-center flex-col gap-4">
                <img src={stat.icon} className="w-15 h-10"/>
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-base sm:text-lg text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Before/After */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-2xl font-bold text-primary text-center mb-8">
              Transformação Visível
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden h-72 sm:h-80 lg:h-96">
                <img
                  src="/lp/antesedepois.png"
                  alt="Antes e Depois"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-primary mb-4">
                  De Terra Degradada a Floresta Viva
                </h4>
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-6">
                  Através da dedicação de nossos agricultores e do apoio da comunidade,
                  conseguimos transformar áreas degradadas em florestas vibrantes.
                  Cada hectare restaurado é um passo em direção a um futuro mais verde.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Regeneração natural do ecossistema</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Aumento da biodiversidade</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Renda sustentável para comunidades locais</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-16 lg:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-4xl  font-bold mb-4">
            Seja Parte Desta Transformação
          </h2>
          <p className="text-base sm:text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Junte-se a nós na missão de proteger a Amazônia e fortalecer a agricultura familiar.
            Cada ação conta.
          </p>
          <div className="flex flex-col text-primary sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              className="bg-white text-primary hover:bg-white/90 gap-2 w-full sm:w-auto"
            >
              <a href="/dashboard" className="text-primary flex justify-center items-center gap-2">
                Participar Agora <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="default"
                className="border-white border-2 text-white bg-primary hover:bg-white/10 w-full sm:w-auto"
            >
              <a href="/dashboard" className="">Saiba Mais</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-primary mb-4">GBR Componentes</h4>
              <p className="text-sm text-foreground/70">
                Indústria de componentes da Amazônia comprometida com a sustentabilidade.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Projeto</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="/dashboard" className="hover:text-primary transition">Sobre</a></li>
                <li><a href="/dashboard" className="hover:text-primary transition">Como Funciona</a></li>
                <li><a href="/dashboard" className="hover:text-primary transition">Impacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Parceiros</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="/dashboard" className="hover:text-primary transition">Hope Green Agro</a></li>
                <li><a href="/dashboard" className="hover:text-primary transition">GBR</a></li>
                <li><a href="/dashboard" className="hover:text-primary transition">Comunidades</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-foreground/70 break-all">
                <li>
                  <a
                    href="mailto:contato@gbrcomponentes.com.br"
                    className="hover:text-primary transition"
                  >
                    contato@gbrcomponentes.com.br
                  </a>
                </li>
                <li>
                  <a href="tel:+5592" className="hover:text-primary transition">
                    +55 92 XXXX-XXXX
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/70">
            <p>
              &copy; 2026 GBR Componentes. Todos os direitos reservados. | Semeando o futuro, uma muda por vez.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}