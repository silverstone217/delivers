"use client";

import { deleteTarif } from "@/actions/tarifs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tarif } from "@prisma/client";
import { Ruler, Box, DollarSign, Trash2, Loader, Scale } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  tarifs: Tarif[];
};

export const TarifCards = ({ tarifs }: Props) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tarifs.map((tarif) => (
        <TarifCard tarif={tarif} key={tarif.id} />
      ))}
    </div>
  );
};

type CardProps = {
  tarif: Tarif;
};

export const TarifCard = ({ tarif }: CardProps) => {
  const {
    name,
    maxLength,
    minLength,
    minWeight,
    price,
    maxWidth,
    maxWeight,
    minWidth,
    id,
    companyId,
  } = tarif;

  const ReformNames = name.split("_").map((z) => `Zone ${z.toUpperCase()}`);

  return (
    <Card
      className="w-full max-w-sm border border-gray-200 shadow-md 
    hover:shadow-lg transition-shadow duration-300 rounded-2xl"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          {ReformNames[0]} → {ReformNames[1]}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Tarif détaillé pour cette zone
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Dimensions */}
        <div className="flex items-center gap-2 text-gray-700">
          <Ruler className="w-5 h-5 text-primary" />
          <span>
            Longueur: {minLength}cm - {maxLength}cm
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Box className="w-5 h-5 text-primary" />
          <span>
            Largeur: {minWidth}cm - {maxWidth}cm
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Scale className="w-5 h-5 text-primary" />
          Poids: {minWeight}kg - {maxWeight}kg
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign className="w-5 h-5 text-primary" />
          <span>Prix: {price} fc</span>
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-end ">
        <DeleteTarifButton companyId={companyId} id={id} />
      </CardFooter>
    </Card>
  );
};

export const DeleteTarifButton = ({
  id,
  companyId,
}: {
  id: string;
  companyId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDeleteTarif() {
    setLoading(true);
    try {
      const formData = { companyId, tarifId: id };
      const result = await deleteTarif(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success("Tarif supprimé avec succès");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Impossible de supprimer cette relation intra-zone");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={loading}>
          {loading ? (
            <Loader className="shrink-0 animate-spin" />
          ) : (
            <Trash2 className="shrink-0" />
          )}{" "}
          Supprimer
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer ce tarif ? Cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteTarif}
            className="bg-destructive text-white hover:bg-destructive/90"
            disabled={loading}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
