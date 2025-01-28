"use client";
import { ScrollShadow, Button } from "@heroui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import PhotoCard from "./PhotoCard";
import TitleCard from "./TitleCard";
import ServiceCard from "./ServiceCard";
import AreaCard from "./AreaCard";
import ContactCard from "./ContactCard";
import DescriptionCard from "./DescriptionCard";
import YoutubeCard from "./YoutubeCard";
import DeleteCard from "./DeleteCard";
import DeleteRightCard from "./DeleteRightCard";
import { useSelector, useDispatch } from "react-redux";
import PhotoRightCard from "./PhotoRightCard";
import { createAD } from "@/lib/action/adAction";
import { useEffect, useRef } from "react";
import {
  setAdsID,
  setAds,
  setAd,
  setFocus,
  setPopUp,
} from "@/redux/features/editor/editorSlice";
import { setDBCountry } from "@/redux/features/auth/authSlice";
import { getUserCountry } from "@/lib/action/userAction";
import { findUserAds } from "@/lib/action/adAction";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import BoostsCard from "./BoostsCard";
import TitleRightCard from "./TitleRightCard";
import ServiceRightCard from "./ServiceRightCard";
import AreaRightCard from "./AreaRightCard";
import ContactRightCard from "./ContactRightCard";
import DescriptionRightCard from "./DescriptionRightCard";
import VerifyCard from "./VerifyCard";
import YoutubeRightCard from "./YoutubeRightCard";
import VeryRightCard from "./VerifyRightCard";
import BoostsRightCard from "./BoostsRightCard";

export default function EditorDesktop() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const adsId = useSelector((state) => state.editor.adsId);
  const user = useSelector((state) => state.auth?._id);
  const isEffectRan = useRef(false);
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  useEffect(() => {
    const dbCountry = async () => {
      try {
        let res = await getUserCountry({ id: user });
        dispatch(setDBCountry(res));
      } catch (error) {
        console.log(error);
      }
    };
  
    // Only call dbCountry if user is not '', undefined, or null
    if (user !== '' && user !== undefined && user !== null) {
      dbCountry();
    }
  }, [user]);

  useEffect(() => {
    if (!isEffectRan.current) {
      isEffectRan.current = true;
      const fetchAds = async () => {
        try {
          const ads = await findUserAds({ user }); // Pass only the userId
          dispatch(setAds(ads));
        } catch (error) {
          console.error("Error fetching user ads:", error);
        }
      };

      const fetchAndCreateAd = async () => {
        if (!adsId) {
          try {
            const createAD_ = await createAD({ user });
            dispatch(setAd(createAD_));
            dispatch(setAdsID(createAD_._id));
            await fetchAds();
          } catch (error) {
            console.error("Failed to create ad:", error);
            router.push(`/${currentLocale}`);
          }
        }
      };

      fetchAndCreateAd();
      if (cardFocus !== "photo") {
        dispatch(setFocus("photo"));
      }
    }
  }, []);

  return (
    <div className="flex h-screen m-3 md:justify-start justify-center  w-full max-w-[2000px]">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-[330px]">
        <div className="flex flex-col ">
          <div className="flex">
            <Button
              isIconOnly
              radius="full"
              color="default"
              variant="flat"
              aria-label="Back button"
              onPress={() => {
                router.push(`/${currentLocale}/dashboard`);
              }}
            >
              <ArrowBackIcon />
            </Button>
            <div className="text-3xl font-semibold ml-5 mb-3 ">
              {l?.listing}
            </div>
          </div>
          <div>
            <ScrollShadow className="h-[90vh] pr-1" hideScrollBar={true}>
              <PhotoCard />
              <TitleCard />
              <ServiceCard />
              <AreaCard />
              <ContactCard />
              <DescriptionCard />

              {/* <MapCard /> */}
              <YoutubeCard />
              <VerifyCard />
              <BoostsCard />
              <DeleteCard />
            </ScrollShadow>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full max-w-[1600px] hidden md:flex items-center justify-center">
        {/* <p className="text-white text-2xl">Right 50%</p> */}
        {cardFocus === "photo" && <PhotoRightCard />}
        {cardFocus === "delete" && <DeleteRightCard />}
        {cardFocus === "title" && <TitleRightCard />}
        {cardFocus === "service" && <ServiceRightCard />}
        {cardFocus === "area" && <AreaRightCard />}
        {cardFocus === "contact" && <ContactRightCard />}
        {cardFocus === "description" && <DescriptionRightCard />}
        {cardFocus === "youtube" && <YoutubeRightCard />}
        {cardFocus === "verify" && <VeryRightCard />}
        {cardFocus === "boosts" && <BoostsRightCard />}
      </div>
      {/* Right Mobile */}
      <DrawerEditor cardFocus={cardFocus} />
    </div>
  );
}

function DrawerEditor({ cardFocus }) {
  const popUp = useSelector((state) => state.editor.popUp);
  const dispatch = useDispatch();
  return (
    <Drawer open={popUp} onOpenChange={() => dispatch(setPopUp())}>
      {/* <DrawerTrigger asChild>{children}</DrawerTrigger> */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-2 ">
          <DrawerHeader className="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription>
              {/* Upload your service poster with contact info, service details, and
              coverage area. Include real case photos to assist customers. */}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            {cardFocus === "title" && <TitleRightCard />}
            {cardFocus === "service" && <ServiceRightCard />}
            {cardFocus === "youtube" && <YoutubeRightCard />}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
