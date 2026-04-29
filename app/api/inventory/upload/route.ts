import { NextResponse } from "next/server";
import { PartnerIntakeSchema } from "@/lib/schemas";

/**
 * Supplier Inventory Intake API
 * Location: /api/inventory/upload
 */
export async function POST(request: Request) {
  try {
    // 1. Authenticate Request
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${process.env.PARTNER_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse and Validate Payload
    const body = await request.json();
    const validatedData = PartnerIntakeSchema.parse(body);

    // 3. Prepare Internal Row Data for MASTER INVENTORY
    const dbRow = {
      species: validatedData.species,
      moisture_content: validatedData.moisture_content,
      dimensions: `${validatedData.board_footage} BF Stock`,
      board_footage: validatedData.board_footage,
      price_cents: validatedData.price_cents,
      image_url: validatedData.image_url,
      tier: "Marketplace",
      status: "Available",
      description: `Premium ${validatedData.species} stock sourced from PNW boutique mills. Kiln-dried to ${validatedData.moisture_content}% MC.`,
      stripe_link: "https://buy.stripe.com/test_placeholder",
      rarity: "Rare",
      sawmill_id: "partner-intake",
      stock_count: 10
    };

    // 4. Upsert to Baget Database (Master Inventory)
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
      const errorDetails = await response.text();
      return NextResponse.json(
        { error: "Failed to sync with inventory database", details: errorDetails },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Inventory listing for ${validatedData.species} successfully uploaded.`,
      entry: dbRow,
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
