"use client";
import { Button } from "@heroui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";

export default function Support() {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  return (
    <div className="w-full flex justify-center h-screen ">
      <div className="w-full max-w-[2300px] p-2 pt-2 sm:p-10 sm:pt-2 x1440l:p-20 x1440l:pt-2 ">
        <div className="w-full h-fit flex flex-col ">
          <div className="w-full">
            <Button
              className="self-start"
              isIconOnly
              aria-label="back to home page button"
              radius="full"
              color="default"
              variant="flat"
              onPress={() => {
                router.push(`/${currentLocale}`);
              }}
            >
              <ArrowBackIcon />
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center text-center w-full h-[70vh] p-2">
            <div className="text-5xl font-semibold tracking-wider p-2 ">
              Get Support
            </div>
            <div className="text-lg tracking-wide p-2 w-full max-w-[800px] ">
              We are here to assist you during our business hours. Please feel
              free to contact us for any questions or issues you may have.
            </div>
            <Button
              className="m-2"
              radius="full"
              color="danger"
              size="lg"
              onPress={() => {
                window.location.href = "mailto:allcareok@gmail.com";
                console.log("mail");
              }}
            >
              allcareok@gmail.com
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
