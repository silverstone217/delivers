import { HERO_IMAGE } from "@/lib/env";
import Image from "next/image";
import React from "react";
import CheckFormPrice from "./CheckFormPrice";

const Hero = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-6 pt-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 items-start">
        {/* 1. Le formulaire à gauche (ou à droite selon l'ordre) */}
        <section className="w-full">
          <CheckFormPrice />
        </section>

        {/* 2. L'image à droite */}
        <section className="w-full">
          <Image
            src={HERO_IMAGE}
            priority
            // Ajuster la hauteur pour qu'elle corresponde au formulaire si possible
            className="w-full object-cover rounded-lg shadow-xl min-h-full"
            alt="HERO IMAGE : women with computer"
            width={1200}
            height={1000}
          />
        </section>
      </div>
    </main>
  );
};

export default Hero;
