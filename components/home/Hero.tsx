import React from "react";
import CheckFormPrice from "./CheckFormPrice";
import GetStartedSection from "@/components/home/GetStartedSection";
// import AdsBanner from "../GoogelBannerAds";
import Image from "next/image";
import { HERO_IMAGE } from "@/lib/env";

const Hero = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-6 pt-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-start">
        {/* 1. Le formulaire à gauche (ou à droite selon l'ordre) */}
        <section className="w-full">
          <CheckFormPrice />
        </section>

        {/* 2. L'image à droite */}
        <section className="w-full relative">
          <Image
            src={HERO_IMAGE}
            priority
            className="w-full object-cover rounded-lg shadow-xl min-h-full animate-fadeInUp transition-all duration-300"
            alt="HERO IMAGE : fallback"
            width={1200}
            height={1000}
          />

          <GetStartedSection />
        </section>
      </div>
    </main>
  );
};

export default Hero;
