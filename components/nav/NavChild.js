"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Divider,
} from "@nextui-org/react";
import AllcareokLogo from "./AllcareokLogo.js";
import SearchField from "./SearchField.js";
import ProfileMenu from "./ProfileMenu.js";
import LanguageMenu from "./LanguageMenu.js";
import { NavCarousel } from "../NavCarousel.js";
import NavShareBtn from "./NavShareBtn.js";
import { usePathname } from "next/navigation";

export default function NavChild({ navigation, service_type, poppins }) {
  const pathname = usePathname();
  const isDashboard = pathname.endsWith("/dashboard");

  return (
    <>
      {isDashboard ? (
        // <Navbar shouldHideOnScroll={false} >
        //   <NavbarBrand className={`${poppins.className} flex justify-center sm:justify-start`}>
        //     <AllcareokLogo isDashboard={isDashboard} />
        //   </NavbarBrand>

        //   <NavbarContent justify="end" className="hidden sm:flex">
        //     <NavbarItem className="hidden sm:flex gap-2">
        //       <LanguageMenu />
        //       <ProfileMenu navigation={navigation} />
        //     </NavbarItem>
        //   </NavbarContent>
        // </Navbar>
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
              <NavShareBtn share={navigation.share} />
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
