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


// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import Payment from "../../../app/lib/model/payment"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-08-16",
// });

// export async function POST(req) {
//   const payload = await req.text(); // Stripe requires raw body
//   const sig = req.headers.get("Stripe-Signature");

//   try {
//     // Verify and construct Stripe event
//     const event = stripe.webhooks.constructEvent(
//       payload,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     if (event.type === "charge.succeeded") {
//       const charge = event.data.object;



//       // Connect to MongoDB
//       await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });

//       // Save payment details to the database
//       const payment = new Payment({
//         stripeId: charge.id,
//         amount: charge.amount,
//         currency: charge.currency,
//         paymentMethod: charge.payment_method_details.type,
//         createdAt: new Date(charge.created * 1000), // Store created time
//       });

//       await payment.save();

//       console.log("Payment saved:", payment);
//     }

//     return NextResponse.json({ status: "success", event: event.type });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return NextResponse.json({ status: "failed", error: error.message });
//   }
// }


import Stripe from "stripe";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Payment from "../../../app/lib/model/payment"

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

    // Log error within the Payment document
    try {
      // Connect to MongoDB if not already connected
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Save the error to the Payment document
      const failedPayment = new Payment({
        stripeId: null, // No stripeId since it failed
        amount: 0,
        currency: "N/A",
        paymentMethod: "N/A",
        createdAt: new Date(), // Current time when error occurred
        error: error.message, // Save the error message
      });

      await failedPayment.save();
      console.log("Error logged in Payment:", failedPayment);
    } catch (dbError) {
      console.error("Error saving to DB:", dbError);
    }

    return NextResponse.json({ status: "failed", error: error.message });
  }
}

