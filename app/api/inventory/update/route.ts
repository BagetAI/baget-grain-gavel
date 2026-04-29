import { NextResponse } from "next/server";
import { InventoryUpdateSchema } from "@/lib/schemas";

/**
 * API Endpoint for Fulfillment Partners (e.g., Bell Forest Products)
 * to update inventory stock levels, moisture content, and pricing.
 */
export async function POST(request: Request) {
  try {
    // 1. Authenticate Request
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.PARTNER_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse and Validate Payload with Zod
    const body = await request.json();
    const validatedData = InventoryUpdateSchema.parse(body);

    // 3. Update Database via Baget API
    // We use the species as the externalKey for upserting
    const dbId = "2935fa57-8b71-45f7-84bb-fdb46d872b06";
    const response = await fetch(`https://stg-app.baget.ai/api/public/databases/${dbId}/rows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // In a real production environment, this would use a secure internal token
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
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to update database", details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Inventory for ${validatedData.species} updated successfully.`,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
