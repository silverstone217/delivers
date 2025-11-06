import { roboto } from "@/lib/fonts";
import TokenCard from "@/components/integration/TokenCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CredentialsPage() {
  return (
    <div className="max-w-4xl  w-full mx-auto p-6 space-y-6">
      <h1 className={`${roboto.className} text-3xl font-bold`}>
        Bienvenue dans la section API
      </h1>
      <p className="text-muted-foreground text-sm">
        Chaque e-commerce ou développeur possède un identifiant unique
        permettant d’authentifier les requêtes faites à notre API. Ne partagez
        jamais votre token.
      </p>

      <TokenCard />

      <div className="mt-4 space-y-1.5">
        <p>Tester votre Cle ici.</p>
        <Link href={"/integration/test"}>
          <Button>Commencer a tester</Button>
        </Link>
      </div>
    </div>
  );
}
