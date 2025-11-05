"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "../authAction";
import z from "zod";
import {
  AddCompanySchema,
  UpdateCompanySchema,
  UpdateLogoCompanySchema,
} from "@/schema/companies";
import { NO_IMAGE_URL } from "@/lib/env";
import { PERMIT_ROLES } from "@/utils/service";
import { ADMIN_ROLES } from "@/utils/admin";

// --------------------
// GET Delivery Company
// --------------------
export const getDeliveryCompany = async () => {
  const user = await getUser();

  if (!user) return [];

  const companies = await prisma.deliveryCompany.findMany({
    where: {
      ownerId: user.id,
    },
  });

  return companies ?? [];
};

// --------------------
// TYPES
// --------------------
export type NewServiceType = z.infer<typeof AddCompanySchema>;
export type UpdateLogoType = z.infer<typeof UpdateLogoCompanySchema>;

// --------------------
// ADD NEW SERVICE
// --------------------
export const addNewService = async (data: NewServiceType) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié, veuillez vous connecter pour continuer.",
        companyId: null,
      };
    }

    // check roles &&
    // and can user create many service ?
    const hasAlreadyCreated = await prisma.deliveryCompany.findMany({
      where: { ownerId: user.id },
    });

    if (hasAlreadyCreated.length > 0 && !PERMIT_ROLES.includes(user.role)) {
      return {
        error: true,
        message: "Acces refuse, vous posseder deja un service.",
        companyId: null,
      };
    }

    // ✅ Validation stricte avec zod
    const result = AddCompanySchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg || "Erreur de validation des données. Vérifiez vos champs.",
        companyId: null,
      };
    }

    const { name, description } = result.data;
    const logo = NO_IMAGE_URL;

    // ✅ Création dans Prisma
    const newService = await prisma.deliveryCompany.create({
      data: {
        name,
        description: description ?? undefined,
        ownerId: user.id,
        logo,
      },
      select: { id: true },
    });

    return {
      error: false,
      message: "Compagnie créée avec succès ✅",
      companyId: newService.id,
    };
  } catch (error) {
    console.error("[addNewService]", error);
    return {
      error: true,
      message: "Oops ! Une erreur est survenue, veuillez réessayer.",
      companyId: null,
    };
  }
};

// --------------------
// UPDATE LOGO COMPANY
// --------------------
export const updateLogo = async (data: UpdateLogoType) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié, veuillez vous connecter pour continuer.",
      };
    }

    // ✅ Validation stricte
    const result = UpdateLogoCompanySchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg || "Erreur de validation des données. Vérifiez vos champs.",
      };
    }

    const { id, logo } = result.data;

    // ✅ Vérifie que la compagnie appartient bien à l'utilisateur
    const company = await prisma.deliveryCompany.findFirst({
      where: { id, ownerId: user.id },
      select: { id: true },
    });

    if (!company) {
      return {
        error: true,
        message: "Ce service ne vous appartient pas ou a été supprimé.",
      };
    }

    // ✅ Mise à jour du logo
    await prisma.deliveryCompany.update({
      where: { id: company.id },
      data: { logo },
    });

    return {
      error: false,
      message: "Logo mis à jour avec succès 🎉",
    };
  } catch (error) {
    console.error("[updateLogo]", error);
    return {
      error: true,
      message: "Oops ! Une erreur est survenue, veuillez réessayer.",
    };
  }
};

// --------------------
// UPDATE  COMPANY
// --------------------
export type UpdateServiceType = z.infer<typeof UpdateCompanySchema>;
export const updateService = async (data: UpdateServiceType) => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Non authentifié, veuillez vous connecter pour continuer.",
      };
    }

    // ✅ Validation stricte avec zod
    const result = UpdateCompanySchema.safeParse(data);
    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg || "Erreur de validation des données. Vérifiez vos champs.",
        companyId: null,
      };
    }

    const { name, description, id } = result.data;

    const isCompanyExist = await prisma.deliveryCompany.findFirst({
      where: { id, ownerId: user.id },
    });

    if (!isCompanyExist) {
      return {
        error: true,
        message: "Ce service n'est plus disponible",
      };
    }

    await prisma.deliveryCompany.update({
      where: { id: isCompanyExist.id },
      data: {
        name,
        description: description ? description : undefined,
      },
    });

    return {
      error: false,
      message: "Modifié avec success",
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Oops ! Une erreur est survenue, veuillez réessayer.",
    };
  }
};

// --------------------
// GET ADMINS  COMPANIES
// --------------------
export const getAdminsCompanies = async () => {
  try {
    const user = await getUser();

    if (!user || !ADMIN_ROLES.includes(user.role)) {
      return {
        data: [],
        message: "NON-AUTHORISE",
        error: true,
      };
    }

    const companies = await prisma.deliveryCompany.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        contact: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formatedData = companies.map((com) => {
      return {
        companyId: com.id,
        companyName: com.name,
        companyLogo: com.logo,
        companyDescription: com.description,
        createdAt: com.createdAt,
        contacts: com.contact,
      };
    });

    return {
      data: formatedData ?? [],
      message: "Success",
      error: false,
    };
  } catch (error) {
    console.log(error);

    return {
      data: [],
      message: "Impossible d'acceder aux donnees",
      error: true,
    };
  }
};

// --------------------
// GET ADMINS  COMPANy BY ID
// --------------------

export const getAdminsCompanyById = async (id: string) => {
  try {
    const user = await getUser();

    if (!user || !ADMIN_ROLES.includes(user.role)) {
      return {
        data: null,
        message: "NON-AUTHORISE",
        error: true,
      };
    }

    const company = await prisma.deliveryCompany.findUnique({
      where: {
        ownerId: user.id,
        id,
      },
      include: { contact: true, tarifs: true, zones: true },
    });

    return {
      data: company ?? null,
      message: "Success",
      error: false,
    };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      message: "Impossible d'acceder aux donnees",
      error: true,
    };
  }
};
