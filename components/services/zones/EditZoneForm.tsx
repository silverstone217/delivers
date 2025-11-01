"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import SelectCommuneQuartiers from "./SelectCommuneQuartiers";
import { editZone } from "@/actions/zones"; // à créer côté actions
import { CommuneQuartierSelection } from "./AddForm"; // réutiliser le type
import { communesQuartiers } from "@/utils/zones";

type EditZoneFormProps = {
  zoneId: string;
  companyId: string;
  initialName: string;
  initialSelection: CommuneQuartierSelection[];
  onClose?: () => void; // pour fermer le modal
};

export default function EditZoneForm({
  zoneId,
  companyId,
  initialName,
  initialSelection,
  onClose,
}: EditZoneFormProps) {
  const [name, setName] = useState(initialName);
  const [selection, setSelection] =
    useState<CommuneQuartierSelection[]>(initialSelection);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isButtonDisabled = useMemo(() => {
    if (loading) return true;
    if (!name.trim() || selection.length === 0) return true;
    return false;
  }, [loading, name, selection]);

  const handleEditZone = async () => {
    setLoading(true);
    try {
      const formData = { zoneId, companyId, name, selection };
      const result = await editZone(formData); // mutation côté serveur

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
      if (onClose) onClose(); // ferme le modal après la réussite
    } catch (error) {
      console.error(error);
      toast.error("Impossible de modifier la zone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditZone();
      }}
      className="w-full grid gap-4 p-4"
    >
      {/* Nom de la zone */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="zoneName">Nom de la zone</Label>
        <Input
          id="zoneName"
          placeholder="Ex: A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={1}
          maxLength={60}
        />
      </div>

      {/* Sélection communes + quartiers */}
      <div className="w-full">
        <SelectCommuneQuartiers
          data={communesQuartiers}
          onChange={setSelection}
          initialSelection={initialSelection}
        />
      </div>

      {/* Boutons */}
      <div className="flex items-center justify-end gap-4 flex-wrap mt-4">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => onClose?.()}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={isButtonDisabled}>
          {loading && <Loader className="animate-spin mr-2" size={16} />}
          Modifier
        </Button>
      </div>
    </form>
  );
}
