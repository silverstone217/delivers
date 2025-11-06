import { z } from "zod";

export const getPricingSchema = z.object({
  origin: z.object({
    commune: z.string().min(2),
    quartier: z.string().min(2),
  }),
  destination: z.object({
    commune: z.string().min(2),
    quartier: z.string().min(2),
  }),
  parcel: z
    .object({
      weight: z.number().positive().optional(),
      length: z.number().positive().optional(),
      width: z.number().positive().optional(),
    })
    .optional(),
});
