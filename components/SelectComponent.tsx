"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectComponentCommuneProps {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  data: string[];
  disabled: boolean;
  placeholder: string;
  setReliedValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectComponentCommune = ({
  data,
  disabled,
  onValueChange,
  value,
  className,
  placeholder,
  setReliedValue,
}: SelectComponentCommuneProps) => {
  return (
    <Select
      value={value}
      disabled={disabled}
      onValueChange={(e) => {
        onValueChange(e);
        setReliedValue("");
      }}
    >
      <SelectTrigger className={`${className} w-full`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item, idx) => {
          return (
            <SelectItem value={item} key={idx}>
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

interface SelectComponentQuartierProps {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  data: Record<string, string[]>; // mêmes données
  selectedCommune: string; // 👈 commune choisie
  disabled?: boolean;
  placeholder: string;
}

export const SelectComponentQuartier = ({
  data,
  selectedCommune,
  disabled,
  onValueChange,
  placeholder,
  value,
  className,
}: SelectComponentQuartierProps) => {
  const quartiers = data[selectedCommune] ?? [];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={`${className} w-full`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {quartiers.map((quartier) => (
          <SelectItem value={quartier} key={quartier}>
            {quartier}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
