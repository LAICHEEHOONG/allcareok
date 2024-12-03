import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { GiBroom } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import HouseIcon from "@mui/icons-material/House";
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

export default function ContactCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  const servicesItems = [
    {
      label: "+60 12-345 6789", // Fake Malaysian phone number
      icon: CallIcon,
    },
    {
      label: "https://wa.me/60123456789", // Fake WhatsApp link
      icon: WhatsAppIcon,
    },
    {
      label: "@FakeTelegramUser", // Fake Telegram username
      icon: TelegramIcon,
    },
    {
      label: "fakeemail@example.com", // Fake email address
      icon: AlternateEmailIcon,
    },
    {
      label: "facebook.com/FakeUser", // Fake Facebook profile
      icon: FacebookIcon,
    },
    {
      label: "tiktok.com/@FakeUser", // Fake TikTok username
      icon: FaTiktok,
    },
    {
      label: "instagram.com/FakeUser", // Fake Instagram profile
      icon: InstagramIcon,
    },
    {
      label: "youtube.com/c/FakeChannel", // Fake YouTube channel
      icon: YouTubeIcon,
    },
    {
      label: "twitter.com/FakeUser", // Fake X (Twitter) profile
      icon: XIcon,
    },
    {
      label: "WeChat ID: fakewechatid", // Fake WeChat ID
      icon: IoLogoWechat,
    },
    {
      label: "LINE ID: fakelineid", // Fake LINE ID
      icon: FaLine,
    },
    {
      label: "https://www.allcareok.com",
      icon: PublicIcon,
    },
  ];
  return (
    <Card
      className={`m-5 p-1 w-[300px] ${
        cardFocus === "contact" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("contact"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-2">{l?.contact}</div>

          {servicesItems.map(({ label, icon: Icon }, id) => (
            <div key={id} className="flex gap-3 p-1 text-default-400">
              <Icon className={`w-6 h-6 ${label}`} />
              <div>{label}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
