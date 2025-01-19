"use server";
import dbConnect from "../dbConnect";
import User from "@/models/user";
import axios from "axios";

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
