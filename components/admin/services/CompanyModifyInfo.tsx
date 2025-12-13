"use client";
import {
  updateLogo,
  updateService,
  UpdateServiceType,
} from "@/actions/services";
import { deleteImage, uploadLogo } from "@/actions/services/logo";
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
import { Textarea } from "@/components/ui/textarea";
import { NO_IMAGE_URL } from "@/lib/env";
import { roboto } from "@/lib/fonts";
import { DeliveryCompany } from "@/lib/generated/prisma/client";
import {
  capitaliseFirstLetter,
  formatJoinedDate,
  isEmptyString,
} from "@/utils/function";
import { Label } from "@radix-ui/react-label";
import { Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  company: DeliveryCompany;
};

const CompanyModifyInfo = ({ company }: Props) => {
  const [name, setName] = useState(company.name ?? "");
  const [description, setDescription] = useState(company.description ?? "");
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(company.logo);
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🔹 Clique sur le cercle → choisir une nouvelle image
  const handleCircleClick = () => {
    if (!uploading && !loading) fileInputRef.current?.click();
  };

  // 🔹 Fichier choisi → afficher preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Upload vers Vercel Blob et mise à jour en base
  const handleUploadLogo = async () => {
    if (!logo) {
      toast.error("Veuillez d'abord choisir une image.");
      return;
    }

    try {
      setUploading(true);

      //   if logo exist
      const notLogoExist = NO_IMAGE_URL === company.logo;

      if (!notLogoExist && company.logo) {
        await deleteImage(company.logo);
      }

      const blobUrl = await uploadLogo(logo);

      if (!blobUrl) {
        throw new Error("Impossible de téléverser l'image.");
      }

      const result = await updateLogo({
        id: company.id,
        logo: blobUrl,
      });

      if (result.error) {
        throw new Error(result.message);
      }

      toast.success("Logo mis à jour avec succès 🎉");
      setLogo(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue pendant le téléversement !");
    } finally {
      setUploading(false);
    }
  };

  const handleModify = async () => {
    setLoading(true);
    try {
      const formData: UpdateServiceType = {
        name: name.trim(),
        description: description.trim(),
        id: company.id,
      };

      const result = await updateService(formData);

      if (result.error) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("impossible de modifier");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (loading) return true;
    if (isEmptyString(name)) return true;
    if (
      name.trim() === company.name.trim() &&
      description === company.description
    ) {
      return true;
    }
    return false;
  }, [company.description, company.name, description, loading, name]);

  return (
    <Card className="w-full lg:p-6 p-4 shadow-sm border border-muted/30 rounded-2xl">
      {/* HEADER */}
      <CardHeader className="text-center space-y-1">
        <CardTitle
          className={`${roboto.className} text-xl font-semibold text-foreground`}
        >
          Espace {capitaliseFirstLetter(company.name)}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          A rejoint le {formatJoinedDate(company.createdAt)}
        </CardDescription>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-5 mt-4">
        {/* LOGO SECTION */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div
            onClick={handleCircleClick}
            className="relative w-28 h-28 rounded-full overflow-hidden border border-dashed 
              border-muted-foreground/40 hover:border-primary/70 transition-all cursor-pointer group"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Logo preview"
                fill
                className="object-cover rounded-full transition-transform group-hover:scale-105"
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center h-full w-full 
                text-muted-foreground/60 group-hover:text-primary transition-colors"
              >
                <Upload className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">Ajouter un logo</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading || uploading}
            />
          </div>

          {/* bouton uploader */}
          {logo && (
            <Button
              onClick={handleUploadLogo}
              size="sm"
              variant="secondary"
              disabled={uploading}
              className="text-xs mt-1 cursor-pointer"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Téléversement...
                </>
              ) : (
                "Modifier le logo"
              )}
            </Button>
          )}
        </div>

        {/* NAME */}
        <div className="grid gap-2">
          <Label htmlFor="name">
            Nom du service <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Ex: Kin Express"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            disabled={loading}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Ex: Rapide, fiable et professionnel..."
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1500}
            disabled={loading}
          />
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex justify-end gap-3 pt-4">
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => router.back()}
        >
          Retour
        </Button>
        <Button onClick={handleModify} disabled={isButtonDisabled}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              En cours...
            </>
          ) : (
            "Modifier"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyModifyInfo;
