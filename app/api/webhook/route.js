// import Stripe from "stripe";
// import { NextResponse, NextRequest } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// export async function POST(req) {
//   const payload = await req.text();
//   const res = JSON.parse(payload);

//   const sig = req.headers.get("Stripe-Signature");

//   const dateTime = new Date(res?.created * 1000).toLocaleDateString();
//   const timeString = new Date(res?.created * 1000).toLocaleDateString();

//   try {
//     let event = stripe.webhooks.constructEvent(
//       payload,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     console.log("event", event.type);

//     return NextResponse.json({ status: "success", even: event.type });
//   } catch (error) {
//     return NextResponse.json({ status: "Failed", error });
//   }
// }


import Stripe from "stripe";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Payment from "../../../app/lib/model/payment"
// import Payment from "@/models/Payment"; // Import your Payment model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(req) {
  const payload = await req.text(); // Stripe requires raw body
  const sig = req.headers.get("Stripe-Signature");

  try {
    // Verify and construct Stripe event
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "charge.succeeded") {
      const charge = event.data.object;

      // Convert timestamps
    //   const dateTime = new Date(charge.created * 1000).toLocaleDateString();
    //   const timeString = new Date(charge.created * 1000).toLocaleTimeString();

      // Connect to MongoDB
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Save payment details to the database
      const payment = new Payment({
        stripeId: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        paymentMethod: charge.payment_method_details.type,
        createdAt: new Date(charge.created * 1000), // Store created time
      });

      await payment.save();

      console.log("Payment saved:", payment);
    }

    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ status: "failed", error: error.message });
  }
}
