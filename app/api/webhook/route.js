import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
// import dbConnect from "../../lib/mongodb";
import Payment from "@/models/Payment";
import Checker from "@/models/Checker";
import CheckoutSession from "@/models/CheckoutSession";
// import CheckoutSession from "@/models/CheckoutSession";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect(); // Connect to MongoDB

  const payload = await req.text();
  const res = JSON.parse(payload);
  const sig = req.headers.get("Stripe-Signature");

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const checker = new Checker({ Fire: "fire", FireType: event.type });
    await checker.save();

    if (event.type === "checkout.session.completed") {
      // const RES = res?.data?.object;
      async function handleCheckoutSessionCompleted(webhookData) {
        try {
          const session = webhookData?.data?.object;

          const newSession = new CheckoutSession({
            sessionId: session.id,
            clientReferenceId: session.client_reference_id,
            customerDetails: {
              name: session.customer_details.name,
              email: session.customer_details.email,
            },
            amountTotal: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
            paymentIntentId: session.payment_intent,
            successUrl: session.success_url,
            createdAt: new Date(session.created * 1000), // Convert timestamp to JavaScript Date
          });

          await newSession.save();
          console.log("Checkout session saved successfully");
        } catch (error) {
          console.error("Error saving checkout session:", error);
        }
      }

      handleCheckoutSessionCompleted(res)
    }

    // Check if the event is for a successful payment
    if (event.type === "payment_intent.succeeded") {
      // console.log(event.data.object)
      // const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Extract relevant data for your database
      const RES = res?.data?.object;
      const paymentData = {
        paymentIntentId: RES?.id,
        amount: RES?.amount,
        paymentType: RES?.payment_method_types[0],
        created: RES?.created,
        currency: RES?.currency,
        receiptEmail: RES?.receipt_email,
        status: RES?.status,
      };
      // console.log(paymentData);

      const payment = new Payment(paymentData);
      await payment.save();

      return NextResponse.json({ status: "success", event: event.type });
    } else {
      console.log(`Unhandled event type: ${event.type}`);
      return NextResponse.json({
        status: "unhandled_event",
        event: event.type,
      });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ status: "failed", error });
  }
}

// stripe login
// stripe listen --forward-to localhost:3000/api/webhook
// stripe trigger payment_intent.succeeded
