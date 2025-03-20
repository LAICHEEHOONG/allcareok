"use client";
import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@heroui/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from "@/components/ui/drawer";
import { useSelector } from "react-redux";
import { i18n } from "@/i18n.config";
import { useRouter, usePathname } from "next/navigation";
import { updateUserLanguage } from "@/lib/action/userAction";

export function DrawerLanguage({
  children,
  bottom_navigation,
  setOpenDrawerLanguage,
  openDrawerLanguage,
}) {
  return (
    <Drawer
      open={openDrawerLanguage}
      onOpenChange={() =>
        setOpenDrawerLanguage(openDrawerLanguage ? false : true)
      }
    >
      {/* <DrawerTrigger asChild>{children}</DrawerTrigger> */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-2 ">
          <DrawerHeader>
            <DrawerTitle>{bottom_navigation.drawerTitle}</DrawerTitle>
            <DrawerDescription></DrawerDescription>
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
  const area = useSelector((state) => state.search?.area);
  const serviceType = useSelector((state) => state.search?.serviceType);

  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleSelectionChange = async (newKeys) => {
    const locale = Array.from(newKeys).join(", ");
    setSelectedKeys(newKeys);

    try {
      // router.push(
      //   `${redirectedPathName(locale)}?area=${area ? area : ""}&serviceType=${
      //     serviceType ? serviceType : ""
      //   }`,
      //   { scroll: false }
      // );
      window.open(
        `${redirectedPathName(locale)}?area=${area ? area : ""}&serviceType=${
          serviceType ? serviceType : ""
        }`,
        "_blank"
      );
      if (id) {
        await updateUserLanguage({ id, locale });
      }
    } catch (error) {
      console.log("Failed to update language:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <ListboxWrapper>
        <Listbox
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange} // Directly handle selection change
        >
          {i18n.locales.map((locale) => {
            let lan;
            if (locale === "en") {
              lan = "English";
            }
            if (locale === "zh") {
              lan = "中文";
            }
            if (locale === "ms") {
              lan = "Malay";
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
