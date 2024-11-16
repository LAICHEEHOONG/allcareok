"use client";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AllcareokLogo() {
  const router = useRouter();
  return (
    <div className="cursor-pointer flex justify-center items-center" onClick={() => router.push("/")}>
      <Image
        className="min-w-[37px] "
        width={37}
        radius="none"
        alt="Allcareok logo"
        src="/images/allcareok_logo.png"
      />
      <p
        className="font-bold text-inherit ml-2 text-2xl hidden sm:flex"
        style={{ color: "#f31260" }}
      >
        allcareok
      </p>
    </div>
  );
}
