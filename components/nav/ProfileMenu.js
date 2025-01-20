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
// import { useEffect } from "react";
// import { signUp } from "@/lib/action/userAction";
import { useDispatch, useSelector } from "react-redux";
// import { userInfo, signInStatus } from "@/redux/features/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
// import { findUserAds } from "@/lib/action/adAction";
// import {
//   setAds,
//   setBlockServiceBtn,
// } from "@/redux/features/editor/editorSlice";

export default function ProfileMenu({ navigation }) {
  // const { data: session, status } = useSession();
  const session = useSelector((state) => state.auth.session);
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth._id);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);
  const blockServiceBtn = useSelector((state) => state.editor.blockServiceBtn);

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

  // const redirectedPathName = (locale) => {
  //   if (!pathName) return "/";
  //   const segments = pathName.split("/");
  //   segments[1] = locale;
  //   return segments.join("/");
  // };

  // useEffect(() => {
  //   const signUpUser = async (user) => {
  //     try {
  //       dispatch(setBlockServiceBtn(true));
  //       const res = await signUp(user);
  //       router.push(redirectedPathName(res.language));
  //       dispatch(userInfo(res));
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       dispatch(setBlockServiceBtn(false));
  //     }
  //   };

  //   if (session) {
  //     signUpUser(session.user);
  //     dispatch(signInStatus(status));
  //   }
  // }, [session]);

  // useEffect(() => {
  //   // Only fetch ads if the userId is available
  //   if (!user) return;

  //   const fetchAds = async () => {
  //     try {
  //       const ads = await findUserAds({ user }); // Pass only the userId
  //       dispatch(setAds(ads));
  //     } catch (error) {
  //       console.error("Error fetching user ads:", error);
  //     }
  //   };

  //   fetchAds();
  // }, [user]); // Add userId as a dependency

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

        <DropdownItem key={navigation.whishlists} textValue="whish lists">
          {navigation.whishlists}
        </DropdownItem>
        <DropdownItem
          key={navigation.share}
          textValue="share services"
          // onPress={() => {
          //   changeRouter();
          // }}
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
      </DropdownMenu>
    </Dropdown>
  );
}
