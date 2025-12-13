import { z } from "zod";

export const TarifSchema = z
  .object({
    // ✅ nombres coercés à partir de chaînes
    minWeight: z.coerce.number().min(0, { message: "min Poids doit être ≥ 0" }),
    maxWeight: z.coerce.number().min(0, { message: "max Poids doit être ≥ 0" }),

    minLength: z.coerce
      .number()
      .min(0, { message: "min Longueur doit être ≥ 0" }),
    maxLength: z.coerce
      .number()
      .min(0, { message: "max Longueur doit être ≥ 0" }),

    minWidth: z.coerce
      .number()
      .min(0, { message: "min Largeur doit être ≥ 0" }),
    maxWidth: z.coerce
      .number()
      .min(0, { message: "max Largeur doit être ≥ 0" }),

    express: z.boolean(),

    price: z.coerce.number().min(0, { message: "Le prix doit être ≥ 0" }),
    // ✅ IDs
    sender: z
      .string()
      .trim()
      .min(1, { message: "sender (zone expéditeur) est requis" }),
    receiver: z
      .string()
      .trim()
      .min(1, { message: "receiver (zone destinataire) est requis" }),
    companyId: z.string().trim().min(1, { message: "companyId est requis" }),
  })
  // ✅ validations croisées (superRefine modernisé)
  .superRefine((val, ctx) => {
    if (val.minWeight > val.maxWeight) {
      ctx.addIssue({
        path: ["minWeight"],
        code: "custom",
        message: "min Poids ne peut pas être supérieur à max Poids",
      });
    }

    if (val.minLength > val.maxLength) {
      ctx.addIssue({
        path: ["minLength"],
        code: "custom",
        message: "min Longueur ne peut pas être supérieur à max Longueur",
      });
    }

    if (val.minWidth > val.maxWidth) {
      ctx.addIssue({
        path: ["minWidth"],
        code: "custom",
        message: "min Largeur ne peut pas être supérieur à maxn Largeur",
      });
    }

    // if (val.sender === val.receiver) {
    //   ctx.addIssue({
    //     path: ["receiver"],
    //     code: "custom",
    //     message: "receiver doit être différent de sender",
    //   });
    // }
  });

export type TarifType = z.infer<typeof TarifSchema>;

export const TarifUpdateSchema = z
  .object({
    id: z
      .string()
      .trim()
      .min(1, { message: "L'identifiant du tarif est requis" }),

    companyId: z
      .string()
      .trim()
      .min(1, { message: "L'identifiant de la compagnie est requis" }),

    minWeight: z.coerce.number().min(0, { message: "min Poids doit être ≥ 0" }),
    maxWeight: z.coerce.number().min(0, { message: "max Poids doit être ≥ 0" }),

    minLength: z.coerce
      .number()
      .min(0, { message: "min Longueur doit être ≥ 0" }),
    maxLength: z.coerce
      .number()
      .min(0, { message: "max Longueur doit être ≥ 0" }),

    minWidth: z.coerce
      .number()
      .min(0, { message: "min Largeur doit être ≥ 0" }),
    maxWidth: z.coerce
      .number()
      .min(0, { message: "max Largeur doit être ≥ 0" }),

    express: z.boolean(),

    price: z.coerce.number().min(0, { message: "Le prix doit être ≥ 0" }),
  })
  // ✅ validations croisées : cohérence des intervalles
  .superRefine((val, ctx) => {
    if (val.minWeight > val.maxWeight) {
      ctx.addIssue({
        path: ["minWeight"],
        code: "custom",
        message: "min Poids ne peut pas être supérieur à max Poids",
      });
    }

    if (val.minLength > val.maxLength) {
      ctx.addIssue({
        path: ["minLength"],
        code: "custom",
        message: "min Longueur ne peut pas être supérieur à max Longueur",
      });
    }

    if (val.minWidth > val.maxWidth) {
      ctx.addIssue({
        path: ["minWidth"],
        code: "custom",
        message: "min Largeur ne peut pas être supérieur à max Largeur",
      });
    }
  });

export type TarifUpdateType = z.infer<typeof TarifUpdateSchema>;
