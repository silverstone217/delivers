"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getUser() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  // Récupérer l'utilisateur complet depuis la base
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    omit: { password: true },
  });

  return user;
}
