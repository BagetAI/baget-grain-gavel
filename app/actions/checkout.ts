"use server";

import { revalidatePath } from "next/cache";

/**
 * Server action to initiate checkout.
 */
export async function initiateCheckoutAction(stripeLink: string) {
  return { url: stripeLink };
}

/**
 * Server action to handle inventory decrement upon successful checkout.
 * Called by the success page.
 */
export async function recordSuccessfulSaleAction(species: string) {
  // Updated to MASTER INVENTORY database ID
  const dbId = "ca64d0ab-aae2-47bf-96ef-f37a0a306e51";
  
  try {
    // 1. Get current stock
    const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`);
    if (!res.ok) throw new Error("Failed to fetch inventory from Baget");
    
    // API returns { rows: [...] }
    const data = await res.json();
    const rows = data.rows || [];
    
    const item = rows.find((r: any) => r.data.species === species);
    if (!item) {
      console.warn(`Item not found for species: ${species}`);
      return { success: false, error: "Item not found in database" };
    }

    const currentStock = item.data.stock_count || 0;
    const newStock = Math.max(0, currentStock - 1);

    // 2. Update stock via Baget API (upsert using externalKey)
    // We use a slugified version of the species as the external key
    const externalKey = species.toLowerCase().replace(/\s+/g, '-');

    const updateRes = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BAGET_INTERNAL_TOKEN}`,
      },
      body: JSON.stringify({
        rows: [
          {
            externalKey: externalKey,
            data: { 
              ...item.data,
              stock_count: newStock 
            },
          },
        ],
      }),
    });

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      throw new Error(`Failed to update stock: ${errorText}`);
    }

    revalidatePath("/");
    return { success: true, newStock };
  } catch (err: any) {
    console.error("Sale Recording Error:", err);
    return { success: false, error: err.message };
  }
}
