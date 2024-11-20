
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import AllcareokLogo from "./AllcareokLogo.js";
import SearchField from "./SearchField.js";
import ProfileMenu from "./ProfileMenu.js";
import LanguageMenu from "./LanguageMenu.js";
import { Poppins } from "next/font/google";
import { getDictionary } from "@/lib/dictionary.js";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function Nav({ lang }) {
  const { navigation } = await getDictionary(lang);

  return (
    <Navbar 
    // shouldHideOnScroll
    >
      <NavbarBrand className={poppins.className}>
        <AllcareokLogo />
   
      </NavbarBrand>
      <NavbarContent className="flex gap-4" justify="center">
        <SearchField navigation={navigation} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex items-center">
          <Button
            className="hidden lg:flex "
            color="default"
            variant="light"
            radius="full"
          >
            {navigation.share}
          </Button>

          <LanguageMenu />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <ProfileMenu navigation={navigation} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
