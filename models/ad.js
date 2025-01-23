import mongoose from "mongoose";
const { Schema } = mongoose;

const photoSchema = new Schema({
  url: { type: String },
  publicId: { type: String },
});

const reviewPaymentSchema = new Schema({
  sessionId: {
    type: String,
    // unique: true, // Ensures no duplicate sessions
  },
  clientReferenceId: {
    type: String, // Optional based on your app logic
  },
  customerDetails: {
    name: { type: String },
    email: { type: String },
  },
  amountTotal: {
    type: Number,
  },
  currency: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  paymentIntentId: {
    type: String,
  },
  successUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const adSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
      required: true, // Ensure every ad is linked to a user
    },
    photo: [photoSchema],
    verification: [photoSchema],
    title: { type: String, default: "Your service title" },
    service: [{ type: String }],
    area: {
      country: { type: String, default: "" },
      state: { type: String, default: "" },
      city: { type: String, default: "" },
      town: { type: String, default: "" },
    },
    contact: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      telegram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      x: { type: String, default: "" },
      wechat: { type: String, default: "" },
      line: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    youtube: {
      type: String,
      default: "",
      /* HTML content stored as a string */
    },
    description: {
      type: String,
      default: "Enter your service description here",
      /* HTML content stored as a string */
    },
    reviewPayment: reviewPaymentSchema,
    reviewStatus: {
      type: String,
      enum: ["Approved", "Under Review", "Rejected", "Payment Pending"], // Define allowed values
      default: "Payment Pending", // Set the default value
    },
    planPayment: reviewPaymentSchema,
    topRanking: {
      type: Date, // Use the Date type to store the ranking date
      default: null, // Default value can be null if not set
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report", // 关联 `reportSchema`
      },
    ],
    block: {
      type: Boolean,
      default: false, // Adding the block key with default value
    },
    views: {
      type: Number,
      default: 0, // Default value for views
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient searches across all areas
adSchema.index({
  "area.country": 1,
  "area.state": 1,
  "area.city": 1,
  "area.town": 1,
});

const AD = mongoose.models.AD || mongoose.model("AD", adSchema);

export default AD;
