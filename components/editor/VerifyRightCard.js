import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds, setPopUp } from "@/redux/features/editor/editorSlice";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import SaveIcon from "@mui/icons-material/Save";

import { createAD, findUserAds } from "@/lib/action/adAction";

export default function VeryRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  //   const youtube = useSelector((state) => state.editor.ad?.youtube);
  //   const [loading, setLoading] = useState(false);
  //   const [newYoutube, setNewYoutube] = useState(youtube);
  //   const [youtubeId, setYoutubeId] = useState("ogfYd705cRs");
  //   const [isSmallScreen, setIsSmallScreen] = useState(false);

  //   useEffect(() => {
  //     const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
  //     const handleResize = () => setIsSmallScreen(mediaQuery.matches);
  //     handleResize(); // Initialize state
  //     mediaQuery.addEventListener("change", handleResize);
  //     return () => mediaQuery.removeEventListener("change", handleResize);
  //   }, []);

  //   const fetchAds = async () => {
  //     try {
  //       const ads = await findUserAds({ user: ad.user }); // Pass only the userId
  //       dispatch(setAds(ads));
  //     } catch (error) {
  //       console.error("Error fetching user ads:", error);
  //     }
  //   };

  //   const toDB = async (adsId, newYoutube_) => {
  //     try {
  //       setLoading(true);
  //       const updateYoutube = await createAD({
  //         ...ad,
  //         adsId,
  //         youtube: newYoutube_,
  //       });
  //       dispatch(setAd(updateYoutube));
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //       if (isSmallScreen) {
  //         dispatch(setPopUp());
  //       }
  //     }
  //   };

  //   const handleSave = () => {
  //     const adsId = ad._id;
  //     const youtube_ = newYoutube;

  //     toDB(adsId, youtube_);
  //     fetchAds();
  //   };

  // Redirect to home page if ad is not found
  //   useEffect(() => {
  //     if (!ad?.user) {
  //       router.push(`/`);
  //     }
  //   }, []);

  return (
    <div className="md:h-screen w-full md:pl-2">
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
          <div className="text-xl md:text-3xl font-semibold">
            {l?.verify_title}
          </div>
        </div>
        {/* <Button
          className="hidden md:flex"
          radius="full"
          size="lg"
          color="primary"
          isLoading={loading}
          onPress={handleSave}
        >
          {`${l?.title_save}`}
        </Button> */}
        {/* <Button
          className="flex md:hidden"
          radius="full"
          size="md"
          color="default"
          variant="flat"
          isLoading={loading}
          onPress={handleSave}
          isIconOnly
        >
          <SaveIcon />
        </Button> */}
      </div>
      <div className=" mt-2 text-default-400 md:flex hidden">
        {l?.verify_top_content}
      </div>
      <div className=" w-full max-w-[1600px]  flex justify-center h-[80vh]">
        {/* <div className=" mt-2 text-default-400 md:flex hidden">
          {l?.verify_title}
        </div> */}
        <div className="w-full max-w-[500px] flex flex-col justify-center items-center ">
          <Card
            className="m-2 mb-4 w-full"
            // isPressable
            //   isPressable={!blockServiceBtn}
            //   isDisabled={blockServiceBtn}
            // onPress={() => {
            //   changeRouter();
            // }}
            //   onPress={changeRouter}
          >
            <CardBody>
              <div className="flex justify-between">
                <div className="flex flex-col justify-center tracking-wider">
                  <div className="text-md leading-10 w-full max-w-[250px]">
                    {l.verify_upload_title}
                  </div>
                  <div className="text-small tracking-wide text-default-400 w-full max-w-[250px]">
                    {l.verify_upload_content}
                  </div>
                </div>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/images/ic.jpeg"
                  width={170}
                  height={170}
                />
              </div>
            </CardBody>
          </Card>
          <Card
            className="m-2 mb-4 w-full"
            // isPressable
            //   isPressable={!blockServiceBtn}
            //   isDisabled={blockServiceBtn}
            // onPress={() => {
            //   changeRouter();
            // }}
            //   onPress={changeRouter}
          >
            <CardBody>
              <div className="flex justify-between">
                <div className="flex flex-col justify-center  w-full max-w-[250px] ">
                  <p className="text-md leading-10 w-full max-w-[250px]">
                    {l?.verify_btn_title}
                  </p>
                  <p className="text-small tracking-wide text-default-400 w-full max-w-[250px]">
                    {l?.verify_btn_content}
                  </p>
                </div>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/images/verify.png"
                  width={170}
                  height={170}
                />
              </div>
            </CardBody>
          </Card>
          <Button
            color="default"
            radius="full"
            variant="light"
            startContent={<HelpOutlineIcon />}
            fullWidth={true}
          >
            {l?.learn_more}
          </Button>
        </div>

        {/* <div className=" h-full flex flex-col justify-center items-center md:p-2 md:pt-10 pb-10">
          <div className="w-full flex justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center ">
         
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
