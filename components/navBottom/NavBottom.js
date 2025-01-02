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
import { DrawerProfile } from "../DrawerProfile";
import { useSession, signIn } from "next-auth/react";
import { DrawerLanguage } from "../DrawerLanguage";

export default function NavBottom({ bottom_navigation }) {
  // const { data: session, status } = useSession();
  const session = useSelector((state) => state.auth.session);

  const router = useRouter();
  const pathname = usePathname();
  const isDashboard =
    pathname.endsWith("/dashboard") ||
    pathname.endsWith("/editor") ||
    pathname.endsWith("/overview") ||
    pathname.endsWith("/editor/mobile/photo") ||
    pathname.endsWith("/editor/mobile/delete") ||
    pathname.endsWith("/editor/mobile/area") ||
    pathname.endsWith("/editor/mobile/contact") ||
    pathname.endsWith("/editor/mobile/description");

  const currentLocale = pathname.split("/")[1] || "en";
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const language = useSelector((state) => state.auth.language);
  const [clickIcon, setClickIcon] = useState(-1);

  const [lan, setLan] = useState(language);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If at the top of the page, always show the navigation
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
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
    <>
      {isDashboard ? (
        <></>
      ) : (
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
              value={clickIcon}
              onChange={(event, newValue) => {
                // Handle navigation state if necessary
                console.log(newValue);
              }}
            >
              <BottomNavigationAction
                label={bottom_navigation.explore}
                icon={<SearchIcon />}
                onClick={() => {
                  router.push(`/${currentLocale}`);
                  setClickIcon(0);
                }}
              />
              <BottomNavigationAction
                label={bottom_navigation.whishlists}
                icon={<FavoriteBorderIcon />}
                showLabel
                onClick={() => {
                  setClickIcon(1);
                }}
              ></BottomNavigationAction>
              <DrawerLanguage bottom_navigation={bottom_navigation}>
                <BottomNavigationAction
                  showLabel
                  label={lan}
                  icon={<LanguageIcon />}
                  onClick={() => {
                    setClickIcon(2);
                  }}
                />
              </DrawerLanguage>

              {session ? (
                <DrawerProfile bottom_navigation={bottom_navigation}>
                  <BottomNavigationAction
                    showLabel
                    label={bottom_navigation.profile}
                    icon={<AccountCircleIcon />}
                    onClick={() => {
                      setClickIcon(3);
                    }}
                  />
                </DrawerProfile>
              ) : (
                <BottomNavigationAction
                  showLabel
                  label={bottom_navigation.login}
                  icon={<AccountCircleIcon />}
                  onClick={() => {
                    signIn();
                    setClickIcon(3);
                  }}
                />
              )}
            </BottomNavigation>
          </Box>
        </motion.div>
      )}
    </>
  );
}
