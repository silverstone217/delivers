"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Checkbox } from "../ui/checkbox";
import {
  SelectComponentCommune,
  SelectComponentQuartier,
} from "../SelectComponent";
import { communesKinshasa, quartiersParCommune } from "@/utils/zones";
import { isEmptyString } from "@/utils/function";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation"; // 💡 Ajout de useRouter
import Image from "next/image";
import { TARIF_IMAGE } from "@/lib/env";
// import { getTarifsByParams } from "@/actions/tarifs"; // 💡 Importez votre Server Action ici (simulé ci-dessous)

// --- SIMULATION D'UNE SERVER ACTION (À REMPLACER PAR VOTRE VRAIE ACTION) ---
type Tarif = {
  id: string;
  companyName: string;
  price: number;
  express: boolean;
};
const getTarifsByParams = async (params: Record<string, string | boolean>) => {
  console.log("Appel Server Action avec:", params);
  // Simuler un délai et des résultats
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    tarifs: [
      {
        id: "t1",
        companyName: "SpeedyGo",
        price: 3500,
        express: !!params.isExpress,
      },
      {
        id: "t2",
        companyName: "ReliableDelivery",
        price: 4200,
        express: false,
      },
    ] as Tarif[],
  };
};
// --------------------------------------------------------------------------

const CheckFormComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // 💡 Utilisé pour modifier l'URL

  // 1. Initialisation des états à partir de l'URL
  // Les adresses sont lues une seule fois car on ne veut pas qu'elles changent dans ce composant
  const [communeDepart, setCommuneDepart] = useState(
    searchParams.get("communeDepart") || ""
  ); // 💡 Rendu modifiable
  const [quartierDepart, setQuartierDepart] = useState(
    searchParams.get("quartierDepart") || ""
  ); // 💡 Rendu modifiable
  const [communeArrivee, setCommuneArrivee] = useState(
    searchParams.get("communeArrivee") || ""
  ); // 💡 Rendu modifiable
  const [quartierArrivee, setQuartierArrivee] = useState(
    searchParams.get("quartierArrivee") || ""
  ); // 💡 Rendu modifiable

  // Les dimensions et Express sont modifiables par l'utilisateur
  const [width, setWidth] = useState(searchParams.get("width") || "");
  const [weight, setWeight] = useState(searchParams.get("weight") || "");
  const [length, setLength] = useState(searchParams.get("length") || "");
  const [isExpress, setIsExpress] = useState(
    searchParams.get("isExpress") === "true"
  );

  const [tarifs, setTarifs] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. Fonction de Fetching via Server Action
  // Utiliser useCallback pour que cette fonction ne soit pas recréée à chaque rendu
  const fetchTarifs = useCallback(async () => {
    if (
      !communeDepart ||
      !quartierDepart ||
      !communeArrivee ||
      !quartierArrivee ||
      parseFloat(weight) <= 0 ||
      parseFloat(length) <= 0 ||
      parseFloat(width) <= 0
    ) {
      setTarifs([]); // Vider les résultats si les paramètres sont incomplets
      return;
    }

    setLoading(true);
    try {
      const params = {
        communeDepart,
        quartierDepart,
        communeArrivee,
        quartierArrivee,
        width: width,
        weight: weight,
        length: length,
        isExpress: isExpress,
      };

      // 💡 APPEL DE LA SERVER ACTION
      const result = await getTarifsByParams(params);

      if (result.success) {
        setTarifs(result.tarifs);
      } else {
        toast.error("Erreur lors de la recherche des tarifs.");
        setTarifs([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Impossible de joindre le service de recherche.");
    } finally {
      setLoading(false);
    }
  }, [
    communeDepart,
    quartierDepart,
    communeArrivee,
    quartierArrivee,
    width,
    weight,
    length,
    isExpress,
  ]);

  // 3. Effet pour lancer le fetch initial
  useEffect(() => {
    // Si tous les paramètres sont présents, lance la recherche initiale
    if (!isEmptyString(communeDepart) && !isEmptyString(quartierDepart)) {
      fetchTarifs();
    }
  }, [fetchTarifs, communeDepart, quartierDepart]); // Dépendance cruciale

  // 4. Logique de validation du bouton
  const isDisabledBtn = useMemo(() => {
    const isDimensionInvalid =
      parseFloat(weight) <= 0 ||
      parseFloat(length) <= 0 ||
      parseFloat(width) <= 0;

    return (
      loading ||
      isEmptyString(communeDepart) ||
      isEmptyString(quartierDepart) ||
      isEmptyString(communeArrivee) ||
      isEmptyString(quartierArrivee) ||
      isEmptyString(weight) ||
      isEmptyString(length) ||
      isEmptyString(width) ||
      isDimensionInvalid
    );
  }, [
    communeArrivee,
    communeDepart,
    length,
    loading,
    quartierArrivee,
    quartierDepart,
    weight,
    width,
  ]);

  // 5. Handler pour le formulaire (met à jour l'URL et refetch)
  const handleUpdateAndFetch = (e: React.FormEvent) => {
    e.preventDefault();

    // Si désactivé, on arrête
    if (isDisabledBtn) return;

    // 5.1 Construire les nouveaux paramètres (y compris les adresses au cas où elles seraient modifiées)
    const newParams = new URLSearchParams({
      communeDepart,
      quartierDepart,
      communeArrivee,
      quartierArrivee,
      width,
      weight,
      length,
      isExpress: isExpress.toString(),
    }).toString();

    // 5.2 Mettre à jour l'URL (sans recharger la page complète)
    router.replace(`/tarifs?${newParams}`, { scroll: false });

    // 5.3 Le useEffect déclenchera le fetch après la mise à jour des états
    fetchTarifs();
  };

  // 6. Rendu du Composant

  return (
    <div className="w-full shadow-lg">
      <div className="grid lg:grid-cols-2 grid-cols-1 p-6 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={cn("text-2xl font-bold", roboto.className)}>
              🔍 Ajustez les paramètres de recherche
            </CardTitle>
            <CardDescription>
              {` Modifiez les dimensions ou l'option express pour voir l'impact sur les tarifs.`}
            </CardDescription>
          </CardHeader>

          {/* 💡 Formulaire pour soumettre les ajustements */}
          <form onSubmit={handleUpdateAndFetch} className="w-full">
            <CardContent className="w-full grid gap-6">
              {/* SECTION DÉPART */}
              <div className="grid gap-2 p-3 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-base text-blue-700">
                  1. Lieu de départ
                </h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label>Commune</Label>
                    <SelectComponentCommune
                      data={communesKinshasa}
                      placeholder="Choisir la commune de départ"
                      onValueChange={setCommuneDepart} // 💡 Mise à jour de l'état
                      value={communeDepart}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Quartier</Label>
                    <SelectComponentQuartier
                      data={quartiersParCommune}
                      placeholder="Choisir le quartier de départ"
                      onValueChange={setQuartierDepart} // 💡 Mise à jour de l'état
                      value={quartierDepart}
                      selectedCommune={communeDepart}
                      disabled={loading || isEmptyString(communeDepart)}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION ARRIVÉE */}
              <div className="grid gap-2 p-3 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-base text-green-700">
                  2. Lieu de la livraison
                </h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label>Commune</Label>
                    <SelectComponentCommune
                      data={communesKinshasa}
                      placeholder="Choisir la commune d'arrivée"
                      onValueChange={setCommuneArrivee} // 💡 Mise à jour de l'état
                      value={communeArrivee}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Quartier</Label>
                    <SelectComponentQuartier
                      data={quartiersParCommune}
                      placeholder="Choisir le quartier d'arrivée"
                      onValueChange={setQuartierArrivee} // 💡 Mise à jour de l'état
                      value={quartierArrivee}
                      selectedCommune={communeArrivee}
                      disabled={loading || isEmptyString(communeArrivee)}
                    />
                  </div>
                </div>
              </div>

              {/* DIMENSIONS & POIDS (Simplifié) */}
              <div className="grid gap-2 w-full">
                <h3 className="font-bold text-base text-gray-700">
                  3. Dimensions et Poids
                </h3>
                <div className="grid grid-cols-5 gap-2 w-full">
                  <Input
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Long. (cm)"
                    type="number"
                    min={0.1}
                    step="0.1"
                    disabled={loading}
                  />
                  <Input
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Larg. (cm)"
                    type="number"
                    min={0.1}
                    step="0.1"
                    disabled={loading}
                  />
                  <p className="p-2 border bg-gray-100 rounded-md flex items-center justify-center h-10 col-span-1">
                    Cm
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2 w-full">
                  <Input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Poids (kg)"
                    type="number"
                    min={0.1}
                    step="0.1"
                    disabled={loading}
                  />
                  <p className="p-2 border bg-gray-100 rounded-md flex items-center justify-center h-10 col-span-1">
                    Kg
                  </p>
                </div>
              </div>

              {/* OPTION EXPRESS */}
              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="express"
                  checked={isExpress}
                  onCheckedChange={(checked) => setIsExpress(!!checked)}
                  disabled={loading}
                />
                <Label
                  htmlFor="express"
                  className="text-base font-semibold text-orange-600"
                >
                  Livraison Express
                </Label>
              </div>
            </CardContent>

            {/* BOUTON DE RECHERCHE */}
            <CardFooter className="w-full pt-0">
              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isDisabledBtn}
              >
                {loading && (
                  <Loader className="animate-spin h-4 w-4 shrink-0" />
                )}
                {loading
                  ? "Recherche en cours..."
                  : "Rechercher avec ces paramètres"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* image */}
        <div className="w-full hidden lg:flex">
          <Image
            src={TARIF_IMAGE}
            alt=""
            priority
            width={1000}
            height={1000}
            className="object-cover w-full h-[600px] rounded-lg"
          />
        </div>
      </div>

      {/* AFFICHAGE DES TARIFS */}
      <div className="w-full p-6 ">
        <h2 className="font-bold text-xl mb-3">Résultats des Tarifs</h2>
        {loading && tarifs.length === 0 && (
          <p className="text-center text-muted-foreground py-6">
            Chargement des meilleurs tarifs...
          </p>
        )}

        {!loading && tarifs.length > 0 ? (
          <div className="grid gap-4">
            {tarifs.map((t) => (
              <Card key={t.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg text-primary">
                  {t.companyName}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-2xl font-bold text-green-600">
                    {t.price} FC
                  </p>
                  <p
                    className={cn(
                      "px-2 py-1 rounded-full text-sm font-medium",
                      t.express
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {t.express ? "Express" : "Standard"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-muted-foreground py-6">
              Aucun tarif trouvé pour ces critères.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default CheckFormComponent;
