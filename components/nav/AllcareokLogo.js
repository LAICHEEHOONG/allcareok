"use client";
import { Image } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

export default function AllcareokLogo({ isDashboard }) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";

  return (
    <div
      className="cursor-pointer flex justify-center items-center"
      onClick={() => router.push(`/${currentLocale}`)} // Redirect to the current locale
    >
      <Image
        className="min-w-[37px] "
        width={37}
        radius="full"
        alt="Allcareok logo"
        src="/images/allcareok_logo.png"
        
      />

      <p
        className={`font-bold text-inherit ml-2 text-2xl ${
          isDashboard ? "" : "hidden md:flex"
        } `}
        style={{ color: "#f31260" }}
      >
        allcareok
      </p>
    </div>
  );
}
