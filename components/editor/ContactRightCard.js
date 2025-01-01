import { useState, useEffect, useRef } from "react";
import { Button, ScrollShadow, Input } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";

import Masonry from "react-masonry-css";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { IoLogoWechat } from "react-icons/io5";
import { FaLine } from "react-icons/fa6";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FaTiktok } from "react-icons/fa";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PublicIcon from "@mui/icons-material/Public";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { createAD, findUserAds } from "@/lib/action/adAction";

export default function ContactRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const contact = useSelector((state) => state.editor.ad?.contact);
  const [loading, setLoading] = useState(false);

  const contactRef = useRef({ ...contact }); // Use a ref for contact data

  const handleInputChange = (key, value) => {
    contactRef.current[key] = value; // Update the ref value
  };

  const servicesItems = [
    {
      name: "phone",
      label: "+60 12-345 6789", // Example Malaysian phone number
      icon: CallIcon,
      value: contact?.phone,
    },
    {
      name: "whatsapp",
      label: "https://wa.me/60123456789", // Example WhatsApp link
      icon: WhatsAppIcon,
      value: contact?.whatsapp,
    },
    {
      name: "telegram",
      label: "@JohnDoe123", // Example Telegram username
      icon: TelegramIcon,
      value: contact?.telegram,
    },
    {
      name: "email",
      label: "johndoe@example.com", // Example email address
      icon: AlternateEmailIcon,
      value: contact?.email,
    },
    {
      name: "facebook",
      label: "facebook.com/JohnDoe", // Example Facebook profile
      icon: FacebookIcon,
      value: contact?.facebook,
    },
    {
      name: "tiktok",
      label: "tiktok.com/@JohnDoe", // Example TikTok username
      icon: FaTiktok,
      value: contact?.tiktok,
    },
    {
      name: "instagram",
      label: "instagram.com/JohnDoe", // Example Instagram profile
      icon: InstagramIcon,
      value: contact?.instagram,
    },
    {
      name: "youtube",
      label: "youtube.com/c/JohnDoeChannel", // Example YouTube channel
      icon: YouTubeIcon,
      value: contact?.youtube,
    },
    {
      name: "x",
      label: "x.com/JohnDoe", // Example X (Twitter) profile
      icon: XIcon,
      value: contact?.x,
    },
    {
      name: "wechat",
      label: "WeChat ID: johndoe123", // Example WeChat ID
      icon: IoLogoWechat,
      value: contact?.wechat,
    },
    {
      name: "line",
      label: "LINE ID: johndoe.line", // Example LINE ID
      icon: FaLine,
      value: contact?.line,
    },
    {
      name: "website",
      label: "https://www.examplewebsite.com", // Example website link
      icon: PublicIcon,
      value: contact?.website,
    },
  ];

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, newContact) => {
    try {
      setLoading(true);
      const updateContact = await createAD({
        ...ad,
        adsId,
        contact: newContact,
      });
      dispatch(setAd(updateContact));
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
    const newContact = contactRef.current;

    toDB(adsId, newContact);
    fetchAds();
  };

  const M = () => {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid !w-full !max-w-[900px]"
        columnClassName="my-masonry-grid_column flex flex-col gap-3 items-center p-5 "
      >
        {servicesItems.map((item, i) => (
          <Input
            key={item.name}
            isClearable
            className="max-w-96 m-2"
            placeholder={item.label}
            variant="bordered"
            size="lg"
            radius="full"
            defaultValue={contactRef.current[item.name]} // Use ref for value
            onValueChange={(v) => handleInputChange(item.name, v)}
            onClear={() => handleInputChange(item.name, "")}
   
            startContent={<item.icon className="text-xl text-default-400" />}
          />
          // <Input
          //   key={item.name}
          //   className="max-w-96 m-2"
          //   placeholder={item.label}
          //   variant="bordered"
          //   size="lg"
          //   radius="full"
          //   value={contact_[item.name]} // Use state value
          //   onValueChange={(v) => {
          //     setContact_((prev) => ({
          //       ...prev,
          //       [item.name]: v,
          //     }));
          //   }}
          //   endContent={<item.icon className="text-xl text-default-500" />}
          // />
        ))}
      </Masonry>
    );
  };

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
          <div className="text-xl md:text-3xl font-semibold">{l?.contact}</div>
        </div>
        <Button
          className="hidden md:flex"
          radius="full"
          size="lg"
          color="primary"
          isLoading={loading}
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
          // color="primary"
          isLoading={loading}
          onPress={handleSave}
          isIconOnly
        >
          <SaveAltIcon />
        </Button>
      </div>
      <ScrollShadow className="h-[92vh]" hideScrollBar={true}>
        <div className="mb-12 mt-2 text-default-400 md:flex hidden">
          {l?.service_contact_title}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-[1500px] flex justify-center items-center ">
            <M />
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}

const breakpointColumnsObj = {
  default: 2,
  1024: 1,
};
