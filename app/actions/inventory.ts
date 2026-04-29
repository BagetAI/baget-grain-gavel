"use server";

import { PartnerIntakeSchema, type PartnerIntake } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

/**
 * Server Action for Supplier Inventory Intake.
 * Allows administrative or partner-facing UI forms to upload new listings.
 */
export async function uploadInventoryAction(data: PartnerIntake) {
  try {
    // 1. Validate data
    const validatedData = PartnerIntakeSchema.parse(data);

    // 2. Prepare internal mapping
    const dbRow = {
      species: validatedData.species,
      moisture_content: validatedData.moisture_content,
      dimensions: `${validatedData.board_footage} BF Stock`,
      board_footage: validatedData.board_footage,
      price_cents: validatedData.price_cents,
      image_url: validatedData.image_url,
      tier: "Grain",
      description: `Boutique sawmill selection: ${validatedData.species}. Kiln-dried to ${validatedData.moisture_content}% MC.`,
      stripe_link: "https://buy.stripe.com/test_placeholder",
      rarity: "Rare",
    };

    // 3. Perform Sync
    const dbId = "2935fa57-8b71-45f7-84bb-fdb46d872b06";
    const response = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BAGET_INTERNAL_TOKEN}`,
      },
      body: JSON.stringify({
        rows: [
          {
            externalKey: validatedData.species,
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
