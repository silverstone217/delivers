"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Upload } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ADMIN_ROLES } from "@/utils/admin";
import { roboto } from "@/lib/fonts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  addNewService,
  NewServiceType,
  updateLogo,
  UpdateLogoType,
} from "@/actions/services";
import { uploadLogo } from "@/actions/services/logo";
import { isEmptyString } from "@/utils/function";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddServiceForm = () => {
  const user = useCurrentUser();

  //   STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   HANDLE IMAGE UPLOAD
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Vérifier le type (png, jpg, jpeg, webp)
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "Veuillez sélectionner une image au format PNG, JPEG ou WEBP."
      );
      return;
    }

    // ✅ Vérifier la taille (<= 1MB)
    const maxSize = 1 * 1024 * 1024; // 1MB exact
    if (file.size > maxSize) {
      toast.error("L'image doit faire moins de 1MB.");
      return;
    }

    // ✅ Tout est bon → on met à jour
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  //   CREATE NEW COMPANY

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
      setLogo(null);
      setName("");
      setDescription("");
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

  //   CHECK USER AND ROLE
  if (!user || !ADMIN_ROLES.includes(user.role)) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={loading}>
        <Button>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création...
            </>
          ) : (
            <>
              {" "}
              <PlusCircle className="shrink-0 mr-2" /> Ajouter une companie
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={`${roboto.className} text-2xl font-semibold`}
          >
            Nouveau service de livraion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Remplisser les champs ci-dessous afin {`d'ajouter`} un tarif de
            livraion(destinataire et destination)
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-5">
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
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCreate}
            disabled={loading || isEmptyString(name)}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création...
              </>
            ) : (
              "Ajouter"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddServiceForm;
