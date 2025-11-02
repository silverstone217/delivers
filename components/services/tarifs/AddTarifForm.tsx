"use client";

import React, { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Ruler,
  Weight,
  MoveRight,
  MoveLeft,
  DollarSign,
} from "lucide-react";
import SelectedZone from "./SelectedZone";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Zone } from "@prisma/client";
import { isGreaterThan } from "@/utils/function";
import { Switch } from "@/components/ui/switch";
import { FaShippingFast } from "react-icons/fa";
import { addTarif } from "@/actions/tarifs";

type AddTarifFormProps = {
  companyId: string;
  zones: Zone[];
};

export default function AddTarifForm({ companyId, zones }: AddTarifFormProps) {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [price, setPrice] = useState("");
  const [express, setExpress] = useState(false);

  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [minWidth, setMinWidth] = useState("");
  const [maxWidth, setMaxWidth] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isDisabled = useMemo(() => {
    return loading || !sender || !receiver || !price || Number(price) <= 0;
  }, [loading, sender, receiver, price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // LENGTH
      if (isGreaterThan(minLength, maxLength)) {
        toast.error(
          "Le partie gauche de la longueur doit tojours etre inferieure"
        );
      }

      // Weigth
      if (isGreaterThan(minWeight, maxWeight)) {
        toast.error("Le partie gauche du poids doit tojours etre inferieure");
      }

      //  WIDTH
      if (isGreaterThan(minWidth, maxWidth)) {
        toast.error(
          "Le partie gauche de la width doit tojours etre inferieure"
        );
      }

      const formData = {
        minWeight: Number(minWeight),
        maxWeight: Number(maxWeight),
        minLength: Number(minLength),
        maxLength: Number(maxLength),
        minWidth: Number(minWidth),
        maxWidth: Number(maxWidth),
        sender,
        receiver,
        companyId,
        express,
        price: Number(price),
      };

      // TODO: appeler ta server action ici
      const result = await addTarif(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      setMaxLength("");
      setMinLength("");

      setMinWeight("");
      setMaxWeight("");

      setMinWidth("");
      setMaxWidth("");

      setPrice("");

      setReceiver("");
      setSender("");

      toast.success("Tarif ajouté avec succès !");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du tarif.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-muted/30 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <DollarSign className="w-5 h-5 text-primary" />
          Nouveau tarif de livraison
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6 md:gap-8 w-full">
          {/* Zones expéditeur / destinataire */}
          <div className="grid md:grid-cols-2 gap-4 w-full">
            {/* Expéditeur */}
            <div className="grid gap-2">
              <Label
                htmlFor="sender"
                className="font-medium flex items-center gap-1"
              >
                <MoveRight className="w-4 h-4 text-primary" />
                Zone expéditeur
              </Label>
              <SelectedZone
                disabled={loading}
                onChange={setSender}
                value={sender}
                placeholder="Choisir la zone expéditrice"
                zones={zones}
              />
            </div>

            {/* Destinataire */}
            <div className="grid gap-2">
              <Label
                htmlFor="receiver"
                className="font-medium flex items-center gap-1"
              >
                <MoveLeft className="w-4 h-4 text-primary" />
                Zone destinataire
              </Label>
              <SelectedZone
                disabled={loading}
                onChange={setReceiver}
                value={receiver}
                placeholder="Choisir la zone destinataire"
                zones={zones}
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid md:grid-cols-3 gap-6 w-full">
            {/* Longueur */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-1">
                <Ruler className="w-4 h-4 text-primary" />
                Longueur (cm)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={minLength}
                  onChange={(e) => setMinLength(e.target.value)}
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={maxLength}
                  onChange={(e) => setMaxLength(e.target.value)}
                />
              </div>
            </div>

            {/* Largeur */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-1">
                <Ruler className="w-4 h-4 text-primary rotate-90" />
                Largeur (cm)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={minWidth}
                  onChange={(e) => setMinWidth(e.target.value)}
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(e.target.value)}
                />
              </div>
            </div>

            {/* Poids */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-1">
                <Weight className="w-4 h-4 text-primary" />
                Poids (kg)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={minWeight}
                  onChange={(e) => setMinWeight(e.target.value)}
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Prix */}
          <div className="grid gap-2">
            <Label htmlFor="price" className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-primary" />
              Prix (Franc congolais)
            </Label>
            <Input
              type="number"
              id="price"
              placeholder="Ex : 3000"
              min={0}
              max={1000000000}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="w-full flex items-center justify-between gap-2">
            <Label htmlFor="express" className="flex items-center gap-1">
              <FaShippingFast className="w-4 h-4 text-primary" />
              Express livraion
            </Label>
            <Switch
              checked={express}
              onCheckedChange={setExpress}
              id="express"
              name="express"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-2 gap-4 w-full flex-wrap">
            {/* RETOUR */}
            <Button
              type="button"
              disabled={loading}
              variant={"outline"}
              className="md:min-w-40 shrink-0 grow md:grow-0"
              onClick={() => router.back()}
            >
              Retour
            </Button>

            {/* SAVE */}
            <Button
              type="submit"
              disabled={isDisabled}
              className="md:min-w-40 shrink-0 grow md:grow-0"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
