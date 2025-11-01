"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ChevronDown, ChevronUp, MapPin, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export type CommuneData = {
  name: string;
  quartiers: string[];
};

export type CommuneQuartierSelection = {
  commune: string;
  quartiers: string[];
};

type Props = {
  data: CommuneData[];
  initialSelection?: CommuneQuartierSelection[];
  onChange: (value: CommuneQuartierSelection[]) => void;
};

export default function SelectCommuneQuartiers({
  data,
  initialSelection = [],
  onChange,
}: Props) {
  const [selected, setSelected] = useState<CommuneQuartierSelection[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Sync initial selection
  useEffect(() => {
    if (initialSelection && initialSelection.length > 0) {
      setSelected(initialSelection);
      onChange(initialSelection);
    }
  }, [initialSelection, onChange]);

  const filteredCommunes = data.filter((commune) =>
    commune.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCommuneClick = (communeName: string) => {
    setExpanded(expanded === communeName ? null : communeName);
  };

  const toggleQuartier = (commune: string, quartier: string) => {
    setSelected((prev) => {
      const existing = prev.find((c) => c.commune === commune);

      if (!existing) return [...prev, { commune, quartiers: [quartier] }];

      const isAlready = existing.quartiers.includes(quartier);
      const updatedQuartiers = isAlready
        ? existing.quartiers.filter((q) => q !== quartier)
        : [...existing.quartiers, quartier];

      return prev.map((c) =>
        c.commune === commune ? { ...c, quartiers: updatedQuartiers } : c
      );
    });
  };

  // 🔹 Synchroniser l'état local avec le parent
  React.useEffect(() => {
    onChange(selected);
  }, [onChange, selected]);

  const removeCommune = (commune: string) => {
    setSelected((prev) => prev.filter((c) => c.commune !== commune));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Label htmlFor="communes">Communes et quartiers</Label>

      {/* SEARCH */}
      <Input
        placeholder="Rechercher une commune..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        id="communes"
        name="communes"
      />

      {/* LISTE DES COMMUNES */}
      <ScrollArea className="max-h-[300px] border rounded-md p-2 overflow-y-auto">
        {filteredCommunes.map((commune) => {
          const isExpanded = expanded === commune.name;
          const selectedQuartiers =
            selected.find((c) => c.commune === commune.name)?.quartiers || [];

          return (
            <div key={commune.name} className="mb-2">
              <div
                onClick={() => handleCommuneClick(commune.name)}
                className={cn(
                  "flex justify-between items-center p-2 cursor-pointer rounded-md transition-colors",
                  isExpanded ? "bg-primary/10" : "hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-primary" />
                  {commune.name}
                </div>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Quartiers */}
              {isExpanded && (
                <div className="pl-6 mt-2 space-y-1">
                  {commune.quartiers.map((quartier) => (
                    <label
                      key={quartier}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={selectedQuartiers.includes(quartier)}
                        onCheckedChange={() =>
                          toggleQuartier(commune.name, quartier)
                        }
                      />
                      {quartier}
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </ScrollArea>

      {/* LISTE DES CHOIX */}
      {selected.length > 0 && (
        <Card className="mt-4 border border-muted/40 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <h4 className="text-sm font-semibold">Communes sélectionnées</h4>
            <div className="space-y-3">
              {selected.map((c) => (
                <div
                  key={c.commune}
                  className="border rounded-md p-2 bg-secondary/10"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{c.commune}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => removeCommune(c.commune)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.quartiers.map((q) => (
                      <div
                        key={q}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {q}
                        <button
                          type="button"
                          onClick={() => toggleQuartier(c.commune, q)}
                          className="hover:text-destructive transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {c.quartiers.length === 0 && (
                      <p className="text-xs text-muted-foreground italic">
                        Aucun quartier sélectionné
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
