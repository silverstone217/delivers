"use server";

import { prisma } from "@/lib/prisma";
import {
  TarifSchema,
  TarifType,
  TarifUpdateSchema,
  TarifUpdateType,
} from "@/schema/tarifs";
import { getUser } from "../authAction";
import { capitaliseFirstLetter } from "@/utils/function";

// GET TARIFS BY COMPANY_ID
export const getTarifsById = async (companyId: string) => {
  try {
    const tarifs = await prisma.tarif.findMany({
      where: {
        companyId,
      },
      // Optionnel : Inclure les zones pour un contexte plus riche
      include: {
        senderZone: true,
        receiverZone: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, tarifs };
  } catch (error) {
    console.error("Erreur getTarifsById:", error);
    return {
      success: false,
      message: "Impossible de récupérer les tarifs.",
      tarifs: [],
    };
  }
};

// ADD TARIF
export const addTarif = async (data: TarifType) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié. Veuillez vous connecter pour continuer.",
      };
    }

    // ✅ Validation stricte
    const result = TarifSchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg || "Erreur de validation des données. Vérifiez vos champs.",
      };
    }

    const {
      companyId,
      maxLength,
      maxWeight,
      maxWidth,
      minLength,
      minWeight,
      minWidth,
      receiver,
      sender,
      price,
      express,
    } = result.data;

    // ✅ Vérification propriétaire
    const company = await prisma.deliveryCompany.findFirst({
      where: { id: companyId, ownerId: user.id },
    });

    if (!company) {
      return {
        error: true,
        message: "Cette compagnie n'existe pas ou ne vous appartient pas.",
      };
    }

    // ✅ Vérifie les zones
    const [senderZone, receiverZone] = await Promise.all([
      prisma.zone.findUnique({ where: { id: sender } }),
      prisma.zone.findUnique({ where: { id: receiver } }),
    ]);

    if (!senderZone || !receiverZone) {
      return {
        error: true,
        message: "Zone expéditrice ou destinataire introuvable.",
      };
    }

    // ✅ Récupération des tarifs existants (même compagnie)
    const existingTarifs = await prisma.tarif.findMany({
      where: {
        companyId: company.id,
        senderId: senderZone.id,
        receiverId: receiverZone.id,
      },
    });

    // ✅ Vérification stricte de chevauchement
    const overlap = existingTarifs.some((t) => {
      // 1️⃣ Teste le chevauchement de chaque dimension séparément
      const lengthOverlap = !(
        maxLength < t.minLength || minLength > t.maxLength
      );
      const widthOverlap = !(maxWidth < t.minWidth || minWidth > t.maxWidth);
      const weightOverlap = !(
        maxWeight < t.minWeight || minWeight > t.maxWeight
      );

      // 2️⃣ Si les trois se chevauchent → vérifier le type express
      if (lengthOverlap && widthOverlap && weightOverlap) {
        // Même express → CONFLIT
        if (t.express === express) {
          return true;
        }
      }
      return false;
    });

    if (overlap) {
      return {
        error: true,
        message: `Impossible d'ajouter ce tarif : 
        un tarif entre ${senderZone.name.toUpperCase()} → ${receiverZone.name.toUpperCase()} 
        avec le même type (${express ? "express" : "standard"}) 
        possède déjà des intervalles (poids, longueur et largeur) qui se chevauchent entièrement.`,
      };
    }

    // ✅ Génération du nom
    const name = `${capitaliseFirstLetter(
      senderZone.name
    )}_${capitaliseFirstLetter(receiverZone.name)}`;

    // ✅ Création du tarif
    await prisma.tarif.create({
      data: {
        companyId,
        name,
        price,
        express,
        minLength,
        maxLength,
        minWidth,
        maxWidth,
        minWeight,
        maxWeight,
        senderId: senderZone.id,
        receiverId: receiverZone.id,
      },
    });

    return {
      error: false,
      message: "Votre tarif a été ajouté avec succès ✅",
    };
  } catch (error) {
    console.error("Erreur addTarif:", error);
    return {
      error: true,
      message: "Une erreur est survenue lors de l'ajout du tarif.",
    };
  }
};

// UPDATE TARIF
export async function updateTarif(data: TarifUpdateType) {
  try {
    const user = await getUser();
    if (!user) {
      return { error: true, message: "Non authentifié." };
    }

    // ✅ Validation stricte avec Zod
    const result = TarifUpdateSchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message: errMsg || "Erreur de validation des données.",
      };
    }

    const {
      id,
      companyId,
      minLength,
      maxLength,
      minWidth,
      maxWidth,
      minWeight,
      maxWeight,
      price,
      express,
    } = result.data;

    // ✅ Vérifie que le tarif existe et appartient à l'utilisateur
    const tarif = await prisma.tarif.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!tarif || tarif.company.ownerId !== user.id) {
      return {
        error: true,
        message: "Tarif introuvable ou non autorisé.",
      };
    }

    // ✅ Vérifie la cohérence des intervalles
    if (minLength > maxLength || minWidth > maxWidth || minWeight > maxWeight) {
      return {
        error: true,
        message:
          "Les valeurs minimales doivent être inférieures aux valeurs maximales.",
      };
    }

    // ✅ Récupère tous les tarifs similaires (même compagnie, mêmes zones)
    const existingTarifs = await prisma.tarif.findMany({
      where: {
        companyId,
        senderId: tarif.senderId,
        receiverId: tarif.receiverId,
        NOT: { id }, // exclure le tarif en cours de mise à jour
      },
    });

    // ✅ Vérifie le chevauchement complet sur les 3 dimensions
    const overlap = existingTarifs.some((t) => {
      // Teste les intervalles
      const overlapLength = !(
        maxLength < t.minLength || minLength > t.maxLength
      );
      const overlapWidth = !(maxWidth < t.minWidth || minWidth > t.maxWidth);
      const overlapWeight = !(
        maxWeight < t.minWeight || minWeight > t.maxWeight
      );

      // Si les 3 se chevauchent et que express est identique → conflit
      return (
        overlapLength && overlapWidth && overlapWeight && t.express === express
      );
    });

    if (overlap) {
      return {
        error: true,
        message:
          "Impossible de modifier ce tarif : un autre tarif existant possède déjà des intervalles identiques ou se chevauchant avec le même mode (express ou standard).",
      };
    }

    // ✅ Mise à jour finale
    await prisma.tarif.update({
      where: { id },
      data: {
        minLength,
        maxLength,
        minWidth,
        maxWidth,
        minWeight,
        maxWeight,
        price,
        express,
      },
    });

    return { error: false, message: "Tarif mis à jour avec succès ✅" };
  } catch (error) {
    console.error("Erreur updateTarif:", error);
    return {
      error: true,
      message: "Erreur lors de la mise à jour du tarif.",
    };
  }
}

// DELETE TARIF
export const deleteTarif = async ({
  companyId,
  tarifId,
}: {
  companyId: string;
  tarifId: string;
}) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié. Veuillez vous connecter pour continuer.",
      };
    }

    // ✅ Vérification que la compagnie appartient bien à l'utilisateur
    const company = await prisma.deliveryCompany.findFirst({
      where: { id: companyId, ownerId: user.id },
    });

    if (!company) {
      return {
        error: true,
        message: "Cette compagnie n'existe pas ou ne vous appartient pas.",
      };
    }

    await prisma.tarif.delete({
      where: {
        id: tarifId,
      },
    });

    return {
      error: false,
      message: "Ce tarif a ete supprime avec success",
    };
  } catch (error) {
    console.error("Erreur addTarif:", error);
    return {
      error: true,
      message: "Une erreur est survenue lors de la suppression de la relation",
    };
  }
};
