"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "../authAction";
import { ContactsSchema, ContactsSchemaType } from "@/schema/contacts";

// ---------
// get contact by company ID
// ---------
export const getContactCompanyId = async (companyId: string) => {
  try {
    const user = await getUser();

    if (!user) return null;

    const company = await prisma.deliveryCompany.findFirst({
      where: { id: companyId, ownerId: user.id },
      include: {
        contact: true,
      },
    });

    if (!company) return null;

    return company.contact ?? null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

// ---------
// update contact by company ID
// ---------
export const updateContacts = async (
  data: ContactsSchemaType & { companyId: string }
) => {
  try {
    const user = await getUser();

    // 🔐 Vérification de l'authentification
    if (!user) {
      return {
        error: true,
        message: "Non autorisé, veuillez vous connecter pour continuer.",
      };
    }

    // 🔍 Vérification de la société
    const isCompanyExist = await prisma.deliveryCompany.findFirst({
      where: { id: data.companyId, ownerId: user.id },
    });

    if (!isCompanyExist) {
      return {
        error: true,
        message: "Service introuvable ou non autorisé.",
      };
    }

    // ✅ Validation stricte avec Zod
    const { companyId, ...rest } = data;
    const result = ContactsSchema.safeParse(rest);

    if (!result.success) {
      const errMsg = result.error.issues.map((e) => e.message).join(", ");
      return {
        error: true,
        message:
          errMsg ||
          "Erreur de validation des données. Vérifiez vos champs et réessayez.",
      };
    }

    const validatedData = result.data;

    // 🧠 Vérifie si un contact existe déjà
    const existingContact = await prisma.contact.findUnique({
      where: { deliveryCompanyId: companyId },
    });

    if (existingContact) {
      // 🔁 Update
      await prisma.contact.update({
        where: { deliveryCompanyId: companyId },
        data: validatedData,
      });
    } else {
      // 🆕 Create
      await prisma.contact.create({
        data: { ...validatedData, deliveryCompanyId: companyId },
      });
    }

    return {
      error: false,
      message: "Contacts mis à jour avec succès ✅",
    };
  } catch (error) {
    console.error("❌ Erreur updateContacts:", error);
    return {
      error: true,
      message: "Une erreur interne est survenue. Veuillez réessayer plus tard.",
    };
  }
};
