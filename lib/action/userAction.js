"use server";
import dbConnect from "../dbConnect";
import User from "@/models/user";
import axios from "axios";


export async function getUserById(request) {
  const { userId } = request;

  await dbConnect();

  try {
    const user = await User.findById(userId).select("name email image role createdAt -_id");

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    console.error(`Error retrieving user data for ID ${userId}:`, error.message);
    return { success: false, message: error.message };
  }
}

export async function updateUserWishlist(request) {
  const { userId, adId } = request;

  await dbConnect();

  try {
    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return { success: false, message: "User not found" };
    }

    // Check if the adId already exists in the wishlist
    const index = user.wishlist.indexOf(adId);
    if (index === -1) {
      // If not found, add to wishlist
      user.wishlist.push(adId);
    } else {
      // If found, remove from wishlist
      user.wishlist.splice(index, 1);
    }

    await user.save();
    console.log(user);
    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    console.log(`Error updating wishlist for user ${userId}:`, error.message);
    return { success: false, message: error.message };
  }
}

export async function adminKey(request) {
  const { _id } = request;

  await dbConnect();
  try {
    const user = await User.findById(_id);
    if (
      user.email === process.env.ADMIN_EMAIL &&
      user.secret === process.env.ADMIN_SECRET &&
      user.role === "admin"
    ) {
      return { pass: true };
    } else {
      return { pass: false };
    }
  } catch (error) {
    console.error(`Error retrieving admin data`, error.message);
    throw error;
  }
}

export async function getUserCountry(request) {
  const { id } = request;
  await dbConnect();

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user.country || null; // Return the country or null if it doesn't exist
  } catch (error) {
    console.error(`Error retrieving country for user ${id}:`, error.message);
    throw error;
  }
}

export async function updateUserCountry(request) {
  const { id, country } = request;
  await dbConnect();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, // The user ID to match
      { country }, // The field to update
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error(`Error updating country for user ${id}:`, error.message);
    throw error;
  }
}

export async function signUp(request) {
  const { name, email, image } = request;

  await dbConnect();

  let user;
  try {
    user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, image });
      await user.save();
    } else if (user.name !== name || user.image !== image) {
      user.name = name;
      user.image = image;
      await user.save();
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error accessing user data:", error);
    return error;
  }
}

export async function updateUserLanguage(request) {
  const { id, locale } = request;
  await dbConnect();

  try {
    // Validate newLanguage if needed (e.g., ensure it's a valid language code)
    const updatedUser = await User.findByIdAndUpdate(
      id, // The user ID to match
      { language: locale }, // The fields to update
      { new: true } // Return the updated document and apply schema validators
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error(`Error updating language for user ${userId}:`, error.message);
    throw error;
  }
}

export async function getCountryFromIP() {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    // console.log(response)
    return response.data.country_name;
  } catch (error) {
    console.error("Error getting country from IP:", error);
    return null;
  }
}
