"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { roboto } from "@/lib/fonts";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox"; // 💡 Importé pour l'option Express
import {
  SelectComponentCommune,
  SelectComponentQuartier,
} from "../SelectComponent";
import { communesKinshasa, quartiersParCommune } from "@/utils/zones";
import { isEmptyString } from "@/utils/function";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const CheckFormPrice = () => {
  // ✅ LIEU DE DÉPART (Source)
  const [commune, setCommune] = useState("");
  const [quartier, setQuartier] = useState("");

  // ✅ LIEU D'ARRIVÉE (Destination)
  const [communeDestination, setCommuneDestination] = useState("");
  const [quartierDestination, setQuartierDestination] = useState("");

  // ✅ DIMENSIONS & POIDS
  const [width, setWidth] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");

  // ✅ NOUVEL ÉTAT : OPTION EXPRESS
  const [isExpress, setIsExpress] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleFindTarif() {
    setLoading(true);

    try {
      // 🚀 CONSTRUIRE LES PARAMÈTRES DE REQUÊTE PROPREMENT
      const params = new URLSearchParams({
        communeDepart: commune,
        quartierDepart: quartier,
        communeArrivee: communeDestination,
        quartierArrivee: quartierDestination,
        width,
        weight,
        length,
        isExpress: isExpress.toString(), // 💡 AJOUTÉ : Conversion du booléen en chaîne
      }).toString();

      const query = `?${params}`;

      setTimeout(() => router.push(`/tarifs${query}`), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Oops! Une erreur s'est produite lors de la recherche.");
    } finally {
      // La fin du chargement est gérée par la redirection (timeout)
    }
  }

  const isDisabledBtn = useMemo(() => {
    // Vérification des 6 champs d'adresse + 3 dimensions/poids
    if (
      isEmptyString(commune) ||
      isEmptyString(quartier) ||
      isEmptyString(communeDestination) ||
      isEmptyString(quartierDestination) ||
      isEmptyString(weight) ||
      isEmptyString(length) ||
      isEmptyString(width)
    ) {
      return true;
    }

    // Vérification du chargement
    if (loading) return true;

    // S'assurer que les valeurs numériques sont > 0
    if (
      parseFloat(weight) <= 0 ||
      parseFloat(length) <= 0 ||
      parseFloat(width) <= 0
    ) {
      return true;
    }

    return false;
  }, [
    commune,
    quartier,
    communeDestination,
    quartierDestination,
    length,
    loading,
    weight,
    width,
  ]);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className={cn("text-2xl font-bold", roboto.className)}>
          📦 Estimez le coût de votre livraison
        </CardTitle>
        <CardDescription>
          Indiquez les détails de la livraison et les dimensions du colis pour
          trouver le meilleur tarif.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFindTarif();
        }}
        className="w-full grid grid-cols-1 gap-4"
      >
        <CardContent className="w-full grid gap-6">
          {/* 📍 SECTION DÉPART */}
          <div className="grid gap-2 p-3 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-base text-blue-700">
              1. Lieu de {`l'Envoi`} (Départ)
            </h3>
            <div className="w-full grid gap-4 lg:grid-cols-2 grid-cols-1">
              <div className="w-full grid gap-1.5">
                <Label>Commune</Label>
                <SelectComponentCommune
                  data={communesKinshasa}
                  placeholder="Choisir la commune de départ"
                  disabled={loading}
                  onValueChange={setCommune}
                  value={commune}
                  setReliedValue={setQuartier}
                />
              </div>

              <div className="w-full grid gap-1.5">
                <Label>Quartier</Label>
                <SelectComponentQuartier
                  data={quartiersParCommune}
                  placeholder="Choisir le quartier de départ"
                  disabled={loading || isEmptyString(commune)}
                  onValueChange={setQuartier}
                  value={quartier}
                  selectedCommune={commune}
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* 🏁 SECTION ARRIVÉE */}
          <div className="grid gap-2 p-3 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-base text-green-700">
              2. Lieu de la Livraison (Arrivée)
            </h3>
            <div className="w-full grid gap-4 lg:grid-cols-2 grid-cols-1">
              <div className="w-full grid gap-1.5">
                <Label>Commune</Label>
                <SelectComponentCommune
                  data={communesKinshasa}
                  placeholder="Choisir la commune d'arrivée"
                  disabled={loading}
                  onValueChange={setCommuneDestination}
                  value={communeDestination}
                  setReliedValue={setQuartierDestination}
                />
              </div>

              <div className="w-full grid gap-1.5">
                <Label>Quartier</Label>
                <SelectComponentQuartier
                  data={quartiersParCommune}
                  placeholder="Choisir le quartier d'arrivée"
                  disabled={loading || isEmptyString(communeDestination)}
                  onValueChange={setQuartierDestination}
                  value={quartierDestination}
                  selectedCommune={communeDestination}
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* 📏 SECTION DIMENSIONS ET POIDS */}
          <div className="grid gap-2">
            <h3 className="font-bold text-base text-gray-700">
              3. Dimensions et Poids du Colis
            </h3>

            {/* LONGUEUR, LARGEUR (CM) */}
            <div className="grid grid-cols-5 w-full gap-2">
              {/* ... (champs Longueur, Largeur et Unité CM) ... */}
              <div className="w-full grid gap-1.5 col-span-2">
                <Label htmlFor="length">Longueur</Label>
                <Input
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  type="number"
                  min={0.1}
                  step="0.1"
                  placeholder="Ex: 20"
                />
              </div>
              <div className="w-full grid gap-1.5 col-span-2">
                <Label htmlFor="width">Largeur</Label>
                <Input
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  type="number"
                  min={0.1}
                  step="0.1"
                  placeholder="Ex: 10"
                />
              </div>
              <div className="w-full grid gap-1.5 col-span-1">
                <Label htmlFor="unity" className="text-gray-500">
                  Unité
                </Label>
                <p className="p-2 border bg-gray-100 rounded-md flex items-center justify-center h-10">
                  Cm
                </p>
              </div>
            </div>

            {/* POIDS (KG) */}
            <div className="grid grid-cols-4 w-full gap-2 mt-2">
              <div className="w-full grid gap-1.5 col-span-3">
                <Label htmlFor="weight">Poids</Label>
                <Input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  type="number"
                  min={0.1}
                  step="0.1"
                  placeholder="Ex: 0.5"
                />
              </div>
              <div className="w-full grid gap-1.5 col-span-1">
                <Label htmlFor="unity" className="text-gray-500">
                  Unité
                </Label>
                <p className="p-2 border bg-gray-100 rounded-md flex items-center justify-center h-10">
                  Kg
                </p>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* ⚡ OPTION EXPRESS */}
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="express"
              checked={isExpress}
              onCheckedChange={(checked) => setIsExpress(!!checked)} // S'assurer que c'est un booléen
              disabled={loading}
            />
            <Label
              htmlFor="express"
              className="text-base font-semibold text-orange-600"
            >
              Livraison Express (Plus rapide)
            </Label>
          </div>
        </CardContent>

        <CardFooter className="w-full pt-0">
          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isDisabledBtn}
          >
            {loading && <Loader className="animate-spin h-4 w-4 shrink-0" />}
            {loading ? "Recherche en cours..." : "Comparer les Tarifs"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CheckFormPrice;
