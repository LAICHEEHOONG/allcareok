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

export default function ProfileMenu() {
  return (
    <Dropdown >
      <DropdownTrigger>
        <Button variant="bordered"  radius="full" size="lg">
          <MenuIcon />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
