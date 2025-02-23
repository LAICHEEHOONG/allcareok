// // ad.js
// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const photoSchema = new Schema({
//   url: { type: String },
//   publicId: { type: String },
// });

// const reviewPaymentSchema = new Schema({
//   sessionId: {
//     type: String,
//     // unique: true, // Ensures no duplicate sessions
//   },
//   clientReferenceId: {
//     type: String, // Optional based on your app logic
//   },
//   customerDetails: {
//     name: { type: String },
//     email: { type: String },
//   },
//   amountTotal: {
//     type: Number,
//   },
//   currency: {
//     type: String,
//   },
//   paymentStatus: {
//     type: String,
//   },
//   paymentIntentId: {
//     type: String,
//   },
//   successUrl: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//   },
// });

// const adSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Reference the User model
//       required: true, // Ensure every ad is linked to a user
//     },
//     photo: [photoSchema],
//     verification: [photoSchema],
//     title: { type: String, default: "Your service title", trim: true }, // Added trim
//     service: [{ type: String, trim: true }], // Added trim for array elements
//     area: {
//       country: { type: String, default: "" },
//       state: { type: String, default: "" },
//       city: { type: String, default: "" },
//       town: { type: String, default: "" },
//     },
//     contact: {
//       phone: { type: String, default: "" },
//       email: { type: String, default: "" },
//       whatsapp: { type: String, default: "" },
//       telegram: { type: String, default: "" },
//       facebook: { type: String, default: "" },
//       tiktok: { type: String, default: "" },
//       instagram: { type: String, default: "" },
//       youtube: { type: String, default: "" },
//       x: { type: String, default: "" },
//       wechat: { type: String, default: "" },
//       line: { type: String, default: "" },
//       website: { type: String, default: "" },
//     },
//     youtube: {
//       type: String,
//       default: "",
//       /* HTML content stored as a string */
//     },
//     description: {
//       type: String,
//       default: "Enter your service description here",
//       trim: true, // Added trim
//       /* HTML content stored as a string */
//     },
//     reviewPayment: reviewPaymentSchema,
//     reviewStatus: {
//       type: String,
//       enum: ["Approved", "Under Review", "Rejected", "Payment Pending"],
//       default: "Payment Pending",
//     },
//     planPayment: reviewPaymentSchema,
//     topRanking: {
//       type: Date,
//       default: null,
//     },
//     reports: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Report",
//       },
//     ],
//     block: {
//       type: Boolean,
//       default: false,
//     },
//     views: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Index for efficient searches across all areas (already present)
// adSchema.index({
//   "area.country": 1,
//   "area.state": 1,
//   "area.city": 1,
//   "area.town": 1,
// });

// // Optional text index for basic search fallback (if Atlas Search isn’t used)
// adSchema.index(
//   {
//     title: "text",
//     service: "text",
//     description: "text",
//     "contact.phone": "text",
//     "contact.email": "text",
//     "contact.whatsapp": "text",
//     "contact.telegram": "text",
//     "contact.facebook": "text",
//     "contact.tiktok": "text",
//     "contact.instagram": "text",
//     "contact.youtube": "text",
//     "contact.x": "text",
//     "contact.wechat": "text",
//     "contact.line": "text",
//     "contact.website": "text",
//   },
//   {
//     weights: {
//       title: 10,
//       service: 8,
//       description: 6,
//       "contact.phone": 4,
//       "contact.email": 4,
//       "contact.whatsapp": 3,
//       "contact.telegram": 3,
//       "contact.facebook": 3,
//       "contact.tiktok": 3,
//       "contact.instagram": 3,
//       "contact.youtube": 3,
//       "contact.x": 3,
//       "contact.wechat": 3,
//       "contact.line": 3,
//       "contact.website": 3,
//     },
//     name: "TextSearchIndex",
//   }
// );

// const AD = mongoose.models.AD || mongoose.model("AD", adSchema);

// /*
//  * MongoDB Atlas Search Index Configuration
//  * This is NOT part of the Mongoose schema. Set it up in MongoDB Atlas:
//  * 1. Go to your Atlas Cluster > "Search" tab > Select the "ads" collection.
//  * 2. Click "Create Search Index" > Use JSON Editor.
//  * 3. Paste the following configuration and name it "default" (or update adAction.js to match your index name):
//  * {
//  *   "mappings": {
//  *     "dynamic": true,
//  *     "fields": {
//  *       "title": { "type": "string" },
//  *       "service": { "type": "string" },
//  *       "description": { "type": "string" },
//  *       "contact": {
//  *         "type": "document",
//  *         "fields": {
//  *           "phone": { "type": "string" },
//  *           "email": { "type": "string" },
//  *           "whatsapp": { "type": "string" },
//  *           "telegram": { "type": "string" },
//  *           "facebook": { "type": "string" },
//  *           "tiktok": { "type": "string" },
//  *           "instagram": { "type": "string" },
//  *           "youtube": { "type": "string" },
//  *           "x": { "type": "string" },
//  *           "wechat": { "type": "string" },
//  *           "line": { "type": "string" },
//  *           "website": { "type": "string" }
//  *         }
//  *       }
//  *     }
//  *   }
//  * }
//  * 4. Save and wait for the index to build.
//  */

// export default AD;