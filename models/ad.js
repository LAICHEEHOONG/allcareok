// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const photoSchema = new Schema({
//   url: { type: String },
//   publicId: { type: String },
// });

// const adSchema = new mongoose.Schema(
//   {
//     photo: [photoSchema],
//     title: { type: String },
//     service: [{ type: String }],
//     area: [{ type: String }],
//     contact: [{ type: String }],
//     description: { type: String },
//     map: { type: String },
//     youtube: [{ type: String }],
//   },
//   {
//     timestamps: true,
//   }
// );

// // Add indexes for faster queries
// // adSchema.index({ title: "text", areas: 1, services: 1 });


// const AD = mongoose.models.AD || mongoose.model("AD", adSchema);

// export default AD;

import mongoose from "mongoose";
const { Schema } = mongoose;

const photoSchema = new Schema({
  url: { type: String },
  publicId: { type: String },
});

const adSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
      required: true, // Ensure every ad is linked to a user
    },
    photo: [photoSchema],
    title: { type: String },
    service: [{ type: String }],
    area: [{ type: String }],
    contact: [{ type: String }],
    description: { type: String },
    map: { type: String },
    youtube: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Add indexes for faster queries
// adSchema.index({ title: "text", areas: 1, services: 1 });

const AD = mongoose.models.AD || mongoose.model("AD", adSchema);

export default AD;
