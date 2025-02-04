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
        <div className="w-full  mt-3 flex justify-center ">
          <div className=" w-full x1470l:ml-14 x1470l:mr-14 max-w-[2090px]">
            <Navbar
              maxWidth="full"
              shouldHideOnScroll={false}
              className={`${isWishlist ? "hidden md:flex" : ""} `}
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
          </div>
        </div>
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
