"use server";
import AD from "@/models/ad";
import dbConnect from "../dbConnect";
import Stripe from "stripe";



export async function getSessionId(request) {
  const { sessionId } = request;

  if (!sessionId) {
    console.error("Session ID is missing");
    return { success: false, message: "Invalid session ID" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Connect to the database
    await dbConnect();

    // Check if sessionId already exists in the database
    const existingAd = await AD.findOne({
      "reviewPayment.sessionId": session.id,
    });

    if (existingAd) {
      console.info("Session ID already exists, returning existing record.");
      return {
        success: false,
        message: "Session ID already exists.",
      };
    }

    // Update the corresponding ad
    const updatedAd = await AD.findOneAndUpdate(
      { _id: session.client_reference_id }, // Match the ad by _id
      {
        $set: {
          "reviewPayment.sessionId": session.id,
          "reviewPayment.clientReferenceId": session.client_reference_id,
          "reviewPayment.customerDetails": {
            name: session.customer_details?.name || "N/A",
            email: session.customer_details?.email || "N/A",
          },
          "reviewPayment.amountTotal": session.amount_total || 0,
          "reviewPayment.currency": session.currency || "N/A",
          "reviewPayment.paymentStatus": session.payment_status || "unknown",
          "reviewPayment.paymentIntentId": session.payment_intent || "N/A",
          "reviewPayment.successUrl": session.success_url || "N/A",
          "reviewPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
          reviewStatus:
            session.payment_status === "paid"
              ? "Under Review"
              : "Payment Pending",
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAd) {
      console.warn("Ad not found for the provided client reference ID");
    }

    // console.log("Checkout Session Data:", session);
    // return session;
    return { success: true };
  } catch (error) {
    console.error("Error fetching Checkout Session:", error.message);
    return { success: false, message: error.message };
  }
}
export async function getSessionIdPlus(request) {
  const { sessionId } = request;

  if (!sessionId) {
    console.error("Session ID is missing");
    return { success: false, message: "Invalid session ID" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Connect to the database
    await dbConnect();

    // Check if sessionId already exists in the database
    const existingAd = await AD.findOne({
      "planPayment.sessionId": session.id,
    });

    if (existingAd) {
      console.info("Session ID already exists, returning existing record.");
      return {
        success: false,
        message: "Session ID already exists.",
      };
    }

    // Update the corresponding ad
    const updatedAd = await AD.findOneAndUpdate(
      { _id: session.client_reference_id }, // Match the ad by _id
      {
        $set: {
          "planPayment.sessionId": session.id,
          "planPayment.clientReferenceId": session.client_reference_id,
          "planPayment.customerDetails": {
            name: session.customer_details?.name || "N/A",
            email: session.customer_details?.email || "N/A",
          },
          "planPayment.amountTotal": session.amount_total || 0,
          "planPayment.currency": session.currency || "N/A",
          "planPayment.paymentStatus": session.payment_status || "unknown",
          "planPayment.paymentIntentId": session.payment_intent || "N/A",
          "planPayment.successUrl": session.success_url || "N/A",
          "planPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
          topRanking:
            session.payment_status === "paid"
              ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Add 7 days to today's date
              : null,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAd) {
      console.warn("Ad not found for the provided client reference ID");
    }

    return { success: true };
  } catch (error) {
    console.error("Error fetching Checkout Session:", error.message);
    return { success: false, message: error.message };
  }
}
export async function getSessionIdPro(request) {
  const { sessionId } = request;

  if (!sessionId) {
    console.error("Session ID is missing");
    return { success: false, message: "Invalid session ID" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Connect to the database
    await dbConnect();

    // Check if sessionId already exists in the database
    const existingAd = await AD.findOne({
      "planPayment.sessionId": session.id,
    });

    if (existingAd) {
      console.info("Session ID already exists, returning existing record.");
      return {
        success: false,
        message: "Session ID already exists.",
      };
    }

    // Update the corresponding ad
    const updatedAd = await AD.findOneAndUpdate(
      { _id: session.client_reference_id }, // Match the ad by _id
      {
        $set: {
          "planPayment.sessionId": session.id,
          "planPayment.clientReferenceId": session.client_reference_id,
          "planPayment.customerDetails": {
            name: session.customer_details?.name || "N/A",
            email: session.customer_details?.email || "N/A",
          },
          "planPayment.amountTotal": session.amount_total || 0,
          "planPayment.currency": session.currency || "N/A",
          "planPayment.paymentStatus": session.payment_status || "unknown",
          "planPayment.paymentIntentId": session.payment_intent || "N/A",
          "planPayment.successUrl": session.success_url || "N/A",
          "planPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
          topRanking:
            session.payment_status === "paid"
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Add 30 days to today's date
              : null,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAd) {
      console.warn("Ad not found for the provided client reference ID");
    }

    return { success: true };
  } catch (error) {
    console.error("Error fetching Checkout Session:", error.message);
    return { success: false, message: error.message };
  }
}
// export async function getSessionIdPlus(request) {
//   const { sessionId } = request;

//   if (!sessionId) {
//     console.error("Session ID is missing");
//     return { success: false, message: "Invalid session ID" };
//   }

//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//   try {
//     // Retrieve the session from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (!session) {
//       throw new Error("Session not found");
//     }

//     // Connect to the database
//     await dbConnect();

//     // Update the corresponding ad
//     const updatedAd = await AD.findOneAndUpdate(
//       { _id: session.client_reference_id }, // Match the ad by _id
//       {
//         $set: {
//           "planPayment.sessionId": session.id,
//           "planPayment.clientReferenceId": session.client_reference_id,
//           "planPayment.customerDetails": {
//             name: session.customer_details?.name || "N/A",
//             email: session.customer_details?.email || "N/A",
//           },
//           "planPayment.amountTotal": session.amount_total || 0,
//           "planPayment.currency": session.currency || "N/A",
//           "planPayment.paymentStatus": session.payment_status || "unknown",
//           "planPayment.paymentIntentId": session.payment_intent || "N/A",
//           "planPayment.successUrl": session.success_url || "N/A",
//           "planPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
//           topRanking:
//             session.payment_status === "paid"
//               ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Add 7 days to today's date
//               : null,
//         },
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedAd) {
//       console.warn("Ad not found for the provided client reference ID");
//     }

//     // console.log("Checkout Session Data:", session);
//     // return session;
//     return { success: true };
//   } catch (error) {
//     console.error("Error fetching Checkout Session:", error.message);
//     return { success: false, message: error.message };
//   }
// }

// export async function getSessionId(request) {
//   const { sessionId } = request;

//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     const updatedAd = await AD.findOneAndUpdate(
//       { _id: session.client_reference_id }, // Match the ad by _id
//       {
//         $set: {
//           "reviewPayment.sessionId": session.id,
//           "reviewPayment.clientReferenceId": session.client_reference_id,
//           "reviewPayment.customerDetails": {
//             name: session.customer_details.name,
//             email: session.customer_details.email,
//           },
//           "reviewPayment.amountTotal": session.amount_total,
//           "reviewPayment.currency": session.currency,
//           "reviewPayment.paymentStatus": session.payment_status,
//           "reviewPayment.paymentIntentId": session.payment_intent,
//           "reviewPayment.successUrl": session.success_url,
//           "reviewPayment.createdAt": new Date(session.created * 1000), // Convert timestamp
//         },
//       },
//       { new: true, upsert: true } // Create document if it doesn't exist
//     );
//     console.log("Checkout Session Data:", session);
//     return JSON.parse(JSON.stringify(session));
//     // return session;
//   } catch (error) {
//     console.error("Error fetching Checkout Session:", error);
//   }
// }

export async function deleteAd(request) {
  const { userId, role, adId } = request;
  console.log(userId, role, adId);
  await dbConnect();

  try {
    // Find the ad by ID
    const ad = await AD.findById(adId).exec();

    if (!ad) {
      throw new Error("Ad not found");
    }

    // Check user role and ownership
    if (role === "user") {
      if (ad.user.toString() !== userId) {
        throw new Error("Permission denied: You can only delete your own ads");
      }
    } else if (role !== "admin") {
      throw new Error("Permission denied: Invalid role");
    }

    // Delete the ad
    await AD.findByIdAndDelete(adId);
    return { success: true, message: "Ad deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

export async function findUserAds(request) {
  const { user } = request;
  // console.log(user)
  await dbConnect();

  try {
    const ads = await AD.find({ user }).exec();
    return JSON.parse(JSON.stringify(ads));
  } catch (error) {
    console.log(error);
    throw new Error("Error processing the request");
  }
}

// create and update
export async function createAD(request) {
  const {
    adsId,
    user,
    photo,
    title,
    service,
    area,
    contact,
    description,
    youtube,
    verification,
    reviewPayment,
  } = request;

  await dbConnect();

  try {
    if (adsId) {
      // If an ID is provided, update the ad
      const updatedAD = await AD.findByIdAndUpdate(
        adsId,
        {
          user,
          photo,
          title,
          service,
          area,
          contact,
          description,
          youtube,
          verification,
          reviewPayment,
        },
        { new: true, runValidators: true } // Return the updated document and validate the inputs
      );
      // return updatedAD;
      return JSON.parse(JSON.stringify(updatedAD));
    } else {
      // Otherwise, create a new ad
      const adData = new AD({
        user,
        photo,
        title,
        service,
        area,
        contact,
        description,
        youtube,
        verification,
        reviewPayment,
      });
      const createdAD = await adData.save();
      // return createdAD;
      return JSON.parse(JSON.stringify(createdAD));
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error processing the request");
  }
}
