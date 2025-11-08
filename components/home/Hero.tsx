import React from "react";
import CheckFormPrice from "./CheckFormPrice";
import GetStartedSection from "@/components/home/GetStartedSection";
import AdsBanner from "../GoogelBannerAds";

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
          <AdsBanner />

          <GetStartedSection />
        </section>
      </div>
    </main>
  );
};

export default Hero;
