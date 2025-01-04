import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds, setPopUp } from "@/redux/features/editor/editorSlice";
import YouTubeIcon from "@mui/icons-material/YouTube";

import SaveIcon from "@mui/icons-material/Save";

import { createAD, findUserAds } from "@/lib/action/adAction";

export default function YoutubeRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const youtube = useSelector((state) => state.editor.ad?.youtube);
  const [loading, setLoading] = useState(false);
  const [newYoutube, setNewYoutube] = useState(youtube);
  const [youtubeId, setYoutubeId] = useState("ogfYd705cRs");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize(); // Initialize state
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const extractVideoId = (url) => {
    if (typeof url !== "string" || !url.trim()) {
      return ""; // Return an empty string if the URL is invalid
    }

    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, newYoutube_) => {
    try {
      setLoading(true);
      const updateYoutube = await createAD({
        ...ad,
        adsId,
        youtube: newYoutube_,
      });
      dispatch(setAd(updateYoutube));
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
    const youtube_ = newYoutube;

    toDB(adsId, youtube_);
    fetchAds();
  };

  useEffect(() => {
    setYoutubeId(extractVideoId(newYoutube));
    // setYoutubeId(newYoutube);
  }, [newYoutube]);

  // Redirect to home page if ad is not found
  useEffect(() => {
    if (!ad?.user) {
      router.push(`/`);
    }
  }, []);

  return (
    <div className="md:h-screen w-full md:pl-2">
      <div className="flex justify-between items-start mb-2 max-w-[1600px]">
        <div className="flex justify-center items-center gap-3">
          {/* <Button
            className="md:hidden flex"
            isIconOnly
            radius="full"
            color="default"
            variant="flat"
            aria-label="Back button"
            onPress={() => {
              router.push(`/${currentLocale}/editor`);
            }}
          >
            <ArrowBackIcon />
          </Button> */}
          <div className="text-xl md:text-3xl font-semibold">{"Youtube"}</div>
        </div>
        <Button
          className="hidden md:flex"
          radius="full"
          size="lg"
          color="primary"
          isLoading={loading}
          //   isDisabled={
          //     newDescription?.length <= textLimit && newDescription?.length > 0
          //       ? false
          //       : true
          //   }
          onPress={handleSave}
        >
          {`${l?.title_save}`}
        </Button>
        <Button
          className="flex md:hidden"
          radius="full"
          size="md"
          color="default"
          variant="flat"
          //   isDisabled={
          //     newDescription?.length <= textLimit && newDescription?.length > 0
          //       ? false
          //       : true
          //   }
          isLoading={loading}
          onPress={handleSave}
          isIconOnly
        >
          <SaveIcon />
        </Button>
      </div>
      <div
        className=" w-full max-w-[1600px]"
        // hideScrollBar={true}
      >
        <div className=" mt-2 text-default-400 md:flex hidden">
          {l?.youtube_description}
        </div>
        <div className=" h-full flex flex-col justify-center items-center md:p-2 md:pt-10 pb-10">
          <div className="w-full flex justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center ">
              <Input
                isClearable
                className="max-w-96 mb-6"
                placeholder={"Youtube link"}
                variant="bordered"
                size="lg"
                radius="full"
                defaultValue={newYoutube} // Use ref for value
                onValueChange={(youtubeUrl) => {
                  // const videoId = extractVideoId(youtubeUrl);
                  // setNewYoutube(videoId);
                  setNewYoutube(youtubeUrl);
                }}
                //   onValueChange={(youtubeUrl) => setNewYoutube(youtubeUrl)}
                onClear={() => setNewYoutube("")}
                startContent={
                  <YouTubeIcon className="text-xl text-default-400" />
                }
              />

              <div className="w-full max-w-[1200px]">
                <div className="relative overflow-hidden rounded-lg w-full aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    // src={`https://www.youtube.com/embed/${
                    //   newYoutube ? newYoutube : "ogfYd705cRs"
                    // }`}
                    src={`https://www.youtube.com/embed/${
                      youtubeId ? youtubeId : "ogfYd705cRs"
                    }`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
