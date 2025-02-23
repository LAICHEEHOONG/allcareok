import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema for photos (used in both photo and verification fields)
const photoSchema = new Schema({
  url: { type: String },
  publicId: { type: String },
});

// Schema for payment details (used in reviewPayment and planPayment)
const reviewPaymentSchema = new Schema({
  sessionId: { type: String },
  clientReferenceId: { type: String },
  customerDetails: {
    name: { type: String },
    email: { type: String },
  },
  amountTotal: { type: Number },
  currency: { type: String },
  paymentStatus: { type: String },
  paymentIntentId: { type: String },
  successUrl: { type: String },
  createdAt: { type: Date },
});

// Main ad schema
const adSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Every ad must be linked to a user
    },
    photo: [photoSchema], // Array of photos
    verification: [photoSchema], // Array of verification photos
    title: {
      type: String,
      default: "Your service title",
      trim: true, // Remove leading/trailing whitespace
    },
    service: [
      {
        type: String,
        trim: true, // Trim each entry in the array
      },
    ],
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
      default: "", // For storing YouTube links or embed codes
    },
    description: {
      type: String,
      default: "Enter your service description here",
      trim: true, // Remove leading/trailing whitespace
    },
    reviewPayment: reviewPaymentSchema, // Payment details for review
    reviewStatus: {
      type: String,
      enum: ["Approved", "Under Review", "Rejected", "Payment Pending"],
      default: "Payment Pending",
    },
    planPayment: reviewPaymentSchema, // Payment details for plans (e.g., topRanking)
    topRanking: {
      type: Date,
      default: null, // Date until which the ad is top-ranked
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report", // Reference to a Report model
      },
    ],
    block: {
      type: Boolean,
      default: false, // Indicates if the ad is blocked
    },
    views: {
      type: Number,
      default: 0, // Tracks ad views
    },
    userView: {
      type: [String],
      trim: true,
      default: []
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Index for efficient location-based queries
adSchema.index({
  "area.country": 1,
  "area.state": 1,
  "area.city": 1,
  "area.town": 1,
});

// Optional additional indexes for frequent queries (uncomment if needed)
// adSchema.index({ block: 1, topRanking: -1 }); // For queries filtering by block and sorting by topRanking
// adSchema.index({ reviewStatus: 1 }); // For filtering by review status

// Create or retrieve the AD model
const AD = mongoose.models.AD || mongoose.model("AD", adSchema);

/*
 * MongoDB Atlas Search Index Configuration
 * This is NOT part of the Mongoose schema. Set it up in MongoDB Atlas:
 * 1. Go to your Atlas Cluster > "Search" tab > Select the "ads" collection.
 * 2. Click "Create Search Index" > Use JSON Editor.
 * 3. Paste the following configuration and name it "default" (or update adAction.js to match your index name):
 * {
 *   "mappings": {
 *     "dynamic": true,
 *     "fields": {
 *       "title": { "type": "string" },
 *       "service": { "type": "string" },
 *       "description": { "type": "string" },
 *       "contact": {
 *         "type": "document",
 *         "fields": {
 *           "phone": { "type": "string" },
 *           "email": { "type": "string" },
 *           "whatsapp": { "type": "string" },
 *           "telegram": { "type": "string" },
 *           "facebook": { "type": "string" },
 *           "tiktok": { "type": "string" },
 *           "instagram": { "type": "string" },
 *           "youtube": { "type": "string" },
 *           "x": { "type": "string" },
 *           "wechat": { "type": "string" },
 *           "line": { "type": "string" },
 *           "website": { "type": "string" }
 *         }
 *       }
 *     }
 *   }
 * }
 * 4. Save and wait for the index to build.
 */

export default AD;
