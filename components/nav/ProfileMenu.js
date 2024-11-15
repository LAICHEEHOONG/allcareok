"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import MenuIcon from "@mui/icons-material/Menu";
import GoogleIcon from "@mui/icons-material/Google";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { signUp } from "@/lib/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { userInfo, signInStatus } from "@/redux/features/auth/authSlice";

export default function ProfileMenu({ navigation }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const signUpUser = async (user) => {
      try {
        const res = await signUp(user);
        dispatch(userInfo(res));
      } catch (err) {
        console.log(err);
      }
    };

    if (session) {
      signUpUser(session.user);
      dispatch(signInStatus(status));
    }
  }, [session, status, dispatch]);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" radius="full" size="lg">
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
        <DropdownItem key={navigation.share} textValue="share services">
          {navigation.share}
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
