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

export default function Nav() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        {/* <AllcareokLogo /> */}
        <AllcareokLogo />
        {/* <p className="font-bold text-inherit">allcareok</p> */}
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
            Share Your Services
          </Button>
          <Button isIconOnly color="default" variant="light" aria-label="Like" radius="full">
            <LanguageIcon />
          </Button>
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
