import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
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
  const contact = useSelector((state) => state.editor.ad?.contact);

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

  // const servicesItems = [
  //   {
  //     label: "+60 12-345 6789", // Fake Malaysian phone number
  //     icon: CallIcon,
  //   },
  //   {
  //     label: "https://wa.me/60123456789", // Fake WhatsApp link
  //     icon: WhatsAppIcon,
  //   },
  //   {
  //     label: "@FakeTelegramUser", // Fake Telegram username
  //     icon: TelegramIcon,
  //   },
  //   {
  //     label: "fakeemail@example.com", // Fake email address
  //     icon: AlternateEmailIcon,
  //   },
  //   {
  //     label: "facebook.com/FakeUser", // Fake Facebook profile
  //     icon: FacebookIcon,
  //   },
  //   {
  //     label: "tiktok.com/@FakeUser", // Fake TikTok username
  //     icon: FaTiktok,
  //   },
  //   {
  //     label: "instagram.com/FakeUser", // Fake Instagram profile
  //     icon: InstagramIcon,
  //   },
  //   {
  //     label: "youtube.com/c/FakeChannel", // Fake YouTube channel
  //     icon: YouTubeIcon,
  //   },
  //   {
  //     label: "twitter.com/FakeUser", // Fake X (Twitter) profile
  //     icon: XIcon,
  //   },
  //   {
  //     label: "WeChat ID: fakewechatid", // Fake WeChat ID
  //     icon: IoLogoWechat,
  //   },
  //   {
  //     label: "LINE ID: fakelineid", // Fake LINE ID
  //     icon: FaLine,
  //   },
  //   {
  //     label: "https://www.allcareok.com",
  //     icon: PublicIcon,
  //   },
  // ];
  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
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
          {/* 
          {servicesItems
            .filter(({ value }) => value) // Filter out items with empty values
            .map(({ label, icon: Icon, value }) => (
              <div key={label} className="flex gap-3 p-1 text-default-400">
                <Icon className={`w-6 h-6 ${label}`} />
                <div>{value}</div>
              </div>
            ))} */}

          {servicesItems.filter(({ value }) => value).length > 0 ? (
            servicesItems
              .filter(({ value }) => value) // Filter out items with empty values
              .map(({ label, icon: Icon, value }) => (
                <div key={label} className="flex gap-3 p-1 text-default-400">
                  <Icon className={`w-6 h-6 ${label}`} />
                  <div>{value}</div>
                </div>
              ))
          ) : (
            <div className="text-default-400 p-2">{"No contact or social links. Add some!"}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
