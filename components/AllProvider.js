"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "./ui/sonner";

export default function AllProvider({ children }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
        <Toaster position="top-center" richColors />
      </SessionProvider>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
    </Provider>
  );
}
