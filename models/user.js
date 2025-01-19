import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    language: {
      type: String,
      default: "en",
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Define a virtual field for ads
userSchema.virtual("ads", {
  ref: "AD", // Reference the AD model
  localField: "_id", // User's `_id`
  foreignField: "user", // The `user` field in the `adSchema`
});

// Enable virtuals in JSON and object outputs
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

// Create the User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
