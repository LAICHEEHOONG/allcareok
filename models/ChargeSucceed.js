import mongoose from "mongoose";

// Define the ChargeSucceed schema
const chargeSucceedSchema = new mongoose.Schema(
  {
    id: { type: String }, // Charge ID
    amount: { type: Number }, // Amount charged
    currency: { type: String }, // Currency code (e.g., "myr")
    billing_details: {
      email: { type: String }, // Customer email
      name: { type: String }, // Customer name
    },
    payment_method: { type: String }, // Payment method ID
    payment_method_type: { type: String }, // Type of payment method (e.g., "grabpay")
    status: { type: String }, // Status of the charge (e.g., "succeeded")
    receipt_url: { type: String }, // Receipt URL
    created: { type: Number }, // Timestamp when the charge was created
    captured: { type: Boolean }, // Indicates if the charge was captured
    outcome: {
      network_status: { type: String },
      risk_level: { type: String },
      seller_message: { type: String },
      type: { type: String },
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

const ChargeSucceed =
  mongoose.models.ChargeSucceed ||
  mongoose.model("ChargeSucceed", chargeSucceedSchema);

export default ChargeSucceed;

// {
//     "object": {
//       "id": "py_3Qfiz7HvdyGVNnVN1P9yCAyc",
//       "object": "charge",
//       "amount": 200,
//       "amount_captured": 200,
//       "amount_refunded": 0,
//       "application": null,
//       "application_fee": null,
//       "application_fee_amount": null,
//       "balance_transaction": null,
//       "billing_details": {
//         "address": {
//           "city": null,
//           "country": null,
//           "line1": null,
//           "line2": null,
//           "postal_code": null,
//           "state": null
//         },
//         "email": "test11@gmail.com",
//         "name": "test11",
//         "phone": null
//       },
//       "calculated_statement_descriptor": null,
//       "captured": true,
//       "created": 1736518502,
//       "currency": "myr",
//       "customer": null,
//       "description": null,
//       "destination": null,
//       "dispute": null,
//       "disputed": false,
//       "failure_balance_transaction": null,
//       "failure_code": null,
//       "failure_message": null,
//       "fraud_details": {},
//       "invoice": null,
//       "livemode": true,
//       "metadata": {},
//       "on_behalf_of": null,
//       "order": null,
//       "outcome": {
//         "advice_code": null,
//         "network_advice_code": null,
//         "network_decline_code": null,
//         "network_status": "approved_by_network",
//         "reason": null,
//         "risk_level": "not_assessed",
//         "seller_message": "Payment complete.",
//         "type": "authorized"
//       },
//       "paid": true,
//       "payment_intent": "pi_3Qfiz7HvdyGVNnVN1MdAClL3",
//       "payment_method": "pm_1Qfiz6HvdyGVNnVN6cH7GNVw",
//       "payment_method_details": {
//         "grabpay": {
//           "transaction_id": null
//         },
//         "type": "grabpay"
//       },
//       "radar_options": {},
//       "receipt_email": null,
//       "receipt_number": null,
//       "receipt_url": "https://pay.stripe.com/receipts/payment/CAcQARoXChVhY2N0XzFRQ3RaRUh2ZHlHVk5uVk4o5taEvAYyBpLUAyyLrzosFoPfp3MVRj7N2SdV-GVvd6ZZF_ggDuxgKzRpHS5WBA3ki7yRkV3Hr6vVnZs",
//       "refunded": false,
//       "review": null,
//       "shipping": null,
//       "source": null,
//       "source_transfer": null,
//       "statement_descriptor": null,
//       "statement_descriptor_suffix": null,
//       "status": "succeeded",
//       "transfer_data": null,
//       "transfer_group": null
//     },
//     "previous_attributes": null
//   }
