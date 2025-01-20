import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
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
import { useRouter, usePathname } from "next/navigation";

export default function ContactCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const contact = useSelector((state) => state.editor.ad?.contact);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize(); // Initialize state
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handlePress = () => {
    dispatch(setFocus("contact"));
    if (isSmallScreen) {
      router.push(`/${currentLocale}/editor/mobile/contact`);
    }
    // Add other logic if needed
  };

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "contact" ? "md:border-2 md:border-black" : ""
      } `}
      isPressable
      onPress={handlePress}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-2">{l?.contact}</div>

          {servicesItems.filter(({ value }) => value).length > 0 ? (
            servicesItems
              .filter(({ value }) => value) // Filter out items with empty values
              .map(({ label, icon: Icon, value }) => (
                <div key={label} className="flex gap-3 p-1 text-default-400 ">
                  <Icon className={`w-6 h-6 ${label}`} />
                  <div className="truncate">{value}</div>
                </div>
              ))
          ) : (
            <div className="text-default-400 p-2">{l?.contact_empty_title}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
