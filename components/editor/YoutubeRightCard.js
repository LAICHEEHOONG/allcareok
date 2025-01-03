import { useState, useEffect } from "react";
import { Button, ScrollShadow, Input } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import ErrorIcon from "@mui/icons-material/Error";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { YouTubeEmbed } from "@next/third-parties/google";

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
  const [newYoutube, setNewYoutube] = useState(youtube || "");

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : "";
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
      // if (isSmallScreen) {
      //   dispatch(setPopUp());
      // }
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    const youtube = newYoutube;

    toDB(adsId, youtube);
    fetchAds();
  };

  //   const textLimit = 1500;

  // Redirect to home page if ad is not found
  useEffect(() => {
    if (!ad?.user) {
      router.push(`/`);
    }
  }, []);

  useEffect(() => {
    console.log("newYoutube", newYoutube);
  }, [newYoutube]);

  return (
    <div className="h-screen w-full md:pl-2">
      <div className="flex justify-between items-start mb-2 max-w-[1600px]">
        <div className="flex justify-center items-center gap-3">
          <Button
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
          </Button>
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
      <ScrollShadow className="h-[92vh]" hideScrollBar={true}>
        <div className="mb-12 mt-2 text-default-400 md:flex hidden">
          {l?.youtube_description}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-2xl flex flex-col justify-center items-center">
            <Input
              isClearable
              className="max-w-96 m-2 mb-6"
              placeholder={"Youtube link"}
              variant="bordered"
              size="lg"
              radius="full"
              defaultValue={newYoutube} // Use ref for value
              onValueChange={(youtubeUrl) => {
                const videoId = extractVideoId(youtubeUrl);
                setNewYoutube(videoId);
              }}
              //   onValueChange={(youtubeUrl) => setNewYoutube(youtubeUrl)}
              onClear={() => setNewYoutube("")}
              startContent={
                <YouTubeIcon className="text-xl text-default-400" />
              }
            />

            <div className="w-full max-w-4xl">
              <div className="relative overflow-hidden rounded-lg w-full aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${
                    newYoutube ? newYoutube : "ogfYd705cRs"
                  }`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* {newYoutube ? (
            <div className="relative overflow-hidden rounded-lg w-full aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${newYoutube ? newYoutube : "ogfYd705cRs"}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="w-full text-center text-gray-500">
              Enter a valid YouTube URL to preview the video.
            </div>
          )} */}
            </div>
            {/* <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${newYoutube ? newYoutube : "ogfYd705cRs"}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                // style={{
                //   position: "absolute",
                //   top: 0,
                //   left: 0,
                //   width: "100%",
                //   height: "100%",
                // }}
              ></iframe>
            </div> */}

            {/* <YouTubeEmbed
              videoid={newYoutube ? newYoutube : "ogfYd705cRs"}
              height={400}
              params="controls=0"
            /> */}
            {/* <div className="w-full flex justify-center items-center border-2">
              <YouTubeEmbed
                className="rounded"
                videoid={newYoutube ? newYoutube : "ogfYd705cRs"} // Dynamically set video ID
                height={400} // Use auto for responsive height
                params="controls=0"
                width={600}
                style={{
                    width: "100%", // Full width of the container
                    aspectRatio: "16/9", // Maintain 16:9 aspect ratio
                    borderRadius: "16px", // Rounded corners
                    overflow: "hidden", // Ensure content doesn’t spill
                  }}
              />
            </div> */}

            {/* <div className="text-default-400 text-xs mt-5 mb-1 pl-4 select-none self-start">
              {newDescription?.length <= textLimit &&
                `${textLimit - newDescription?.length} ${
                  l?.character_available
                }`}
              {newDescription?.length > textLimit && (
                <div className="flex gap-1 items-center text-red-600">
                  <ErrorIcon sx={{ fontSize: "1rem" }} />
                  <div>
                    {" "}
                    {`${newDescription?.length - textLimit} ${l?.over_limit}`}
                  </div>
                </div>
              )}
            </div> */}
            {/* <Textarea
              // className="max-w-2xl h-[50vh]"
              classNames={{
                base: "max-w-2xl",
                input: "resize-y min-h-[64vh]",
              }}
              // label="Description"
              placeholder={l?.description_placeholder}
              variant="bordered"
              defaultValue={description}
              onValueChange={(v) => setNewDescription(v)}
            /> */}
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}
