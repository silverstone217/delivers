import { z } from "zod";

/**
 * Préprocesse les champs optionnels pour convertir
 * les chaînes vides en undefined (pratique pour les formulaires HTML).
 */
const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

/**
 * Schéma Zod pour les contacts
 */
export const ContactsSchema = z.object({
  email: z
    .email("Veuillez fournir une adresse email valide")
    .min(3, "L'email est trop court")
    .max(254, "L'email est trop long"),
  phone: z
    .string()
    .trim()
    .min(9, "Le numéro est trop court")
    .max(10, "Le numéro est trop long")
    .refine(
      (val) => /^\+?[0-9\s\-\(\).]{7,20}$/.test(val),
      "Numéro de téléphone invalide (chiffres, +, espaces, -, (), . autorisés)"
    ),

  address: z
    .string()
    .trim()
    .min(3, "L'adresse est trop courte")
    .max(300, "L'adresse est trop longue"),

  // champs optionnels — on convertit "" en undefined puis on valide si présent
  facebook: z.preprocess(
    emptyToUndefined,
    z.url("URL Facebook invalide").optional()
  ),
  whatsapp: z.preprocess(emptyToUndefined, z.string().optional()), // on permet texte libre (numéro ou lien)
  website: z.preprocess(
    emptyToUndefined,
    z.url("URL du site web invalide").optional()
  ),
});

/** Type TS inféré */
export type ContactsSchemaType = z.infer<typeof ContactsSchema>;
