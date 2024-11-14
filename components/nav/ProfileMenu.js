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
import { useSession, signIn, signOut } from "next-auth/react"

export default function ProfileMenu({ navigation }) {
  const { data: session } = useSession()
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" radius="full" size="lg">
          <MenuIcon />
          <Avatar src="" size="sm" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key={navigation.login} showDivider textValue="log in" onPress={() => signIn()} >
          <GoogleIcon className="mr-1" />
          {navigation.login}
        </DropdownItem>
        <DropdownItem key={navigation.whishlists} textValue="whish lists">
          {navigation.whishlists}
        </DropdownItem>
        <DropdownItem key={navigation.share} textValue="share services">{navigation.share}</DropdownItem>
        <DropdownItem key={navigation.help} textValue="help center" >{navigation.help}</DropdownItem>
        <DropdownItem
          key={navigation.logout}
          className="text-danger"
          color="danger"
          textValue="log out"
          onPress={() => signOut()}
        >
          {navigation.logout}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
