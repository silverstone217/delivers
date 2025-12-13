"use client";
import { isEmptyString } from "@/utils/function";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import SelectCommuneQuartiers from "./SelectCommuneQuartiers";
import { communesQuartiers } from "@/utils/zones";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { createZone } from "@/actions/zones";

type AddZoneProps = {
  companyId: string;
  className?: string;
};

export type CommuneQuartierSelection = {
  commune: string;
  quartiers: string[];
};

const AddForm = ({ companyId }: AddZoneProps) => {
  const [name, setName] = useState("");
  //   const [communes, setCommunes] = useState("");
  //   const [quartiers, setQuartiers] = useState([]);
  const [selection, setSelection] = useState<CommuneQuartierSelection[]>([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isButtonDisable = useMemo(() => {
    if (loading) return true;

    if (isEmptyString(name) || selection.length < 1) return true;

    return false;
  }, [loading, name, selection.length]);

  const handleAddZone = async () => {
    setLoading(true);
    try {
      const formData = {
        name,
        selection,
        companyId,
      };

      const result = await createZone(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setSelection([]);
      setName("");

      router.refresh();

      setTimeout(() => router.back(), 500);
    } catch (error) {
      console.log(error);
      toast.error("Impossible d'ajouter une zone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddZone();
      }}
      className="w-full grid gap-4"
    >
      {/* ZONE */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="zone">Nom de la zone</Label>
        <Input
          placeholder="ex:A"
          autoCapitalize="words"
          autoCorrect="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={1}
          maxLength={60}
          disabled={loading}
        />
      </div>

      {/* COMMUNES */}
      <div className="w-full">
        <SelectCommuneQuartiers
          data={communesQuartiers}
          onChange={setSelection}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center flex-wrap justify-end gap-4 mt-4">
        <Button
          type="button"
          variant={"outline"}
          disabled={loading}
          onClick={() => router.back()}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={isButtonDisable}>
          {loading && <Loader className="animate-spin shrink-0" />} Ajouter
        </Button>
      </div>
    </form>
  );
};

export default AddForm;
