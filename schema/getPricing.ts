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
  parcel: z.object({
    weight: z.number().positive(),
    length: z.number().positive(),
    width: z.number().positive(),
  }),
  express: z.boolean(),
});
