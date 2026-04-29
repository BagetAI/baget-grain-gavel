"use server";

import { InventoryUpdateSchema, type InventoryUpdate } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

/**
 * Server Action for internal administrative inventory updates.
 */
export async function updateInventoryAction(formData: InventoryUpdate) {
  try {
    // 1. Validate data
    const validatedData = InventoryUpdateSchema.parse(formData);

    // 2. Perform Update
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
            data: validatedData,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Database update failed");
    }

    // 3. Clear cache to show new data immediately
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred" 
    };
  }
}
