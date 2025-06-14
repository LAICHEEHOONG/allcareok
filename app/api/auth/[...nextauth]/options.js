import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
    brandColor: "",
    logo: "/images/allcareok_logo_horizotal_sphere.png",
    buttonText: "",
  },
};
