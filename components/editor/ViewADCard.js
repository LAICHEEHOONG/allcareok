import { Card, CardBody } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setPopUp } from "@/redux/features/editor/editorSlice";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ViewADCard({ adsId }) {
  const dispatch = useDispatch();
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const router = useRouter();
  const language = useSelector((state) => state.auth?.language);
  //   const view = useSelector((state) => state.editor.ad?.view);
  // const router = useRouter();
  //   const [isSmallScreen, setIsSmallScreen] = useState(false);
  //   const pathName = usePathname();
  // const currentLocale = pathName.split("/")[1] || "en";

  //   useEffect(() => {
  //     const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
  //     const handleResize = () => setIsSmallScreen(mediaQuery.matches);
  //     handleResize(); // Initialize state
  //     mediaQuery.addEventListener("change", handleResize);
  //     return () => mediaQuery.removeEventListener("change", handleResize);
  //   }, []);

  const handlePress = () => {
    dispatch(setFocus("view"));
    router.push(`/${language ? language : "en"}/ad/${adsId}`);
    dispatch(setFocus("photo"));

    // if (isSmallScreen) {
    //   dispatch(setPopUp());
    // }
    // if (isSmallScreen) {
    //   router.push(`/${currentLocale}/editor/mobile/youtube`);
    // }
    // Add other logic if needed
  };

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "view" ? "md:border-2 md:border-black" : ""
      } `}
      isPressable
      onPress={handlePress}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2 ">
          <div className="font-medium mb-2">{l?.view_ad?.title}</div>
          {/* <VisibilityIcon className={`w-6 h-6`} /> */}
          <div className="flex gap-3 text-default-400 ">
            
            <div className="">
              {l?.view_ad?.content}
              {/* {view ? view : l?.view_title} */}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
