"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@heroui/react";
import MenuIcon from "@mui/icons-material/Menu";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function ProfileMenu({ navigation }) {
  const session = useSelector((state) => state.auth.session);
  // const status = useSelector((state) => state.auth.status);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth._id);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);
  const blockServiceBtn = useSelector((state) => state.editor.blockServiceBtn);
  const searchValue = useSelector((state) => state.search.value);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const l = useSelector((state) => state.auth?.lang?.home_card);

  const changeRouter = () => {
    if (!session) {
      signIn();
      return;
    }

    if (ads.length === 0 && user) {
      router.push(`/${currentLocale}/overview`);
    } else {
      router.push(`/${currentLocale}/dashboard`);
    }
  };

  const handleWishlists = () => {
    if (!session) {
      signIn();
      return;
    }
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
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" radius="full" size="lg" color="default">
          <MenuIcon />
          <Avatar src={auth.image} size="sm" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {auth.signIn !== "authenticated" && (
          <DropdownItem
            key={navigation.login}
            showDivider
            textValue="log in"
            onPress={() => signIn()}
          >
            <GoogleIcon className="mr-1" />
            {navigation.login}
          </DropdownItem>
        )}

        <DropdownItem
          key={navigation.whishlists}
          textValue="whish lists"
          onPress={handleWishlists}
        >
          {navigation.whishlists}
        </DropdownItem>
        <DropdownItem
          key={navigation.share}
          textValue="share services"
          onPress={changeRouter}
          isDisabled={blockServiceBtn}
        >
          {ads.length === 0 ? navigation.share : navigation.my_service}
        </DropdownItem>
        <DropdownItem key={navigation.help} textValue="help center">
          {navigation.help}
        </DropdownItem>
        {auth.signIn === "authenticated" && (
          <DropdownItem
            key={navigation.logout}
            className="text-danger"
            color="danger"
            textValue="log out"
            onPress={() => signOut()}
          >
            {navigation.logout}
          </DropdownItem>
        )}

        {auth.role === "admin" && (
          <DropdownItem
            key={"X_ADMIN_X"}
            // className="text-danger"
            // color="danger"
            textValue="X_ADMIN_X"
            onPress={() => {
              router.push(`${searchValue}`);
            }}
          >
            {"X_ADMIN_X"}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

// http://localhost:3000/en/one_nine_nine_zero?secret=17041990
//    /one_nine_nine_zero
