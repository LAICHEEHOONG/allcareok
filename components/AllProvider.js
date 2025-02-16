"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { HeroUIProvider } from "@heroui/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "./ui/sonner";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllProvider({ children }) {
  // Method 1: Using usePathname hook (recommended)
  const pathname = usePathname();
  const [adNavSize, setAdNavSize] = useState(false);

  // Method 2: Get search params

  useEffect(() => {
    // console.log("pathname", pathname);
    // console.log("searchParams", searchParams);
    if (pathname.includes("/ad/")) {
      setAdNavSize(true);
    } else {
      setAdNavSize(false);
    }
    // console.log(pathname.includes('/ad/'))
  }, [pathname.includes("/ad/")]);

  return (
    <Provider store={store}>
      <SessionProvider>
        <HeroUIProvider>
          <div className="w-full flex justify-center">
            <div className={`w-full ${adNavSize && "max-w-[1120px] "}`}>
              {children}
            </div>
          </div>
        </HeroUIProvider>
        <Toaster position="top-center" />
      </SessionProvider>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
    </Provider>
  );
}
