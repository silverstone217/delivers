import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/env";
import { roboto } from "@/lib/fonts";
import { capitaliseFirstLetter } from "@/utils/function";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-6 flex gap-3 flex-col">
      <h2 className={`${roboto.className} text-5xl font-bold`}>DELIVERS</h2>
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
}
