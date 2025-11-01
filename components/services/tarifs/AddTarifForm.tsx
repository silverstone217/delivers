"use client";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SelectedZone from "./SelectedZone";
import { Zone } from "@prisma/client";
import { Input } from "@/components/ui/input";

type AddTarifFormProps = {
  companyId: string;
  zones: Zone[];
};

const AddTarifForm = ({ companyId, zones }: AddTarifFormProps) => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [price, setPrice] = useState("");

  const [minLength, setMinLength] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <form className="w-full grid gap-4">
      {/* Destiantions */}
      <div className="grid w-full md:grid-cols-2 md:gap-4 gap-2">
        {/* SENDER */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="sender">Expediteur zone</Label>
          <SelectedZone
            disabled={loading}
            onChange={setSender}
            value={sender}
            placeholder="Choix de la zone de l'expediteur"
            zones={zones}
          />
        </div>

        {/* RECEIVER */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="receiver">Expeditaire zone</Label>
          <SelectedZone
            disabled={loading}
            onChange={setReceiver}
            value={receiver}
            placeholder="Choix de la zone de l'expeditaire"
            zones={zones}
          />
        </div>
      </div>

      {/* INTERVALS */}

      {/* LENGTH */}

      {/* WIDTH */}

      {/* PRICE */}
      <div className="w-full grid gap-1.5">
        <Label htmlFor="price">Prix (cout) en Franc C.</Label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="ex: 3000"
          min={0}
          max={10000000000}
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </form>
  );
};

export default AddTarifForm;
