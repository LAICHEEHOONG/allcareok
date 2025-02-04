"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Divider,
} from "@heroui/react";
import AllcareokLogo from "./AllcareokLogo.js";
import SearchField from "./SearchField.js";
import ProfileMenu from "./ProfileMenu.js";
import LanguageMenu from "./LanguageMenu.js";
import { NavCarousel } from "../NavCarousel.js";
import NavShareBtn from "./NavShareBtn.js";
import { usePathname } from "next/navigation";
import { setLang } from "@/redux/features/auth/authSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavChild({ navigation, service_type, poppins, dic }) {
  const language = useSelector((state) => state.auth.language);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLang(dic));
  }, [language]);

  const pathname = usePathname();
  const isDashboard =
    pathname.endsWith("/dashboard") ||
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

  const isWishlist = pathname.endsWith("/wishlists");

  return (
    <>
      {isDashboard ? (
        <></>
      ) : (
        <Navbar
          maxWidth="full"
          shouldHideOnScroll={false}
          className={`${isWishlist ? "hidden md:flex" : ""} mt-3`}
        >
          <NavbarBrand className={`${poppins.className} hidden xs:block`}>
            <AllcareokLogo />
          </NavbarBrand>
          {isWishlist && (
            <NavbarBrand className={`${poppins.className} block xs:hidden`}>
              <AllcareokLogo />
            </NavbarBrand>
          )}
          <NavbarContent justify="center">
            {!isWishlist ? (
              <SearchField navigation={navigation} />
            ) : (
              <div className="w-[150px] xs:w-[250px] sm:w-[307px] h-[64px]"></div>
            )}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex items-center">
              <NavShareBtn
                share={navigation.share}
                myService={navigation.my_service}
              />
            </NavbarItem>
            <NavbarItem className="hidden sm:flex gap-2">
              <LanguageMenu />
              <ProfileMenu navigation={navigation} />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )}

      {isDashboard ? (
        <></>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <Divider className="m-3" />
          {!isWishlist && (
            <div className="w-full max-w-[2300px] flex justify-center items-center">
              <NavCarousel service_type={service_type} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
