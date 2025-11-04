"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { useRouter } from "next/navigation"; // 💡 Ajout de useRouter
import Image from "next/image";
import { TARIF_IMAGE } from "@/lib/env";
import { getTarifsByParams } from "@/actions/tarifs";
import { Contact } from "@prisma/client";
import TarifCard from "./TarifCard";
// import { getTarifsByParams } from "@/actions/tarifs"; // 💡 Importez votre Server Action ici (simulé ci-dessous)

// --- SIMULATION D'UNE SERVER ACTION (À REMPLACER PAR VOTRE VRAIE ACTION) ---
type Tarif = {
  companyId: string;
  companyName: string;
  companyLogo: string | null;
  price: number;
  express: boolean;
  tarifId: string;
  contacts: Contact | null;
};

type InitialSearchParams = { [key: string]: string | string[] | undefined };

const CheckFormComponent = ({
  initialSearchParams,
}: {
  initialSearchParams: InitialSearchParams;
}) => {
  // const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Initialisation des états à partir de l'URL
  const [communeDepart, setCommuneDepart] = useState(
    (initialSearchParams.communeDepart as string) || ""
  );
  const [quartierDepart, setQuartierDepart] = useState(
    (initialSearchParams.quartierDepart as string) || ""
  );
  const [communeArrivee, setCommuneArrivee] = useState(
    (initialSearchParams.communeArrivee as string) || ""
  );
  const [quartierArrivee, setQuartierArrivee] = useState(
    (initialSearchParams.quartierArrivee as string) || ""
  );

  // Les dimensions et Express
  const [width, setWidth] = useState(
    (initialSearchParams.width as string) || ""
  );
  const [weight, setWeight] = useState(
    (initialSearchParams.weight as string) || ""
  );
  const [length, setLength] = useState(
    (initialSearchParams.length as string) || ""
  );

  const [isExpress, setIsExpress] = useState(
    initialSearchParams.isExpress === "true"
  );

  const [tarifs, setTarifs] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // 💡 NOUVEAU: Pour marquer le premier fetch

  // 🧭 Ref vers la section "Résultats des Tarifs"
  const resultSectionRef = useRef<HTMLDivElement | null>(null);

  // 2. Fonction de Fetching : prend les paramètres explicitement
  const fetchTarifs = useCallback(
    async (currentParams: {
      communeDepart: string;
      quartierDepart: string;
      communeArrivee: string;
      quartierArrivee: string;
      width: string;
      weight: string;
      length: string;
      express: boolean;
    }) => {
      const {
        communeDepart,
        quartierDepart,
        communeArrivee,
        quartierArrivee,
        width,
        weight,
        length,
        express,
      } = currentParams;

      if (
        !communeDepart ||
        !quartierDepart ||
        !communeArrivee ||
        !quartierArrivee ||
        parseFloat(weight) <= 0 ||
        parseFloat(length) <= 0 ||
        parseFloat(width) <= 0
      ) {
        setTarifs([]);
        return;
      }

      setLoading(true);
      try {
        const result = await getTarifsByParams({
          ...currentParams,
          // Correction de type pour la server action si elle attend 'express' et non 'isExpress'
          express: express,
        });

        if (result.error) {
          toast.error(result.message);
          setTarifs([]);
          return;
        }

        setTarifs(result.data);

        // 🧭 Après un fetch réussi → Scroll vers la section des résultats
        setTimeout(() => {
          resultSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      } catch (err) {
        console.error(err);
        toast.error("Impossible de joindre le service de recherche.");
      } finally {
        setLoading(false);
      }
    },
    []
  ); // 💡 PAS DE DÉPENDANCES D'ÉTAT DU FORMULAIRE ICI !

  // 3. Effet pour lancer le fetch initial (UNE SEULE FOIS)
  useEffect(() => {
    // Empêche le re-fetch si l'utilisateur change juste un champ après le montage initial
    if (hasFetched) return;

    // Vérifie si l'URL contient au moins les données minimales pour la recherche
    if (
      !isEmptyString(communeDepart) &&
      !isEmptyString(quartierDepart) &&
      !isEmptyString(weight)
    ) {
      // On construit les paramètres à partir de l'état actuel de l'URL
      const initialParams = {
        communeDepart,
        quartierDepart,
        communeArrivee,
        quartierArrivee,
        width,
        weight,
        length,
        express: isExpress,
      };

      fetchTarifs(initialParams);
      setHasFetched(true); // Marque que le premier fetch a été fait
    }
  }, [
    communeArrivee,
    communeDepart,
    fetchTarifs,
    hasFetched,
    isExpress,
    length,
    quartierArrivee,
    quartierDepart,
    weight,
    width,
  ]);

  // 4. Logique de validation (Identique)
  const isDisabledBtn = useMemo(() => {
    // ... (Logique identique)
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

  // 5. Handler pour le formulaire (met à jour l'URL et refetch MANUEL)
  const handleUpdateAndFetch = (e: React.FormEvent) => {
    e.preventDefault();

    if (isDisabledBtn) return;

    // 5.1 Construire les NOUVEAUX paramètres à partir des états actuels
    const currentParamsForFetch = {
      communeDepart,
      quartierDepart,
      communeArrivee,
      quartierArrivee,
      width,
      weight,
      length,
      express: isExpress, // Ceci est un BOOLEEN, nécessaire pour le FETCH
    };

    // 5.2 Construire les paramètres pour l'URLSearchParams (TOUT DOIT ÊTRE STRING)
    const newSearchParamsObject: Record<string, string> = {
      communeDepart,
      quartierDepart,
      communeArrivee,
      quartierArrivee,
      width,
      weight,
      length,
      isExpress: isExpress.toString(), // Convertit le BOOLEEN en STRING ("true" ou "false")
    };

    const newParams = new URLSearchParams(newSearchParamsObject).toString(); // ✅ Correction ici

    // 5.3 Mettre à jour l'URL (pour que l'état soit persistant si l'utilisateur rafraîchit)
    router.replace(`/tarifs?${newParams}`, { scroll: false });

    // 5.4 Déclencher le fetch MANUELLEMENT avec les paramètres de fetch (inclut le boolean)
    fetchTarifs(currentParamsForFetch);
    setHasFetched(true);
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
          <form
            onSubmit={handleUpdateAndFetch}
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
                      onValueChange={setCommuneDepart}
                      value={communeDepart}
                      setReliedValue={setQuartierDepart}
                    />
                  </div>

                  <div className="w-full grid gap-1.5">
                    <Label>Quartier</Label>
                    <SelectComponentQuartier
                      data={quartiersParCommune}
                      placeholder="Choisir le quartier de départ"
                      disabled={loading || isEmptyString(communeDepart)}
                      onValueChange={setQuartierDepart}
                      value={quartierDepart}
                      selectedCommune={communeDepart}
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
                      onValueChange={setCommuneArrivee}
                      value={communeArrivee}
                      setReliedValue={setQuartierArrivee}
                    />
                  </div>

                  <div className="w-full grid gap-1.5">
                    <Label>Quartier</Label>
                    <SelectComponentQuartier
                      data={quartiersParCommune}
                      placeholder="Choisir le quartier d'arrivée"
                      disabled={loading || isEmptyString(communeArrivee)}
                      onValueChange={setQuartierArrivee}
                      value={quartierArrivee}
                      selectedCommune={communeArrivee}
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
                {loading && (
                  <Loader className="animate-spin h-4 w-4 shrink-0" />
                )}
                {loading ? "Recherche en cours..." : "Comparer les Tarifs"}
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
            width={1200}
            height={1500}
            className="object-cover w-full h-[600px] rounded-lg bg-black/30"
          />
        </div>
      </div>

      {/* AFFICHAGE DES TARIFS */}
      <section className="w-full py-6 px-4" id="tarifs" ref={resultSectionRef}>
        <h2 className="font-bold text-xl mb-4">Résultats des Tarifs</h2>

        {loading && (
          <p className="text-center text-muted-foreground py-6">
            Chargement des meilleurs tarifs...
          </p>
        )}

        {!loading && tarifs.length > 0 ? (
          <div
            className="grid gap-5
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4"
          >
            {tarifs.map((t) => (
              <TarifCard key={t.tarifId} tarif={t} />
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-muted-foreground py-6">
              Aucun tarif trouvé pour ces critères.
            </p>
          )
        )}
      </section>
    </div>
  );
};

export default CheckFormComponent;
