"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import LanguageIcon from "@mui/icons-material/Language";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";
import { useRouter } from "next/navigation";

export default function LanguageMenu() {
  const router = useRouter();
  const pathName = usePathname();

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
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
              onPress={() => router.push(redirectedPathName(locale))}
              textValue={locale}
            >
              {locale === 'en' && "English"}
              {locale === 'zh' && "中文"}
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
