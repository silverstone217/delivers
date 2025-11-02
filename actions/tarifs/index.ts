"use server";

import { prisma } from "@/lib/prisma";
import { TarifSchema, TarifType } from "@/schema/tarifs";
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

    // ✅ Validation stricte avec Zod
    const result = TarifSchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg || "Erreur de validation des données. Vérifiez vos champs.",
      };
    }

    // ✅ Données validées et typées
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

    // ✅ Vérifier que les zones existent
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

    // ✅ Récupération de tous les tarifs existants entre ces zones
    const existingTarifs = await prisma.tarif.findMany({
      where: {
        senderId: senderZone.id,
        receiverId: receiverZone.id,
        companyId: company.id,
      },
    });

    // ✅ Vérification stricte de chevauchement
    const overlap = existingTarifs.some((t) => {
      // 🔹 Teste le chevauchement de chaque dimension séparément
      const overlapLength = !(
        maxLength < t.minLength || minLength > t.maxLength
      );
      const overlapWidth = !(maxWidth < t.minWidth || minWidth > t.maxWidth);
      const overlapWeight = !(
        maxWeight < t.minWeight || minWeight > t.maxWeight
      );

      // 🔹 Si les trois se chevauchent en même temps → refus
      return overlapLength && overlapWidth && overlapWeight;
    });

    if (overlap) {
      return {
        error: true,
        message: `Impossible d'ajouter ce tarif. 
        Un tarif existant entre ${senderZone.name.toUpperCase()} → ${receiverZone.name.toUpperCase()} 
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
