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

// Je suppose que vous avez défini GetTarifsByParamsProps quelque part
type GetTarifsByParamsProps = {
  communeArrivee: string;
  communeDepart: string;
  express: boolean;
  length: string; // Viennent de l'URL, à convertir en Number
  quartierArrivee: string;
  quartierDepart: string;
  weight: string; // Viennent de l'URL, à convertir en Number
  width: string; // Viennent de l'URL, à convertir en Number
};

// TROUVER LE QUARTIER ET LA COMMUNE
const findZoneIdsByLocation = async (
  communeName: string,
  quartierName: string
): Promise<string[]> => {
  const communes = await prisma.commune.findMany({
    where: {
      name: communeName,
      quartiers: {
        some: {
          name: quartierName,
        },
      },
    },
    select: {
      zoneId: true,
    },
  });
  return communes.map((c) => c.zoneId);
};
// -----------------------------------------------------------------

// get Tarifs By Params (Complétée)
export const getTarifsByParams = async ({
  communeArrivee,
  communeDepart,
  express,
  length,
  quartierArrivee,
  quartierDepart,
  weight,
  width,
}: GetTarifsByParamsProps) => {
  try {
    // 1. Conversion des valeurs en nombres
    const numLength = parseFloat(length);
    const numWeight = parseFloat(weight);
    const numWidth = parseFloat(width);
    const isExpress = express; // déjà un booléen

    // Vérification rapide des nombres
    if (
      isNaN(numLength) ||
      isNaN(numWeight) ||
      isNaN(numWidth) ||
      numLength <= 0 ||
      numWeight <= 0 ||
      numWidth <= 0
    ) {
      return {
        error: true,
        message: "Dimensions ou poids invalides.",
        data: [],
      };
    }

    // 2. Identification des IDs de Zone pour le départ et l'arrivée
    const senderZoneIds = await findZoneIdsByLocation(
      communeDepart,
      quartierDepart
    );
    const receiverZoneIds = await findZoneIdsByLocation(
      communeArrivee,
      quartierArrivee
    );

    if (senderZoneIds.length === 0 || receiverZoneIds.length === 0) {
      // Aucune zone ne couvre les adresses données
      return {
        error: false,
        message: "Aucune zone de couverture trouvée.",
        data: [],
      };
    }

    // 3. Construction des Filtres Prisma
    const tarifs = await prisma.tarif.findMany({
      where: {
        senderZone: {
          id: { in: senderZoneIds },
        },
        receiverZone: {
          id: { in: receiverZoneIds },
        },

        ...(isExpress && { express: true }),

        AND: [
          // Longueur
          { minLength: { lte: numLength } },
          { maxLength: { gte: numLength } },

          // Largeur
          { minWidth: { lte: numWidth } },
          { maxWidth: { gte: numWidth } },

          // Poids
          { minWeight: { lte: numWeight } },
          { maxWeight: { gte: numWeight } },
        ],
      },

      // 4. Inclure les données de la DeliveryCompany
      include: {
        company: {
          include: {
            contact: true,
          },
        },
      },

      // 5. Ordre (Optionnel: par prix ou express)
      orderBy: [
        { price: "asc" }, // Le moins cher en premier
        { express: "desc" }, // Express avant Standard à prix égal
      ],
    });

    // 6. Formatage des données pour le client
    const formattedData = tarifs.map((t) => ({
      // Retourne les infos de la compagnie
      companyId: t.company.id,
      companyName: t.company.name,
      companyLogo: t.company.logo,

      // Retourne les infos du tarif trouvé
      tarifId: t.id,
      price: t.price,
      express: t.express,

      // contacts
      contacts: t.company.contact,
    }));

    return {
      error: false,
      data: formattedData,
      message: "Tarifs récupérés avec succès.",
    };
  } catch (error) {
    console.error("Erreur getTarifsByParams:", error);
    return {
      error: true,
      message:
        "Oops! Une erreur s'est produite lors de la recherche des tarifs.",
      data: [],
    };
  }
};
