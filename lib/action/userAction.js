
'use server'
import dbConnect from "../dbConnect";
import User from "@/models/user";

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