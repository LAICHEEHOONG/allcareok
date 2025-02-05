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
import { signIn } from "next-auth/react";
import { DrawerLanguage } from "../DrawerLanguage";
import { toast } from "sonner";
import { Image } from "@heroui/react";

export default function NavBottom({ bottom_navigation }) {
  const session = useSelector((state) => state.auth.session);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const l = useSelector((state) => state.auth?.lang?.home_card);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard =
    // pathname.endsWith("/dashboard") ||
    pathname.endsWith("/editor") ||
    pathname.endsWith("/overview") ||
    pathname.endsWith("/editor/mobile/photo") ||
    pathname.endsWith("/editor/mobile/delete") ||
    pathname.endsWith("/editor/mobile/area") ||
    pathname.endsWith("/editor/mobile/contact") ||
    pathname.endsWith("/editor/mobile/description") ||
    pathname.endsWith("/payment-success") ||
    pathname.endsWith("/editor/mobile/verify") ||
    pathname.endsWith("/payment-plus") ||
    pathname.endsWith("/payment-pro") ||
    pathname.endsWith("/editor/mobile/boosts") ||
    pathname.endsWith("/one_nine_nine_zero");

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
      if (currentScrollY <= 0) {
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
    if (language === "ms") {
      setLan("Malay");
    }
  }, [language]);

  const handleWishlists = () => {
    if (wishlist.length === 0) {
      // showToast(l?.wishlist_toast?.title, l?.wishlist_toast?.description);
      toast.warning(l?.wishlist_empty?.title, {
        description: l?.wishlist_empty?.description,
        action: {
          label: "OK",
          // onClick: () => {
          //   if (typeof fn === "function") fn(); // Check before calling
          // },
        },
      });
      return;
    }

    router.push(`/${currentLocale}/wishlists`);
    setTimeout(() => {
      setClickIcon(-1);
    }, 500);
  };

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
                // icon={<SearchIcon />}
                icon={
                  <Image
                    className="min-w-[20px] "
                    width={20}
                    alt="Allcareok logo"
                    src="/images/apple-icon-160.png"
                  />
                }
                sx={{
                  // "&.Mui-selected": {
                  //   color: "#f31260",
                  // },
                  "& .MuiBottomNavigationAction-label": {
                    color: "#f31260",
                  },
                }}
                onClick={() => {
                  router.push(`/${currentLocale}`);
                  setClickIcon(0);
                }}
              />
              <BottomNavigationAction
                label={bottom_navigation.whishlists}
                icon={<FavoriteBorderIcon />}
                showLabel
                sx={{
                  "&.Mui-selected": {
                    color: "#f31260",
                  },
                  // "& .MuiBottomNavigationAction-label": {
                  //   color: "#f31260",
                  // },
                }}
                onClick={() => {
                  setClickIcon(1);
                  handleWishlists();
                }}
              ></BottomNavigationAction>
              <DrawerLanguage bottom_navigation={bottom_navigation}>
                <BottomNavigationAction
                  showLabel
                  label={lan}
                  icon={<LanguageIcon />}
                  sx={{
                    "&.Mui-selected": {
                      color: "#f31260",
                    },
                  }}
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
