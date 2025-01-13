import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setPopUp } from "@/redux/features/editor/editorSlice";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function YoutubeCard() {
  const dispatch = useDispatch();
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const youtube = useSelector((state) => state.editor.ad?.youtube);
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
    dispatch(setFocus("youtube"));
    if (isSmallScreen) {
      dispatch(setPopUp());
    }
    // if (isSmallScreen) {
    //   router.push(`/${currentLocale}/editor/mobile/youtube`);
    // }
    // Add other logic if needed
  };


  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "youtube" ? "md:border-2 md:border-black" : ""
      } `}
      isPressable
      onPress={handlePress}
      // onPress={() => {
      //   dispatch(setFocus("youtube"));
      // }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2 ">
          <div className="font-medium mb-2">YouTube</div>
          <div className="flex gap-3 text-default-400 ">
            <YouTubeIcon className={`w-6 h-6`} />
            <div className="truncate">
              {youtube ? youtube : l?.youtube_add_title}
            </div>
          </div>

          {/* {servicesItems.map(({ label, icon: Icon }, id) => (
            <div key={id} className="flex gap-3 text-default-400 ">
              <Icon className={`w-6 h-6 ${label}`} />
              <div className="truncate">{label}</div>
            </div>
          ))} */}
        </div>
      </CardBody>
    </Card>
  );
}
