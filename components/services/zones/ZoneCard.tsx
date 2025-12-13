"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, MapPin } from "lucide-react";
import { roboto } from "@/lib/fonts";
import { Commune, Quartier, Zone } from "@/lib/generated/prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteZoneById } from "@/actions/zones";
import EditZone from "./EditZone";

type ZoneCardProps = {
  name: string;
  communes: CommuneWIthQuartiers[];
  onEdit: () => void;
  onDelete: () => void;
  zone: zoneWithCommunes;
};

type CommuneWIthQuartiers = Commune & {
  quartiers: Quartier[];
};

type zoneWithCommunes = Zone & {
  communes: CommuneWIthQuartiers[];
};

type GroupeZoneCardProps = {
  zones: zoneWithCommunes[];
  companyId: string;
};

// GROUP CARDS
export const GroupZoneCard = ({ zones }: GroupeZoneCardProps) => {
  const [, setLoading] = useState(false);
  const router = useRouter();

  // onDELETE
  const onDelete = async ({
    companyId,
    zoneId,
  }: {
    zoneId: string;
    companyId: string;
  }) => {
    setLoading(true);
    try {
      const result = await deleteZoneById({ zoneId, companyId });

      if (result.error) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Impossible suprrimer cette zone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {zones.map((zone) => (
        <ZoneCard
          key={zone.id}
          name={zone.name}
          communes={zone.communes}
          onEdit={() => console.log("Edit", zone.id)}
          zone={zone}
          onDelete={() =>
            onDelete({ zoneId: zone.id, companyId: zone.companyId })
          }
        />
      ))}
    </div>
  );
};

// CARD
export const ZoneCard = ({ name, communes, onDelete, zone }: ZoneCardProps) => {
  // on EDIT

  return (
    <Card className="flex flex-col justify-between border border-muted/30 shadow-sm rounded-2xl p-4 hover:shadow-lg transition-shadow">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`${roboto.className} text-lg font-semibold`}>
            Zone {name.toUpperCase()}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          {communes.length > 0 ? (
            communes.map((commune, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-muted-foreground gap-2"
              >
                <MapPin className="w-4 h-4 text-primary" /> {commune.name}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">
              Aucune commune assignée
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-2 flex-wrap">
        {/* EDIT */}
        <EditZone
          companyId={zone.companyId}
          initialName={zone.name}
          zoneId={zone.id}
          initialSelection={zone.communes.map((c) => ({
            commune: c.name,
            quartiers: c.quartiers.map((q) => q.name),
          }))}
        />
        {/* SUPPRIMER */}
        <DeleteCardItem onDelete={onDelete} name={name} className="grow" />
      </CardFooter>
    </Card>
  );
};

// DELETE COMPONENT
export const DeleteCardItem = ({
  onDelete,
  className,
  name,
}: {
  onDelete: () => void;
  className?: string;
  name: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" className={className}>
          <Trash2 className="w-4 h-4 mr-1" /> Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Voulez-vous vraiment supprimer la zone {name.toUpperCase()}?
          </DialogTitle>
          <DialogDescription>
            Cette action est irreversible, donc reflechissez avant de vouloir
            supprimer cette zone.
          </DialogDescription>
        </DialogHeader>

        {/* ACTIONS */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Annuler</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant={"destructive"} onClick={onDelete}>
              Supprimer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
