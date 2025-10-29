"use server";

import { put, del } from "@vercel/blob";

// UPLOAD TO VERCEL
export const uploadLogo = async (file: File | null): Promise<string> => {
  if (!file) return "";

  try {
    // Le nom du fichier sur Vercel Blob
    const fileName = `logos/${Date.now()}-${file.name}`;

    // Upload vers Vercel Blob
    const { url } = await put(fileName, file, {
      access: "public", // le logo doit être accessible publiquement
      addRandomSuffix: false, // garde un nom propre et traçable
    });

    return url; // ✅ lien public du fichier (à stocker dans Prisma)
  } catch (error) {
    console.error("Erreur lors de l’upload du logo :", error);
    return ""; // en cas d’erreur, on renvoie une chaîne vide
  }
};

// DELETE FROM VERCEL
export const deleteImage = async (file: string) => {
  if (!file) return;
  try {
    await del(file);
  } catch (error) {
    console.error("Erreur lors de l’upload du logo :", error);
    throw new Error("Impossible de remplacer l'image");
  }
};
