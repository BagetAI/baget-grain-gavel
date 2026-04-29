"use server";

import { revalidatePath } from "next/cache";

/**
 * Server action to initiate checkout.
 * In a real app, this would create a Stripe session and return the URL.
 * Here, we redirect to the stripe_link stored in our database.
 */
export async function initiateCheckoutAction(stripeLink: string) {
  // Logic to handle metadata or tracking before redirecting
  // Since we are using pre-generated Stripe Payment Links for now
  return { url: stripeLink };
}

/**
 * Server action to handle inventory decrement upon successful checkout.
 * Called by the success page.
 */
export async function recordSuccessfulSaleAction(species: string) {
  const dbId = "2935fa57-8b71-45f7-84bb-fdb46d872b06";
  
  try {
    // 1. Get current stock
    const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`);
    if (!res.ok) throw new Error("Failed to fetch inventory");
    const { rows } = await res.json();
    
    const item = rows.find((r: any) => r.data.species === species);
    if (!item) return { success: false, error: "Item not found" };

    const currentStock = item.data.stock_count || 0;
    const newStock = Math.max(0, currentStock - 1);

    // 2. Update stock via Baget API (upsert using externalKey)
    // We assume the externalKey matches the species name slug or similar logic
    // For simplicity, we'll use the species as the key
    const updateRes = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BAGET_INTERNAL_TOKEN}`,
      },
      body: JSON.stringify({
        rows: [
          {
            externalKey: species.toLowerCase().replace(/\s+/g, '-'),
            data: { 
              ...item.data,
              stock_count: newStock 
            },
          },
        ],
      }),
    });

    if (!updateRes.ok) throw new Error("Failed to update stock");

    revalidatePath("/");
    return { success: true, newStock };
  } catch (err: any) {
    console.error("Sale Recording Error:", err);
    return { success: false, error: err.message };
  }
}
