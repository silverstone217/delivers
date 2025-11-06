"use server";
import { prisma } from "@/lib/prisma";
import { getUser } from "./authAction";

// MODIFY USER
export const updateUserRole = async (
  userId: string,
  role: "USER" | "ADMIN" | "SUPER_ADMIN"
) => {
  try {
    const currentUser = await getUser();

    if (!currentUser) {
      return { error: true, message: "Non authentifié." };
    }

    // Définition de la hiérarchie des rôles
    const rolePower: Record<string, number> = {
      USER: 1,
      ADMIN: 2,
      SUPER_ADMIN: 3,
    };

    const currentUserPower = rolePower[currentUser.role];

    // Vérification si l'utilisateur cible existe
    const targetUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!targetUser) {
      return { error: true, message: "Utilisateur introuvable." };
    }

    const targetUserPower = rolePower[targetUser.role];

    // Empêche un utilisateur de modifier quelqu'un avec un rôle égal ou supérieur, sauf si SUPER_ADMIN
    if (
      targetUserPower >= currentUserPower &&
      currentUser.role !== "SUPER_ADMIN"
    ) {
      return {
        error: true,
        message: "Vous n'avez pas l'autorisation de modifier cet utilisateur.",
      };
    }

    // Met à jour le rôle
    await prisma.user.update({
      where: { id: targetUser.id },
      data: { role },
    });

    return { error: false, message: "Rôle modifié avec succès ✅" };
  } catch (error) {
    console.log(error);
    return { error: true, message: "Erreur interne. Réessayez." };
  }
};

// DELETE USER
export const deleteUserById = async (userId: string) => {
  try {
    const currentUser = await getUser();

    if (!currentUser) {
      return { error: true, message: "Non authentifié." };
    }

    // Définition de la hiérarchie des rôles
    const rolePower: Record<string, number> = {
      USER: 1,
      ADMIN: 2,
      SUPER_ADMIN: 3,
    };

    const currentUserPower = rolePower[currentUser.role];

    // Vérification si l'utilisateur cible existe
    const targetUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!targetUser) {
      return { error: true, message: "Utilisateur introuvable." };
    }

    const targetUserPower = rolePower[targetUser.role];

    // Vérifie si le currentUser a le droit de supprimer le targetUser
    if (
      targetUserPower >= currentUserPower &&
      currentUser.role !== "SUPER_ADMIN"
    ) {
      return {
        error: true,
        message: "Vous n'avez pas l'autorisation de supprimer cet utilisateur.",
      };
    }

    // Supprime l'utilisateur
    await prisma.user.delete({ where: { id: targetUser.id } });

    return { error: false, message: "Utilisateur supprimé avec succès ✅" };
  } catch (error) {
    console.log(error);
    return { error: true, message: "Erreur interne. Réessayez." };
  }
};
