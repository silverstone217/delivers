"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin } from "lucide-react";
import { roboto } from "@/lib/fonts";
import { Commune, Zone } from "@prisma/client";

type ZoneCardProps = {
  name: string;
  communes: string[];
  onEdit: () => void;
  onDelete: () => void;
};

type zoneWithCommunes = Zone & {
  communes: Commune[];
};

type GroupeZoneCardProps = {
  zones: zoneWithCommunes[];
  companyId: string;
};

export const GroupZoneCard = ({ zones, companyId }: GroupeZoneCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {zones.map((zone) => (
        <ZoneCard
          key={zone.id}
          name={zone.name}
          communes={zone.communes.map((c) => c.name)}
          onEdit={() => console.log("Edit", zone.id)}
          onDelete={() => console.log("Delete", zone.id)}
        />
      ))}
    </div>
  );
};

export const ZoneCard = ({
  name,
  communes,
  onEdit,
  onDelete,
}: ZoneCardProps) => {
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
                <MapPin className="w-4 h-4 text-primary" /> {commune}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">
              Aucune commune assignée
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-2">
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-1" /> Modifier
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-1" /> Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
};
