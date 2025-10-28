"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "../authAction";

// GET DeliveryCompany
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

// ADD new service
