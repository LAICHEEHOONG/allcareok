import { Input, Button, ScrollShadow } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { setAd, setAds, setPopUp } from "@/redux/features/editor/editorSlice";
import { createAD, findUserAds } from "@/lib/action/adAction";

export default function TitleRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const [title_, setTitle_] = useState(ad?.title);
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize(); // Initialize state
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setTitle_(inputValue);
  };

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, newTitle) => {
    try {
      setLoading(true);
      const updateTitle = await createAD({ ...ad, adsId, title: newTitle });
      dispatch(setAd(updateTitle));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      if (isSmallScreen) {
        dispatch(setPopUp());
      }
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    toDB(adsId, title_);
    fetchAds();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <Input
        isRequired
        labelPlacement="outside"
        className="max-w-md"
        defaultValue={title_}
        label={l?.title_right_label}
        type="text"
        radius="full"
        fullWidth
        size="lg"
        onChange={handleChange}
        color={title_?.length > 50 ? "danger" : "default"}
      />
      <div className="text-default-400 text-xs mt-5 mb-5 select-none">
        {title_?.length <= 50 &&
          `${50 - title_.length} ${l?.character_available}`}
        {title_?.length > 50 && (
          <div className="flex gap-1 items-center text-red-600">
            <ErrorIcon sx={{ fontSize: "1rem" }} />
            <div> {`${title_?.length - 50} ${l?.over_limit}`} </div>
          </div>
        )}
      </div>

      <ScrollShadow
        className="max-h-32 md:max-h-48 max-w-80 md:max-w-2xl text-4xl md:text-5xl text-center"
        hideScrollBar={true}
      >
        <div className="select-none font-semibold text-ellipsis overflow-hidden">
          {title_}
        </div>
      </ScrollShadow>

      <div className=" w-full flex pt-5 mb-10 justify-center items-center">
        <Button
          radius="full"
          size="lg"
          color="primary"
          isDisabled={title_?.length <= 50 && title_?.length > 0 ? false : true}
          isLoading={loading}
          onPress={handleSave}
        >
          {`${l?.title_save}`}
        </Button>
      </div>
    </div>
  );
}
