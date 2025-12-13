import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPricingSchema } from "@/schema/getPricing";
import { verifyApiKey } from "@/lib/verifyApiKey";

// Récupère origins autorisés depuis .env (optionnel) ou '*' pour dev
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "*").split(",");

// Helper pour construire headers CORS
function corsHeaders(originHeader: string | null = null) {
  const origin = originHeader ?? "";
  const allowed =
    ALLOWED_ORIGINS.includes("*") || ALLOWED_ORIGINS.includes(origin)
      ? ALLOWED_ORIGINS.includes("*")
        ? "*"
        : origin
      : "null";

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Max-Age": "86400",
  };
}

const findZoneIdsByLocation = async (
  communeName: string,
  quartierName: string
) => {
  const communes = await prisma.commune.findMany({
    where: {
      name: { equals: communeName.trim(), mode: "insensitive" },
      quartiers: {
        some: { name: { equals: quartierName.trim(), mode: "insensitive" } },
      },
    },
    select: { zoneId: true },
  });
  return communes.map((c) => c.zoneId);
};

// Gérer la préflight
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const body = await req.json();

    // Vérifie API Key (ta fonction)
    const { error: apiError } = await verifyApiKey(req);
    if (apiError) {
      return NextResponse.json({ error: apiError }, { status: 401, headers });
    }

    const parsed = getPricingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid format", details: parsed.error.issues },
        { status: 400, headers }
      );
    }

    const { origin: originLoc, destination, parcel, express } = parsed.data;
    // maintenant parcel est obligatoire (selon ton schema modifié), on peut destructurer
    const { weight, length, width } = parcel;

    // Récupérer zone ids (case-insensitive)
    const senderZoneIds = await findZoneIdsByLocation(
      originLoc.commune,
      originLoc.quartier
    );
    const receiverZoneIds = await findZoneIdsByLocation(
      destination.commune,
      destination.quartier
    );

    if (!senderZoneIds.length || !receiverZoneIds.length) {
      return NextResponse.json(
        { error: "Zone not supported" },
        { status: 404, headers }
      );
    }

    const tarifs = await prisma.tarif.findMany({
      where: {
        senderId: { in: senderZoneIds },
        receiverId: { in: receiverZoneIds },
        ...(express !== undefined && { express }),
        minWeight: { lte: weight },
        maxWeight: { gte: weight },
        minLength: { lte: length },
        maxLength: { gte: length },
        minWidth: { lte: width },
        maxWidth: { gte: width },
      },
      include: { company: { include: { contact: true } } },
      orderBy: [{ price: "asc" }],
    });

    if (!tarifs.length) {
      return NextResponse.json(
        { error: "No pricing available" },
        { status: 404, headers }
      );
    }

    const result = tarifs.map((t) => ({
      tarifId: t.id,
      name: t.name,
      price: t.price,
      express: t.express,
      company: {
        id: t.company.id,
        name: t.company.name,
        logo: t.company.logo,
        contact: t.company.contact,
      },
      senderZoneId: t.senderId,
      receiverZoneId: t.receiverId,
      estimatedDelivery: t.express ? "Express" : "Standard",
    }));

    return NextResponse.json(result, { status: 200, headers });
  } catch (error) {
    console.error("Error in get-pricing:", error);
    return NextResponse.json(
      { error: "Server error, please retry" },
      { status: 500, headers }
    );
  }
}
