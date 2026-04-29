import { z } from "zod";

/**
 * Schema for existing inventory updates (Full set of fields)
 */
export const InventoryUpdateSchema = z.object({
  species: z.string().min(2),
  moisture_content: z.number().min(0).max(20),
  dimensions: z.string(),
  price_cents: z.number().int().positive(),
  tier: z.enum(["Grain", "Gavel", "Master"]),
  description: z.string(),
  image_url: z.string().url(),
  stripe_link: z.string().url(),
  board_footage: z.number().positive(),
  rarity: z.enum(["Common", "Rare", "Extremely Rare", "One-of-a-kind"]),
});

/**
 * Focused schema for sawmill partner inventory intake.
 * Mapping supplier inputs to the internal data structure.
 */
export const PartnerIntakeSchema = z.object({
  species: z.string().min(2),
  board_footage: z.number().positive(),
  moisture_content: z.number().min(0).max(20),
  price_cents: z.number().int().positive(),
  image_url: z.string().url(),
});

export type InventoryUpdate = z.infer<typeof InventoryUpdateSchema>;
export type PartnerIntake = z.infer<typeof PartnerIntakeSchema>;
