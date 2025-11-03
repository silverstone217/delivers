"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Pencil, Loader2, Ruler, Scale, DollarSign } from "lucide-react";
import { FaShippingFast } from "react-icons/fa";
import { updateTarif } from "@/actions/tarifs";
import { Tarif } from "@prisma/client";

type EditTarifButtonProps = {
  tarif: Tarif;
};

export const EditTarifButton = ({ tarif }: EditTarifButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // États du formulaire
  const [minLength, setMinLength] = useState(tarif.minLength.toString());
  const [maxLength, setMaxLength] = useState(tarif.maxLength.toString());
  const [minWidth, setMinWidth] = useState(tarif.minWidth.toString());
  const [maxWidth, setMaxWidth] = useState(tarif.maxWidth.toString());
  const [minWeight, setMinWeight] = useState(tarif.minWeight.toString());
  const [maxWeight, setMaxWeight] = useState(tarif.maxWeight.toString());
  const [price, setPrice] = useState(tarif.price.toString());
  const [express, setExpress] = useState(tarif.express);

  const ReformNames = tarif.name
    .split("_")
    .map((z) => `Zone ${z.toUpperCase()}`);

  async function handleUpdate() {
    setLoading(true);
    try {
      const formData = {
        id: tarif.id,
        companyId: tarif.companyId,
        minLength: Number(minLength),
        maxLength: Number(maxLength),
        minWidth: Number(minWidth),
        maxWidth: Number(maxWidth),
        minWeight: Number(minWeight),
        maxWeight: Number(maxWeight),
        price: Number(price),
        express,
      };

      const result = await updateTarif(formData); // Appelle ton action serveur
      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success("Tarif mis à jour avec succès ✅");
      router.refresh();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour du tarif");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary hover:bg-primary 
          hover:text-white flex items-center gap-1"
        >
          <Pencil className="w-4 h-4" /> Modifier
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Modifier le tarif</AlertDialogTitle>
          <AlertDialogDescription>
            Zones concernées : <strong>{ReformNames[0]}</strong> →{" "}
            <strong>{ReformNames[1]}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Formulaire de modification */}
        <div className="grid gap-4 py-4">
          {/* Longueur */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-1">
              <Ruler className="w-4 h-4 text-primary" /> Longueur (cm)
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                value={minLength}
                onChange={(e) => setMinLength(e.target.value)}
                placeholder="Min"
              />
              <span className="text-muted-foreground">–</span>
              <Input
                type="number"
                min={0}
                value={maxLength}
                onChange={(e) => setMaxLength(e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>

          {/* Largeur */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-1">
              <Ruler className="w-4 h-4 text-primary rotate-90" /> Largeur (cm)
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                value={minWidth}
                onChange={(e) => setMinWidth(e.target.value)}
                placeholder="Min"
              />
              <span className="text-muted-foreground">–</span>
              <Input
                type="number"
                min={0}
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>

          {/* Poids */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-1">
              <Scale className="w-4 h-4 text-primary" /> Poids (kg)
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                value={minWeight}
                onChange={(e) => setMinWeight(e.target.value)}
                placeholder="Min"
              />
              <span className="text-muted-foreground">–</span>
              <Input
                type="number"
                min={0}
                value={maxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>

          {/* Prix */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-primary" /> Prix (FC)
            </Label>
            <Input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 5000"
            />
          </div>

          {/* Express */}
          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="express" className="flex items-center gap-1">
              <FaShippingFast className="w-4 h-4 text-primary" />
              Livraison express
            </Label>
            <Switch
              checked={express}
              onCheckedChange={setExpress}
              id="express"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
