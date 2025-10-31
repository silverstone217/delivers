"use server";

import { prisma } from "@/lib/prisma";
import { ZoneCreateSchema, ZoneCreateType } from "@/schema/zones";
import { getUser } from "../authAction";

// ✅ GET ZONES
export const getZones = async (companyId: string) => {
  const zones = await prisma.zone.findMany({
    where: { companyId },
    include: {
      communes: {
        include: { quartiers: true },
      },
    },
    orderBy: { createdAt: "desc" },
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
