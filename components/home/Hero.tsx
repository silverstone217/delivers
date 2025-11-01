import { roboto } from "@/lib/fonts";
import { capitaliseFirstLetter } from "@/utils/function";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SITE_NAME } from "@/lib/env";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <main className="max-w-7xl mx-auto p-6 flex gap-3 flex-col ">
      <h2 className={`${roboto.className} text-5xl font-bold`}>
        {capitaliseFirstLetter(SITE_NAME)}
      </h2>
      <p className="text-lg ">
        Bienvenue sur <span>{capitaliseFirstLetter(SITE_NAME)}</span>, le
        comparateur de prix de livraison en ligne au Congo !
      </p>
      <Link href={"/espace"} className="w-fit">
        <Button>
          <span>Commencer maintenant</span>
          <ChevronRight />
        </Button>
      </Link>
    </main>
  );
};

export default Hero;
