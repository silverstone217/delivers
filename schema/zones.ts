import { z } from "zod";

/**
 * Un item { commune, quartiers[] }
 */
const CommuneQuartierItem = z.object({
  commune: z
    .string()
    .trim()
    .min(1, "Le nom de la commune est requis.")
    .max(100, "Nom de commune trop long."),

  quartiers: z
    .array(z.string().trim().min(1, "Nom de quartier invalide"))
    .min(1, "Au moins un quartier doit être sélectionné pour cette commune"),
});

/**
 * Schéma principal pour la création / mise à jour d'une Zone
 */
export const ZoneCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom de la zone doit contenir au moins 2 caractères.")
    .max(60, "Le nom de la zone ne doit pas dépasser 60 caractères.")
    .transform((s) => s.toLowerCase()),

  // accepte cuid ou uuid (si tu veux être plus souple)
  companyId: z.string(),

  // selection : tableau d'objets { commune, quartiers[] }
  selection: z
    .array(CommuneQuartierItem)
    .min(1, "Au moins une commune doit être sélectionnée pour la zone"),
});

/** TypeScript type inféré */
export type ZoneCreateType = z.infer<typeof ZoneCreateSchema>;

// MODIFIER ID
export const ZoneModifySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom de la zone doit contenir au moins 2 caractères.")
    .max(60, "Le nom de la zone ne doit pas dépasser 60 caractères.")
    .transform((s) => s.toLowerCase()),

  // accepte cuid ou uuid (si tu veux être plus souple)
  companyId: z.string(),
  zoneId: z.string(),

  // selection : tableau d'objets { commune, quartiers[] }
  selection: z
    .array(CommuneQuartierItem)
    .min(1, "Au moins une commune doit être sélectionnée pour la zone"),
});

/** TypeScript type inféré */
export type ZoneModifyType = z.infer<typeof ZoneCreateSchema>;
