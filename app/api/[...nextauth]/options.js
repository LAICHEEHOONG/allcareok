// import GoogleProvider from "next-auth/providers/google";

// export const options = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   theme: {
//     colorScheme: "light", // "auto" | "dark" | "light"
//     brandColor: "", // Hex color code
//     logo: "/signin_logo.jpeg", // Absolute URL to image
//     buttonText: "", // Hex color code
//   },
  
// };

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
    logo: "/signin_logo.jpeg",
    buttonText: "",
  },
};
