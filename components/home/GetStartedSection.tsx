import { SITE_NAME } from "@/lib/env";
import { roboto } from "@/lib/fonts";
import { capitaliseFirstLetter } from "@/utils/function";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function GetStartedSection() {
  return (
    <section
      className="flex flex-col gap-5 py-4 md:py-6 lg:py-8 
                 animate-fadeInUp duration-700 ease-out"
    >
      {/* Titre principal */}
      <div className="space-y-2">
        <h1
          className={`${roboto.className} text-4xl md:text-5xl font-bold tracking-tight`}
        >
          <span className="text-primary">
            {capitaliseFirstLetter(SITE_NAME)}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground leading-snug">
          Bienvenue sur{" "}
          <span className="font-semibold text-foreground">
            {capitaliseFirstLetter(SITE_NAME)}
          </span>
          , votre comparateur de prix de livraison au <strong>Congo</strong>.
          Trouvez les meilleurs tarifs en quelques secondes.
        </p>
      </div>

      {/* Texte explicatif */}
      <div className="space-y-3">
        <p className="text-sm md:text-base text-muted-foreground">
          🚚 Sélectionnez votre point de départ et d’arrivée, saisissez les
          dimensions de votre colis et obtenez instantanément les offres des
          meilleures compagnies locales.
        </p>
        <p className="text-sm md:text-base text-muted-foreground">
          Comparez, choisissez et économisez sur vos livraisons — tout ça depuis
          une seule plateforme simple et rapide.
        </p>
      </div>

      {/* Bouton d’action */}
      <Link href="/espace" className="w-fit mt-2 group">
        <Button
          size="lg"
          className="transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-md"
        >
          <span>Commencer maintenant</span>
          <ChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </section>
  );
}
