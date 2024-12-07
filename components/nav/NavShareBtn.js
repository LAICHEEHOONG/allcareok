"use client";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavShareBtn({ share, myService }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const currentLocale = pathname.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);

  const changeRouter = () => {
    if (ads.length === 0) {
      router.push(`/${currentLocale}/overview`);
    } else {
      router.push(`/${currentLocale}/dashboard`);
    }
  };

  return (
    <Button
      className="hidden lg:flex"
      color="default"
      variant="light"
      radius="full"
      size="lg"
      onPress={() => changeRouter()}
    >
      {ads.length === 0 ? share : myService}
    </Button>
  );
}
