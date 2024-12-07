"use server";
import AD from "@/models/ad";
import User from "@/models/user";
import dbConnect from "../dbConnect";

// export async function createAD(request) {
//   const { user, photo, title, service, area, contact, description } = request;

//   await dbConnect();

//   try {
//     let adData = new AD({
//       user,
//       photo,
//       title,
//       service,
//       area,
//       contact,
//       description,
//     });
//     const createAD_ = await adData.save();
//     return JSON.parse(JSON.stringify(createAD_));
//   } catch (error) {
//     console.log(error);
//   }
// }

// Query all ads with user details
// const adsWithUser = await AD.find().populate("user", "name email"); // Only include name and email in the result

// console.log(adsWithUser);

// Query a user with their ads
// const userWithAds = await User.findById(userId).populate("ads");

// console.log(userWithAds);

export async function createAD(request) {
  const { adsId, user, photo, title, service, area, contact, description } =
    request;

  await dbConnect();

  try {
    if (adsId) {
      // If an ID is provided, update the ad
      const updatedAD = await AD.findByIdAndUpdate(
        adsId,
        { user, photo, title, service, area, contact, description },
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
      });
      const createdAD = await adData.save();
      return JSON.parse(JSON.stringify(createdAD));
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error processing the request");
  }
}
