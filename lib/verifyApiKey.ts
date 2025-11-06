import { prisma } from "@/lib/prisma";

export async function verifyApiKey(req: Request) {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey) {
    return { error: "API Key missing", user: null };
  }

  const user = await prisma.user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return { error: "Invalid API Key", user: null };
  }

  return { error: null, user };
}
