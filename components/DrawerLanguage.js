"use client";
import { useEffect, useMemo, useState } from "react";

import { Listbox, ListboxItem } from "@nextui-org/react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useSelector } from "react-redux";
import { i18n } from "@/i18n.config";
import { useRouter, usePathname } from "next/navigation";
import { updateUserLanguage } from "@/lib/action/userAction";

export function DrawerLanguage({ children, bottom_navigation }) {
  const [goal, setGoal] = useState(350);

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-2 ">
          <DrawerHeader>
            <DrawerTitle>{bottom_navigation.drawerTitle}</DrawerTitle>
            <DrawerDescription>
              {/* <Divider className="mt-2" /> */}
            </DrawerDescription>
          </DrawerHeader>

          <ListBox_ />

          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ListBox_() {
  const router = useRouter();
  const pathname = usePathname();
  const id = useSelector((state) => state.auth._id);
  const language = useSelector((state) => state.auth.language);
  const [selectedKeys, setSelectedKeys] = useState(new Set([language]));

  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  // const selectedValue = useMemo(
  //   () => Array.from(selectedKeys).join(", "),
  //   [selectedKeys]
  // );

  useEffect(() => {
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

    if (selectedKeys.size > 0) {
      const locale = Array.from(selectedKeys).join(", "); // Convert Set to a single string value
      changeLanguage(locale);
    }
  }, [selectedKeys]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <ListboxWrapper>
        <Listbox
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {i18n.locales.map((locale) => {
            let lan;
            if (locale === "en") {
              lan = "English";
            }
            if (locale === "zh") {
              lan = "中文";
            }
            return <ListboxItem key={locale}>{lan}</ListboxItem>;
          })}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}

const ListboxWrapper = ({ children }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
