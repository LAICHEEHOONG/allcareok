import { Card, CardBody } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const reviewStatus = useSelector((state) => state.editor?.ad?.reviewStatus);
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
    dispatch(setFocus("verify"));
    if (isSmallScreen) {
      router.push(`/${currentLocale}/editor/mobile/verify`);
    }
    // Add other logic if needed
  };

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "verify" ? " md:border-2 md:border-black" : ""
      }`}
      isPressable
      onPress={handlePress}
      // onPress={() => {
      //   dispatch(setFocus("verify"));
      // }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.verify_title}</div>
          <div className="text-base text-default-400  ">
            {reviewStatus === "Payment Pending" && l?.verify_pending}
            {reviewStatus === "Under Review" && l?.verify_review}
            {reviewStatus === "Approved" && l?.verify_approved}
            {reviewStatus === "Rejected" && l?.verify_rejected}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
