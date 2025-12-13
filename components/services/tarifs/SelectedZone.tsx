"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zone } from "@/lib/generated/prisma/client";

interface SelectedZoneProps {
  zones: Zone[];
  disabled: boolean;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const SelectedZone = ({
  disabled,
  zones,
  placeholder,
  onChange,
  value,
}: SelectedZoneProps) => {
  return (
    <Select onValueChange={(e) => onChange(e)} value={value}>
      <SelectTrigger className="w-full" disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full">
        {zones.map((z) => {
          return (
            <SelectItem key={z.id} value={z.id} className="w-full">
              Zone {z.name.toUpperCase()}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectedZone;
