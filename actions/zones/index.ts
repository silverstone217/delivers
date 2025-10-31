"use server";

import { prisma } from "@/lib/prisma";
import {
  ZoneCreateSchema,
  ZoneCreateType,
  ZoneModifySchema,
  ZoneModifyType,
} from "@/schema/zones";
import { getUser } from "../authAction";

// ✅ GET ZONES
export const getZones = async (companyId: string) => {
  const zones = await prisma.zone.findMany({
    where: { companyId },
    include: {
      communes: {
        include: {
          quartiers: {
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return zones ?? [];
};

// ✅ CREATE ZONE
export const createZone = async (data: ZoneCreateType) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié, veuillez vous connecter pour continuer.",
      };
    }

    // ✅ Validation stricte avec zod
    const result = ZoneCreateSchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg || "Erreur de validation des données. Vérifiez vos champs.",
      };
    }

    const { companyId, name, selection } = result.data;

    // ✅ Vérifier la compagnie
    const isCompanyExist = await prisma.deliveryCompany.findFirst({
      where: { id: companyId, ownerId: user.id },
    });

    if (!isCompanyExist) {
      return {
        error: true,
        message: "Ce service n'existe pas ou ne vous appartient pas.",
      };
    }

    // ✅ Vérifier la zone existante
    const isZoneExist = await prisma.zone.findFirst({
      where: { companyId, name },
    });

    if (isZoneExist) {
      return {
        error: true,
        message: "Cette zone existe déjà. Le nom de la zone doit être unique.",
      };
    }

    // ✅ Créer la zone
    const zone = await prisma.zone.create({
      data: {
        name,
        companyId,
      },
    });

    // ✅ Créer les communes et leurs quartiers
    for (const com of selection) {
      await prisma.commune.create({
        data: {
          name: com.commune,
          zoneId: zone.id,
          quartiers: {
            createMany: {
              data: com.quartiers.map((q) => ({ name: q })),
            },
          },
        },
      });
    }

    return {
      success: true,
      message: `Zone "${name.toUpperCase()}" créée avec succès.`,
      // zoneId: zone.id,
    };
  } catch (error) {
    console.error("Erreur createZone:", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la création de la zone. Veuillez réessayer.",
    };
  }
};

// export EDIT ZONE BY ID
export const editZone = async (data: ZoneModifyType) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié, veuillez vous connecter pour continuer.",
      };
    }

    // ✅ Validation stricte avec Zod
    const result = ZoneModifySchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg || "Erreur de validation des données. Vérifiez vos champs.",
      };
    }

    const { companyId, name, selection, zoneId } = result.data;

    // ✅ Vérifier la compagnie
    const company = await prisma.deliveryCompany.findFirst({
      where: { id: companyId, ownerId: user.id },
    });

    if (!company) {
      return {
        error: true,
        message: "Ce service n'existe pas ou ne vous appartient pas.",
      };
    }

    // ✅ Vérifier la zone existante
    const zone = await prisma.zone.findFirst({
      where: { id: zoneId, companyId },
      include: { communes: { include: { quartiers: true } } },
    });

    if (!zone) {
      return {
        error: true,
        message: "La zone à modifier n'existe pas.",
      };
    }

    // ✅ Vérifier que le nom n'est pas déjà utilisé par une autre zone
    const duplicate = await prisma.zone.findFirst({
      where: { name, companyId, NOT: { id: zoneId } },
    });
    if (duplicate) {
      return {
        error: true,
        message: "Cette zone existe déjà. Le nom doit être unique.",
      };
    }

    // ✅ Mettre à jour le nom de la zone
    await prisma.zone.update({
      where: { id: zoneId },
      data: { name },
    });

    // ✅ Supprimer les anciennes communes et leurs quartiers
    await prisma.commune.deleteMany({
      where: { zoneId },
    });

    // ✅ Créer les nouvelles communes et quartiers
    for (const com of selection) {
      await prisma.commune.create({
        data: {
          name: com.commune,
          zoneId,
          quartiers: {
            createMany: {
              data: com.quartiers.map((q) => ({ name: q })),
            },
          },
        },
      });
    }

    return {
      error: false,
      message: "Zone modifiée avec succès.",
    };
  } catch (error) {
    console.error("Erreur editZone:", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la modification de la zone. Veuillez réessayer.",
    };
  }
};

// DELETE ZONE
export const deleteZoneById = async ({
  companyId,
  zoneId,
}: {
  zoneId: string;
  companyId: string;
}) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié, veuillez vous connecter pour continuer.",
      };
    }

    const isZoneExist = await prisma.deliveryCompany.findFirst({
      where: { id: companyId, ownerId: user.id },
    });

    if (!isZoneExist) {
      return {
        error: true,
        message: "Impossible de trouver le service lie a cette zone",
      };
    }

    await prisma.zone.delete({
      where: { id: zoneId },
    });

    return {
      error: false,
      message: "Supprime avec success",
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la suppression de la zone. Veuillez réessayer.",
    };
  }
};
