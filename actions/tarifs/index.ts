"use server";

import { prisma } from "@/lib/prisma";

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
