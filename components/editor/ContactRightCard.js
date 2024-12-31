import { Button, ScrollShadow, Input } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
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

export default function ContactRightCard() {
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  // const aa = (e) => {
  //   console.log(e.target.value);
  // };

  // const bb = (e) => {
  //   console.log(e.target.value);
  // };

  // const items = [
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  //   { placeHolder: "aa", value: "aa", fn: aa },
  //   { placeHolder: "bb", value: "bb", fn: bb },
  // ];
  const servicesItems = [
    {
      label: "+60 12-345 6789", // Example Malaysian phone number
      icon: CallIcon,
    },
    {
      label: "https://wa.me/60123456789", // Example WhatsApp link
      icon: WhatsAppIcon,
    },
    {
      label: "@JohnDoe123", // Example Telegram username
      icon: TelegramIcon,
    },
    {
      label: "johndoe@example.com", // Example email address
      icon: AlternateEmailIcon,
    },
    {
      label: "facebook.com/JohnDoe", // Example Facebook profile
      icon: FacebookIcon,
    },
    {
      label: "tiktok.com/@JohnDoe", // Example TikTok username
      icon: FaTiktok,
    },
    {
      label: "instagram.com/JohnDoe", // Example Instagram profile
      icon: InstagramIcon,
    },
    {
      label: "youtube.com/c/JohnDoeChannel", // Example YouTube channel
      icon: YouTubeIcon,
    },
    {
      label: "twitter.com/JohnDoe", // Example X (Twitter) profile
      icon: XIcon,
    },
    {
      label: "WeChat ID: johndoe123", // Example WeChat ID
      icon: IoLogoWechat,
    },
    {
      label: "LINE ID: johndoe.line", // Example LINE ID
      icon: FaLine,
    },
    {
      label: "https://www.examplewebsite.com", // Example website link
      icon: PublicIcon,
    },
  ];
  const M = () => {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid !w-full !max-w-[900px]"
        columnClassName="my-masonry-grid_column flex flex-col gap-3 items-center p-5 "
      >
        {servicesItems.map((item, i) => (
          <Input
            key={item.label}
            className="max-w-96 m-2"
    
            placeholder={item.label}
            variant="bordered"
            size="lg"
            radius="full"
            // value={item.value} // Bind the current value of newArea.state
            // onChange={(e) => {
            //   fn(e);
            // }} // Update newArea.state on input change
            endContent={<item.icon className="text-xl text-default-500" />}
          />
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
          <div className="text-3xl font-semibold">{l?.contact}</div>
        </div>
        <Button
          radius="full"
          size="lg"
          color="primary"
          // isDisabled={title_?.length <= 50 && title_?.length > 0 ? false : true}
          // isLoading={loading}
          // onPress={handleSave}
        >
          {`${l?.title_save}`}
        </Button>
      </div>
      <ScrollShadow className="h-[92vh]" hideScrollBar={true}>
        <div className="mb-12 mt-2 text-default-400">
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
