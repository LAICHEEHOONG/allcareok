"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { HeroUIProvider } from "@heroui/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "./ui/sonner";

export default function AllProvider({ children }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
        <Toaster position="top-center"  />
      </SessionProvider>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
    </Provider>
  );
}
