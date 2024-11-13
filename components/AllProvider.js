"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleTagManager } from "@next/third-parties/google";

export default function AllProvider({ children }) {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
    </Provider>
  );
}
