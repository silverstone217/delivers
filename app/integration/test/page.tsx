import { roboto } from "@/lib/fonts";
import TestForm from "./TestForm";

export default function TestAPIPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className={`${roboto.className} text-3xl font-bold`}>
        Tester l’API de Tarification
      </h1>

      <p className="text-muted-foreground">
        Entrez une adresse d’origine et de destination ainsi que les dimensions
        du colis pour voir les tarifs disponibles via votre clé API.
      </p>

      <TestForm />
    </div>
  );
}
