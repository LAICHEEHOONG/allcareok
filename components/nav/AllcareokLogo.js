"use client";
import { Image } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { Fade } from "react-awesome-reveal";

export default function AllcareokLogo({ isDashboard }) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";

  return (
    <div
      className="cursor-pointer flex justify-start items-center "
      onClick={() => router.push(`/${currentLocale}`)} // Redirect to the current locale
    >
      <Image
        className={`min-w-[37px] ${isDashboard ? "" : "hidden sm:flex"} `}
        width={37}
        alt="Allcareok logo"
        src="/images/apple-icon-160.png"
      />

      <Fade triggerOnce>
        <p
          className={`font-bold text-inherit ml-2 text-2xl ${
            isDashboard ? "" : "hidden md:flex"
          } `}
          style={{ color: "#f31260" }}
        >
          allcareok
        </p>
      </Fade>
    </div>
  );
}
