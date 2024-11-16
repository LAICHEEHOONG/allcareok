"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import LanguageIcon from "@mui/icons-material/Language";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { updateUserLanguage } from "@/lib/action/userAction";

export default function LanguageMenu() {
  const router = useRouter();
  const pathName = usePathname();
  const id = useSelector((state) => state.auth._id);
  // const auth = useSelector((state) => state.auth);

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const changeLanguage = async (locale) => {
    try {
      router.push(redirectedPathName(locale)); // Navigate to the new language route

      if (id) {
        await updateUserLanguage({ id, locale }); // Update the user's language preference
      }
    } catch (error) {
      console.error("Failed to update language:", error);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          color="default"
          variant="light"
          aria-label="Like"
          radius="full"
        >
          <LanguageIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {i18n.locales.map((locale) => {
          return (
            <DropdownItem
              key={locale}
              // onPress={() => router.push(redirectedPathName(locale))}
              onPress={() => changeLanguage(locale)}
              textValue={locale}
            >
              {locale === "en" && "English"}
              {locale === "zh" && "中文"}
            </DropdownItem>
          );
        })}
        {/* <DropdownItem
          key="en"
          onPress={() => router.push(redirectedPathName(locale))}
        >
          English
        </DropdownItem>
        <DropdownItem key="zh">中文</DropdownItem> */}
        {/* <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}
