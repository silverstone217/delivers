import { z } from "zod";

export const AddCompanySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(60, "Le nom ne doit pas dépasser 60 caractères.")
    .transform((val) => val.toLowerCase().trim()),

  description: z
    .string()
    .max(1500, "La description ne doit pas dépasser 1500 caractères.")
    .optional()
    .nullable(),
});

export const UpdateCompanySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(60, "Le nom ne doit pas dépasser 60 caractères.")
    .transform((val) => val.toLowerCase().trim()),

  description: z
    .string()
    .max(1500, "La description ne doit pas dépasser 1500 caractères.")
    .optional()
    .nullable(),
  id: z.string(),
});

export const UpdateLogoCompanySchema = z.object({
  id: z.string(),
  logo: z.url(),
});
