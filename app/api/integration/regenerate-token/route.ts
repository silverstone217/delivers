import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/authAction";
import { generateApiKey } from "@/utils/function";

export async function POST() {
  const user = await getUser();
  if (!user) {
    return Response.json(
      { error: true, message: "Non authentifié" },
      { status: 401 }
    );
  }

  const newKey = generateApiKey();

  await prisma.user.update({
    where: { id: user.id },
    data: { apiKey: newKey },
  });

  return Response.json({ token: newKey });
}
