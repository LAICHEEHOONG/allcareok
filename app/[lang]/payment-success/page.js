// // import Stripe from "stripe";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe Secret Key

// export default async function PaymentSuccess({ searchParams: { amount } }) {

//   async function getCheckoutSession(sessionId) {
//     try {
//       const session = await stripe.checkout.sessions.retrieve(sessionId);
//       console.log("Checkout Session Data:", session);
//       return session;
//     } catch (error) {
//       console.error("Error fetching Checkout Session:", error);
//     }
//   }

//   // Replace with your actual session ID

//   getCheckoutSession(amount);
//   return (
//     <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
//       <div className="mb-10">
//         <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
//         <h2 className="text-2xl">You successfully sent</h2>

//         <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
//           ${amount}
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";
import { useSearchParams } from "next/navigation";
// import Stripe from "stripe";
import { useEffect } from "react";
import { getSessionId } from "@/lib/action/adAction";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId"); // Retrieve the 'amount' parameter
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Replace with your actual session ID

  useEffect(() => {
    const getCheckoutSession = async ( sessionId ) => {
      try {
        const ans = await getSessionId({ sessionId });
        console.log(ans);
      } catch (error) {
        console.log(error);
      }
    };
    getCheckoutSession(sessionId);
  }, [sessionId]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${sessionId}
        </div>
      </div>
    </main>
  );
}
