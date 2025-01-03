"use server";
import AD from "@/models/ad";
import User from "@/models/user";
import dbConnect from "../dbConnect";

export async function deleteAd(request) {
  const { userId, role, adId } = request;
  console.log(userId, role, adId )
  await dbConnect();

  try {
    // Find the ad by ID
    const ad = await AD.findById(adId).exec();

    if (!ad) {
      throw new Error("Ad not found");
    }

    // Check user role and ownership
    if (role === "user") {
      if (ad.user.toString() !== userId) {
        throw new Error("Permission denied: You can only delete your own ads");
      }
    } else if (role !== "admin") {
      throw new Error("Permission denied: Invalid role");
    }

    // Delete the ad
    await AD.findByIdAndDelete(adId);
    return { success: true, message: "Ad deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

export async function findUserAds(request) {
  const { user } = request;
  // console.log(user)
  await dbConnect();

  try {
    const ads = await AD.find({ user }).exec();
    return JSON.parse(JSON.stringify(ads));
  } catch (error) {
    console.log(error);
    throw new Error("Error processing the request");
  }
}

// create and update
export async function createAD(request) {
  const { adsId, user, photo, title, service, area, contact, description, youtube } =
    request;

  await dbConnect();

  try {
    if (adsId) {
      // If an ID is provided, update the ad
      const updatedAD = await AD.findByIdAndUpdate(
        adsId,
        { user, photo, title, service, area, contact, description, youtube },
        { new: true, runValidators: true } // Return the updated document and validate the inputs
      );
      return JSON.parse(JSON.stringify(updatedAD));
    } else {
      // Otherwise, create a new ad
      const adData = new AD({
        user,
        photo,
        title,
        service,
        area,
        contact,
        description,
        youtube,
      });
      const createdAD = await adData.save();
      return JSON.parse(JSON.stringify(createdAD));
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error processing the request");
  }
}
