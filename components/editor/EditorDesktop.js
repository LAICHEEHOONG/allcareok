"use client";
import { ScrollShadow, Button } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import PhotoCard from "./PhotoCard";
import TitleCard from "./TitleCard";
import ServiceCard from "./ServiceCard";
import AreaCard from "./AreaCard";
import ContactCard from "./ContactCard";
import DescriptionCard from "./DescriptionCard";
import MapCard from "./MapCard";
import YoutubeCard from "./YoutubeCard";
import { useSelector } from "react-redux";
import PhotoRightCard from "./PhotoRightCard";

export default function EditorDesktop() {
  const router = useRouter();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector(state => state.auth?.lang?.listing_editor_card)

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
              aria-label="Like"
              onPress={() => {
                router.push("/");
              }}
            >
              <ArrowBackIcon />
            </Button>
            <div className="text-3xl font-semibold ml-5 mb-3">
              {/* Listing editor */}
              {l?.listing}
            </div>
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
        {
          cardFocus === 'photo' && <PhotoRightCard />
        }
      </div>
    </div>
  );
}
