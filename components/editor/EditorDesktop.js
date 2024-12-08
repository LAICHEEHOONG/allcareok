"use client";
import { ScrollShadow, Button } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import PhotoCard from "./PhotoCard";
import TitleCard from "./TitleCard";
import ServiceCard from "./ServiceCard";
import AreaCard from "./AreaCard";
import ContactCard from "./ContactCard";
import DescriptionCard from "./DescriptionCard";
import MapCard from "./MapCard";
import YoutubeCard from "./YoutubeCard";
import { useSelector, useDispatch } from "react-redux";
import PhotoRightCard from "./PhotoRightCard";
import { createAD } from "@/lib/action/adAction";
import { useEffect, useRef } from "react";
import { setAdsID, setAds } from "@/redux/features/editor/editorSlice";
import { findUserAds } from "@/lib/action/adAction";

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
            dispatch(setAdsID(createAD_._id));
            await fetchAds();
          } catch (error) {
            console.error("Failed to create ad:", error);
            router.push(`/${currentLocale}`);
          }
        }
      };

      fetchAndCreateAd();
    }
  }, []);

  return (
    <div className="flex h-screen m-3">
      {/* Left Section */}
      <div className="w-[350x] flex flex-col">
        <div className="flex flex-col">
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
            <div className="text-3xl font-semibold ml-5 mb-3">{l?.listing}</div>
          </div>
          <div>
            <ScrollShadow className="h-[85vh]" hideScrollBar={false}>
              <PhotoCard />
              <TitleCard />
              <ServiceCard />
              <AreaCard />
              <ContactCard />
              <DescriptionCard />
              <MapCard />
              <YoutubeCard />
            </ScrollShadow>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full flex items-center justify-center">
        {/* <p className="text-white text-2xl">Right 50%</p> */}
        {cardFocus === "photo" && <PhotoRightCard />}
      </div>
    </div>
  );
}
