"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavBottom({ bottom_navigation }) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const language = useSelector((state) => state.auth.language);

  const [lan, setLan] = useState(language);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (language === "en") {
      setLan("English");
    }
    if (language === "zh") {
      setLan("中文");
    }
  }, [language]);

  return (
    <motion.div
      className="fixed bottom-0 z-50 w-full block sm:hidden"
      animate={{
        y: isVisible ? 0 : 100, // Animate the y-axis position
      }}
      initial={{
        y: 0, // Initial position
      }}
      transition={{
        duration: 0.3, // Animation duration
        ease: "easeInOut", // Smooth easing
      }}
    >
      <Box>
        <BottomNavigation
          showLabels
          value={0}
          onChange={(event, newValue) => {
            // Handle navigation state if necessary
          }}
        >
          <BottomNavigationAction
            label={bottom_navigation.explore}
            icon={<SearchIcon />}
            onClick={() => router.push(`/${currentLocale}`)}
          />
          <BottomNavigationAction
            label={bottom_navigation.whishlists}
            icon={<FavoriteBorderIcon />}
          />
          <BottomNavigationAction label={lan} icon={<LanguageIcon />} />
          <BottomNavigationAction
            label={bottom_navigation.profile}
            icon={<AccountCircleIcon />}
          />
        </BottomNavigation>
      </Box>
    </motion.div>
  );
}
