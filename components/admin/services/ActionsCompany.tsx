"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";
import { roboto } from "@/lib/fonts";
import { useState } from "react";
import { deleteCompanyById } from "@/actions/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeliveryCompany } from "@/lib/generated/prisma/client";

type Props = {
  company: DeliveryCompany;
};

const ActionsCompany = ({ company }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteCompanyById(company.id);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/admin/services");

      console.log("DELETE COMPANY:", company.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full p-4 lg:p-6 shadow-sm border border-muted/30 rounded-2xl md:col-span-2 lg:col-span-1">
      {/* HEADER */}
      <CardHeader className="text-center space-y-1">
        <CardTitle
          className={`${roboto.className} text-xl font-semibold text-foreground`}
        >
          Actions principales
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Ces actions affectent tout votre service.
        </CardDescription>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-6 mt-4">
        <div className="space-y-3 border border-destructive/30 bg-destructive/5 p-4 rounded-lg">
          <h4 className="font-medium text-destructive">Zone dangereuse</h4>
          <p className="text-sm text-muted-foreground">
            Supprimer votre service est irréversible. Toutes les données
            (tarifs, zones, contacts) seront supprimées.
          </p>

          {/* DELETE BUTTON + DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer le service
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Supprimer le service ?</DialogTitle>
                <DialogDescription>
                  Cette action est définitive. Êtes-vous sûr de vouloir
                  supprimer{" "}
                  <span className="font-semibold">{company.name}</span> ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex justify-end gap-2">
                <DialogTrigger asChild>
                  <Button variant="outline">Annuler</Button>
                </DialogTrigger>

                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Suppression..." : "Oui, supprimer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionsCompany;
