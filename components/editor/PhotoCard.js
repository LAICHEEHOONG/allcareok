import { Card, CardBody, Image } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setPopUp } from "@/redux/features/editor/editorSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PhotoCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const photo = useSelector((state) => state.editor.ad.photo);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize(); // Initialize state
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handlePress = () => {
    dispatch(setFocus("photo"));
    if (isSmallScreen) {
      router.push(`/${currentLocale}/editor/mobile/photo`);
    }
    // Add other logic if needed
  };

  return (
    <Card
      className={` m-5 p-1 w-11/12 ${
        cardFocus === "photo" ? "md:border-solid md:border-2 md:border-black" : ""
      } `}
      isPressable
      onPress={handlePress}
    >
      <CardBody className="">
        <div className="flex flex-col justify-center items-center">
          <div className="font-medium self-start">{l?.photo_upload}</div>
          <div className="text-small tracking-tight text-default-400 self-start">
            {/* 8 photos */}
            {`${photo ? photo.length : "0"} photos`}
          </div>

          <Image
            className="flex justify-center items-center mt-4 md:max-w-[270px]"
            // width={350}
            width={500}
            alt="photos upload poster"
            src="/images/childcare.jpeg"
          />
        </div>
      </CardBody>
    </Card>
  );
}
