/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { communesKinshasa, quartiersParCommune } from "@/utils/zones";
import { toast } from "sonner";
import { isEmptyString } from "@/utils/function";

type CommuneKey = keyof typeof quartiersParCommune;

export default function APITestForm() {
  const [originCommune, setOriginCommune] = useState<CommuneKey | "">("");
  const [originQuartier, setOriginQuartier] = useState<string>("");
  const [destCommune, setDestCommune] = useState<CommuneKey | "">("");
  const [destQuartier, setDestQuartier] = useState<string>("");

  const [weight, setWeight] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [length, setLength] = useState<number | "">("");
  const [express, setExpress] = useState<boolean>(false);

  const [apiKey, setApiKey] = useState<string>("");

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setResult(null);
    if (!apiKey) {
      toast.error("API Key est obligatoire");
      return;
    }

    if (!originCommune || !originQuartier || !destCommune || !destQuartier) {
      toast.error("Veuillez remplir toutes les communes et quartiers");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/get-pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          origin: { commune: originCommune, quartier: originQuartier },
          destination: { commune: destCommune, quartier: destQuartier },
          parcel: {
            weight,
            width,
            length,
          },
          express,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
        toast.success("Résultats récupérés avec succès");
      } else {
        toast.error(data.error || "Erreur lors de la récupération");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la requête");
    } finally {
      setLoading(false);
    }
  };

  const isBtnDisabled = useMemo(() => {
    if (loading) return true;
    if (
      isEmptyString(apiKey) ||
      isEmptyString(originQuartier) ||
      isEmptyString(destQuartier) ||
      isEmptyString(width.toString()) ||
      isEmptyString(weight.toString()) ||
      isEmptyString(length.toString())
    )
      return true;

    return false;
  }, [apiKey, destQuartier, length, loading, originQuartier, weight, width]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* API Key */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm">API Key</label>
        <Input
          placeholder="Entrez votre API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      {/* Origine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Commune d&apos;origine</label>
          <Select
            value={originCommune}
            onValueChange={(value) => {
              setOriginCommune(value as CommuneKey);
              setOriginQuartier("");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir la commune" />
            </SelectTrigger>
            <SelectContent>
              {communesKinshasa.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Quartier d&apos;origine</label>
          <Select
            value={originQuartier}
            onValueChange={setOriginQuartier}
            disabled={!originCommune}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir le quartier" />
            </SelectTrigger>
            <SelectContent>
              {originCommune &&
                quartiersParCommune[originCommune].map((q) => (
                  <SelectItem key={q} value={q}>
                    {q}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Commune de destination</label>
          <Select
            value={destCommune}
            onValueChange={(value) => {
              setDestCommune(value as CommuneKey);
              setDestQuartier("");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir la commune" />
            </SelectTrigger>
            <SelectContent>
              {communesKinshasa.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Quartier de destination</label>
          <Select
            value={destQuartier}
            onValueChange={setDestQuartier}
            disabled={!destCommune}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir le quartier" />
            </SelectTrigger>
            <SelectContent>
              {destCommune &&
                quartiersParCommune[destCommune].map((q) => (
                  <SelectItem key={q} value={q}>
                    {q}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          placeholder="Poids (kg)"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Largeur (cm)"
          value={width}
          onChange={(e) => setWidth(parseFloat(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Longueur (cm)"
          value={length}
          onChange={(e) => setLength(parseFloat(e.target.value))}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="express"
          type="checkbox"
          checked={express}
          onChange={(e) => setExpress(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="express" className="text-sm font-medium">
          Livraison Express
        </label>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full md:w-auto"
        disabled={isBtnDisabled}
      >
        {loading ? "Chargement..." : "Rechercher"}
      </Button>

      {/* Résultats */}
      {result && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Résultats</h3>
          <pre className="p-4 bg-muted text-sm rounded-md overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
