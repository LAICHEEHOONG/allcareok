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
    pathname.endsWith("/editor/mobile/boosts");

  return (
    <>
      {isDashboard ? (
        <></>
      ) : (
        <Navbar shouldHideOnScroll={false}>
          <NavbarBrand className={`${poppins.className} hidden xs:block`}>
            <AllcareokLogo />
          </NavbarBrand>
          <NavbarContent justify="center">
            <SearchField navigation={navigation} />
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
        <div className="flex flex-col justify-center items-center">
          <Divider className="m-3" />
          <NavCarousel service_type={service_type} />
        </div>
      )}
    </>
  );
}
