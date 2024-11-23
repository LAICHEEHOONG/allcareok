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
import { Poppins } from "next/font/google";
import { getDictionary } from "@/lib/dictionary.js";
import { NavCarousel } from "../NavCarousel.js";
import NavShareBtn from "./NavShareBtn.js";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function Nav({ lang }) {
  const { navigation, service_type } = await getDictionary(lang);

  return (
    <>
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
            <LanguageMenu />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <ProfileMenu navigation={navigation} />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex flex-col justify-center items-center">
        <Divider className="m-3" />
        <NavCarousel service_type={service_type} />
      </div>
    </>
  );
}
