"use server";

import { PartnerIntakeSchema, type PartnerIntake } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

/**
 * Server Action for Supplier Inventory Intake.
 * Allows administrative or partner-facing UI forms to upload new listings to the Master Inventory.
 */
export async function uploadInventoryAction(data: PartnerIntake) {
  try {
    // 1. Validate data
    const validatedData = PartnerIntakeSchema.parse(data);

    // 2. Prepare internal mapping for MASTER INVENTORY schema
    const dbRow = {
      species: validatedData.species,
      moisture_content: validatedData.moisture_content,
      dimensions: `${validatedData.board_footage} BF Stock`,
      board_footage: validatedData.board_footage,
      price_cents: validatedData.price_cents,
      image_url: validatedData.image_url,
      tier: "Marketplace", // New intake defaults to marketplace
      status: "Available",
      description: `Boutique sawmill selection: ${validatedData.species}. Kiln-dried to ${validatedData.moisture_content}% MC. S2S 120-grit.`,
      stripe_link: "https://buy.stripe.com/test_placeholder",
      rarity: "Rare",
      sawmill_id: "partner-intake",
      stock_count: 5
    };

    // 3. Perform Sync to MASTER INVENTORY
    const dbId = "ca64d0ab-aae2-47bf-96ef-f37a0a306e51";
    const response = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BAGET_INTERNAL_TOKEN}`,
      },
      body: JSON.stringify({
        rows: [
          {
            externalKey: validatedData.species.toLowerCase().replace(/\s+/g, '-'),
            data: dbRow,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Inventory sync failed: ${errorText}`);
    }

    // 4. Invalidate cache
    revalidatePath("/");
    
    return { success: true, message: `Successfully listed ${validatedData.species}.` };
  } catch (error: any) {
    console.error("Upload Action Error:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred during upload." 
    };
  }
}
