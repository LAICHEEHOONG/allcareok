import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import Checker from "@/models/Checker";
import CheckoutSession from "@/models/CheckoutSession";
import AD from "@/models/ad";

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

    // const checker = new Checker({ Fire: "fire", FireType: event.type });
    // await checker.save();

    if (event.type === "checkout.session.completed") {
      // async function handleCheckoutSessionCompleted(webhookData) {
      //   try {
      //     const session = webhookData?.data?.object;

      //     const newSession = new CheckoutSession({
      //       sessionId: session.id,
      //       clientReferenceId: session.client_reference_id,
      //       customerDetails: {
      //         name: session.customer_details.name,
      //         email: session.customer_details.email,
      //       },
      //       amountTotal: session.amount_total,
      //       currency: session.currency,
      //       paymentStatus: session.payment_status,
      //       paymentIntentId: session.payment_intent,
      //       successUrl: session.success_url,
      //       createdAt: session.created,

      //       // createdAt: new Date(session.created * 1000), // Convert timestamp to JavaScript Date
      //     });

      //     await newSession.save();
      //     console.log("Checkout session saved successfully");
      //   } catch (error) {
      //     console.error("Error saving checkout session:", error);
      //   }
      // }

      async function handleCheckoutSessionCompleted(webhookData) {
        try {
          const session = webhookData?.data?.object;

          // Create or update a checkout session
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
            createdAt: session.created,
          });

          await newSession.save();
          console.log("Checkout session saved successfully");

          // Find and update the related ad using clientReferenceId
          // const updatedAd = await AD.findOneAndUpdate(
          //   { _id: session.client_reference_id }, // Match the ad by _id
          //   {
          //     "reviewPayment.sessionId": session.id,
          //     "reviewPayment.clientReferenceId": session.client_reference_id,
          //     "reviewPayment.customerDetails": {
          //       name: session.customer_details.name,
          //       email: session.customer_details.email,
          //     },
          //     "reviewPayment.amountTotal": session.amount_total,
          //     "reviewPayment.currency": session.currency,
          //     "reviewPayment.paymentStatus": session.payment_status,
          //     "reviewPayment.paymentIntentId": session.payment_intent,
          //     "reviewPayment.successUrl": session.success_url,
          //     "reviewPayment.createdAt": new Date(session.created * 1000),
          //   },
          //   { new: true } // Return the updated document
          // );

          const updatedAd = await AD.findOneAndUpdate(
            { _id: session.client_reference_id }, // Match the ad by _id
            {
              $set: {
                "reviewPayment.sessionId": session.id,
                "reviewPayment.clientReferenceId": session.client_reference_id,
                "reviewPayment.customerDetails": {
                  name: session.customer_details.name,
                  email: session.customer_details.email,
                },
                "reviewPayment.amountTotal": session.amount_total,
                "reviewPayment.currency": session.currency,
                "reviewPayment.paymentStatus": session.payment_status,
                "reviewPayment.paymentIntentId": session.payment_intent,
                "reviewPayment.successUrl": session.success_url,
                "reviewPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
              },
            },
            { new: true, upsert: true } // Create document if it doesn't exist
          );

          if (updatedAd) {
            console.log("Ad updated successfully:", updatedAd);
          } else {
            console.error("No matching Ad found to update.");
          }
        } catch (error) {
          console.error("Error handling checkout session:", error);
        }
      }

      handleCheckoutSessionCompleted(res);
      return NextResponse.json({ status: "success" });
    }

    // Check if the event is for a successful payment
    // if (event.type === "payment_intent.succeeded") {
    //   // console.log(event.data.object)
    //   // const paymentIntent = event.data.object as Stripe.PaymentIntent;

    //   // Extract relevant data for your database
    //   const RES = res?.data?.object;
    //   const paymentData = {
    //     paymentIntentId: RES?.id,
    //     amount: RES?.amount,
    //     paymentType: RES?.payment_method_types[0],
    //     created: RES?.created,
    //     currency: RES?.currency,
    //     receiptEmail: RES?.receipt_email,
    //     status: RES?.status,
    //   };
    //   // console.log(paymentData);

    //   const payment = new Payment(paymentData);
    //   await payment.save();

    //   return NextResponse.json({ status: "success", event: event.type });
    // } else {
    //   console.log(`Unhandled event type: ${event.type}`);
    //   return NextResponse.json({
    //     status: "unhandled_event",
    //     event: event.type,
    //   });
    // }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ status: "failed", error });
  }
}

// stripe login
// stripe listen --forward-to localhost:3000/api/webhook
// stripe trigger payment_intent.succeeded
