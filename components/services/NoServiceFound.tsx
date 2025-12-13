"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { roboto } from "@/lib/fonts";
import { Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { isEmptyString } from "@/utils/function";
import {
  addNewService,
  NewServiceType,
  updateLogo,
  UpdateLogoType,
} from "@/actions/services";
import { uploadLogo } from "@/actions/services/logo";

const NoServiceFound = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    if (isEmptyString(name)) {
      toast.error("Veuillez entrer un nom de service");
      return;
    }

    setLoading(true);

    try {
      // 🔧 Validation et création du service
      const formData: NewServiceType = {
        name,
        description,
      };

      const result = await addNewService(formData);

      if (result.error || !result.companyId) {
        throw new Error(result.message || "Impossible de créer le service");
      }

      let finalMessage = "Service créé avec succès 🎉";

      // 🖼️ Upload du logo si présent
      if (logo) {
        const uploadUrl = await uploadLogo(logo);

        if (!uploadUrl) {
          throw new Error(
            "Impossible de charger l'image. Veuillez réessayer plus tard."
          );
        }

        const updateData: UpdateLogoType = {
          id: result.companyId,
          logo: uploadUrl,
        };

        const updateResult = await updateLogo(updateData);

        if (updateResult.error) {
          throw new Error(updateResult.message);
        }

        finalMessage = "Compagnie ajoutée avec succès 🎉";
      }

      toast.success(finalMessage);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue, veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/10 px-4">
      <Card className="w-full max-w-md p-6 shadow-sm border border-muted/30 rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className={`${roboto.className} text-xl font-semibold`}>
            Créez votre service de livraison{" "}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Aucun service n’est associé à votre compte. Remplissez les
            informations ci-dessous pour en créer un.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Upload Logo */}
          <div className="flex justify-center">
            <label
              htmlFor="logo"
              className="relative group cursor-pointer flex items-center justify-center w-24 h-24 
              rounded-full border border-dashed border-muted-foreground/40 
              hover:border-primary/70 transition-all overflow-hidden"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Logo preview"
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div
                  className="flex flex-col items-center justify-center text-muted-foreground/60 
                group-hover:text-primary transition-colors"
                >
                  <Upload className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Logo</span>
                </div>
              )}
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Nom */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Nom du service <strong className="text-destructive">*</strong>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Kin Express"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Ex: Rapide, fiable et professionnel..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pt-4">
          <Button variant="outline" disabled={loading}>
            Retour
          </Button>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création...
              </>
            ) : (
              "Créer"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoServiceFound;
