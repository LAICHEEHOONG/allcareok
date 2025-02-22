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

export const contactServices = [
  { name: "phone", label: "+60 12-345 6789", icon: CallIcon },
  { name: "whatsapp", label: "https://wa.me/60123456789", icon: WhatsAppIcon },
  { name: "telegram", label: "@JohnDoe123", icon: TelegramIcon },
  { name: "email", label: "johndoe@example.com", icon: AlternateEmailIcon },
  { name: "facebook", label: "facebook.com/JohnDoe", icon: FacebookIcon },
  { name: "tiktok", label: "tiktok.com/@JohnDoe", icon: FaTiktok },
  { name: "instagram", label: "instagram.com/JohnDoe", icon: InstagramIcon },
  { name: "youtube", label: "youtube.com/c/JohnDoeChannel", icon: YouTubeIcon },
  { name: "x", label: "x.com/JohnDoe", icon: XIcon },
  { name: "wechat", label: "WeChat ID: johndoe123", icon: IoLogoWechat },
  { name: "line", label: "LINE ID: johndoe.line", icon: FaLine },
  { name: "website", label: "https://www.examplewebsite.com", icon: PublicIcon },
];