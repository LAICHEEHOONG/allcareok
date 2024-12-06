"use server";
import AD from "@/models/ad";
import User from "@/models/user";
import dbConnect from "../dbConnect";

export async function createAD(request) {
  console.log(request);
  const { user, photo, title, service, area, contact, description } = request;

  await dbConnect();

  try {
    let adData = new AD({
      user,
      photo,
      title,
      service,
      area,
      contact,
      description,
    });
    const createAD = await adData.save();
    return JSON.parse(JSON.stringify(createAD));
  } catch (error) {
    console.log(error);
  }
}

// Query all ads with user details
// const adsWithUser = await AD.find().populate("user", "name email"); // Only include name and email in the result

// console.log(adsWithUser);

// Query a user with their ads
// const userWithAds = await User.findById(userId).populate("ads");

// console.log(userWithAds);
