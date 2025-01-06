// models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentIntentId: { type: String },
    amount: { type: Number },
    paymentType: { type: String },
    created: { type: String }, // Date of the payment
    currency: { type: String },
    receiptEmail: { type: String }, // URL for receipt
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
