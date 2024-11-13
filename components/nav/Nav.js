import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
} from "@nextui-org/react";

import AllcareokLogo from "./AllcareokLogo.js";
import SearchField from "./SearchField.js";
import LanguageIcon from "@mui/icons-material/Language";
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
    <Navbar shouldHideOnScroll>
      <NavbarBrand className={poppins.className}>
        {/* <AcmeLogo /> */}
        <AllcareokLogo />
        <p
          className="font-bold text-inherit ml-2 text-2xl"
          style={{ color: "#f31260" }}
        >
          allcareok
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <SearchField />
        {/* <Input
          // classNames={{
          //   base: "max-w-full sm:max-w-[10rem] h-10",
          //   mainWrapper: "h-full",
          //   input: "text-small",
          //   inputWrapper:
          //     "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          // }}
          placeholder="Where..."
          size="lg"
          startContent={<SearchIcon size={18} />}
          type="search"
          radius="full"
        /> */}
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex items-center">
          {/* <Link href="#">Login</Link> */}
          <Button color="default" variant="light" radius="full">
            {/* Share Your Services */}
            {navigation.share}
          </Button>
          {/* <Button
            isIconOnly
            color="default"
            variant="light"
            aria-label="Like"
            radius="full"
          >
            <LanguageIcon />
          </Button> */}
          <LanguageMenu />
        </NavbarItem>
        <NavbarItem>
          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
          <ProfileMenu />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
