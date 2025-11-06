import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPricingSchema } from "@/schema/getPricing";
import { verifyApiKey } from "@/lib/verifyApiKey";

// Helper pour récupérer les IDs de Zone depuis quartier + commune
const findZoneIdsByLocation = async (
  communeName: string,
  quartierName: string
): Promise<string[]> => {
  const communes = await prisma.commune.findMany({
    where: {
      name: communeName,
      quartiers: {
        some: { name: quartierName },
      },
    },
    select: {
      zoneId: true,
    },
  });
  return communes.map((c) => c.zoneId);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Vérification de l'API Key
    const { error: apiError } = await verifyApiKey(req);
    if (apiError)
      return NextResponse.json({ error: apiError }, { status: 401 });

    const parsed = getPricingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid format", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { origin, destination, parcel } = parsed.data;

    // Si parcel est undefined ou une dimension manquante, on met 0
    const weight = parcel?.weight ?? 0;
    const length = parcel?.length ?? 0;
    const width = parcel?.width ?? 0;

    // 1️⃣ Récupérer les Zone IDs
    const senderZoneIds = await findZoneIdsByLocation(
      origin.commune,
      origin.quartier
    );
    const receiverZoneIds = await findZoneIdsByLocation(
      destination.commune,
      destination.quartier
    );

    if (!senderZoneIds.length || !receiverZoneIds.length) {
      return NextResponse.json(
        { error: "Zone not supported" },
        { status: 404 }
      );
    }

    // 2️⃣ Récupérer les tarifs correspondants
    const tarifs = await prisma.tarif.findMany({
      where: {
        senderId: { in: senderZoneIds },
        receiverId: { in: receiverZoneIds },
        minWeight: { lte: weight },
        maxWeight: { gte: weight },
        minLength: { lte: length },
        maxLength: { gte: length },
        minWidth: { lte: width },
        maxWidth: { gte: width },
      },
      include: {
        company: { include: { contact: true } },
      },
      orderBy: [{ price: "asc" }, { express: "desc" }],
    });

    if (!tarifs.length) {
      return NextResponse.json(
        { error: "No pricing available" },
        { status: 404 }
      );
    }

    // 3️⃣ Formater le résultat
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

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in get-pricing:", error);
    return NextResponse.json(
      { error: "Server error, please retry" },
      { status: 500 }
    );
  }
}
