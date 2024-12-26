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
    title: { type: String, default: "Your service title" },
    service: [{ type: String }],
    area: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      town: { type: String },
    },
    contact: [{ type: String }],
    description: { type: String },
    map: { type: String },
    youtube: [{ type: String }],
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
