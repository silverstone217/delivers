import { getUser } from "@/actions/authAction";
import { prisma } from "@/lib/prisma";
import { generateApiKey } from "@/utils/function";

export async function GET() {
  try {
    // 1. Vérification de l'authentification
    const user = await getUser();
    if (!user) {
      return Response.json(
        { error: true, message: "Non authentifié" },
        { status: 401 }
      );
    }

    // 2. Recherche de la clé existante
    const account = await prisma.user.findUnique({
      where: { id: user.id },
      select: { apiKey: true },
    });

    // 3. Génération et mise à jour si la clé est manquante
    if (!account?.apiKey) {
      const newKey = generateApiKey();

      // La mise à jour doit être protégée contre les erreurs DB
      await prisma.user.update({
        where: { id: user.id },
        data: { apiKey: newKey },
      });

      return Response.json({ token: newKey });
    }

    // 4. Retour de la clé existante
    return Response.json({ token: account.apiKey });
  } catch (error) {
    // 5. Gestion des erreurs inattendues (erreurs DB, etc.)
    console.error(
      "Erreur lors de la récupération ou génération de l'API Key:",
      error
    );

    // Retour d'une erreur 500 (Internal Server Error)
    return Response.json(
      {
        error: true,
        message: "Une erreur interne est survenue lors du traitement.",
      },
      { status: 500 }
    );
  }
}
