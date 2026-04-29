import { z } from "zod";

export const InventoryUpdateSchema = z.object({
  species: z.string().min(2),
  moisture_content: z.number().min(0).max(20), // Standard woodworking range
  dimensions: z.string(),
  price_cents: z.number().int().positive(),
  tier: z.enum(["Grain", "Gavel", "Master"]),
  description: z.string(),
  image_url: z.string().url(),
  stripe_link: z.string().url(),
  board_footage: z.number().positive(),
  rarity: z.enum(["Common", "Rare", "Extremely Rare", "One-of-a-kind"]),
});

export type InventoryUpdate = z.infer<typeof InventoryUpdateSchema>;
