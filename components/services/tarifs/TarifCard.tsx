"use client";
import { Tarif } from "@prisma/client";
import React from "react";

type Props = {
  tarifs: Tarif[];
};

export const TarifCards = ({ tarifs }: Props) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tarifs.map((tarif) => {
        return <TarifCard tarif={tarif} key={tarif.id} />;
      })}
    </div>
  );
};

type CardProps = {
  tarif: Tarif;
};

export const TarifCard = ({ tarif }: CardProps) => {
  return <div>Tarif Card: {tarif.id} </div>;
};
