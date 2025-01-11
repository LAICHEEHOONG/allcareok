import Stripe from "stripe";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ChargeSucceed from "@/models/ChargeSucceed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect(); // Connect to MongoDB

  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature");

  try {
    // Verify the Stripe webhook signature
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Process the charge.succeeded event
    if (event.type === "charge.succeeded") {
      const charge = event.data.object;

      // Extract and save the relevant data
      const chargeData = {
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        billing_details: charge.billing_details,
        payment_method: charge.payment_method,
        payment_method_type: charge.payment_method_details?.type,
        status: charge.status,
        receipt_url: charge.receipt_url,
        created: charge.created,
        captured: charge.captured,
        outcome: charge.outcome
          ? {
              network_status: charge.outcome.network_status,
              risk_level: charge.outcome.risk_level,
              seller_message: charge.outcome.seller_message,
              type: charge.outcome.type,
            }
          : null,
      };

      // Save to MongoDB
      await ChargeSucceed.create(chargeData);

      console.log("Charge succeeded and saved:", chargeData);

      return NextResponse.json({ status: "success" });
    }

    // Respond to unsupported event types
    return NextResponse.json({ status: "ignored" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ status: "failed", error: error.message });
  }
}
