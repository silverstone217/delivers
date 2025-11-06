import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/authAction";
import { generateApiKey } from "@/utils/function";

export async function GET() {
  const user = await getUser();
  if (!user) {
    return Response.json(
      { error: true, message: "Non authentifié" },
      { status: 401 }
    );
  }

  const account = await prisma.user.findUnique({
    where: { id: user.id },
    select: { apiKey: true },
  });

  if (!account?.apiKey) {
    const newKey = generateApiKey();
    await prisma.user.update({
      where: { id: user.id },
      data: { apiKey: newKey },
    });
    return Response.json({ token: newKey });
  }

  return Response.json({ token: account.apiKey });
}
