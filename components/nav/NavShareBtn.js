"use client";
import { Button } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import { Fade } from "react-awesome-reveal";

export default function NavShareBtn({ share, myService }) {
  const session = useSelector((state) => state.auth.session);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const currentLocale = pathname.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);
  const blockServiceBtn = useSelector((state) => state.editor.blockServiceBtn);

  const changeRouter = () => {
    if (!session) {
      signIn();
      return;
    }

    if (ads.length === 0) {
      router.push(`/${currentLocale}/overview`);
    } else {
      router.push(`/${currentLocale}/dashboard`);
    }
  };

  return (
    <Fade delay={5000}>
      <Button
        className="hidden lg:flex"
        color="default"
        variant="light"
        radius="full"
        size="lg"
        onPress={changeRouter}
        isDisabled={blockServiceBtn}
      >
        {ads.length === 0 ? share : myService}
      </Button>
    </Fade>
  );
}
