"use client";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Listbox, ListboxItem } from "@nextui-org/react";

// import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Avatar,
  Divider,
  Card,
  CardBody,
  Image,
  Button,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { i18n } from "@/i18n.config";
import { useRouter, usePathname } from "next/navigation";
import { updateUserLanguage } from "@/lib/action/userAction";

export function DrawerLanguage({ children, bottom_navigation }) {
  const [goal, setGoal] = useState(350);
  const auth = useSelector((state) => state.auth);

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Open Drawer</Button> */}
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-2 ">
          <DrawerHeader>
            <DrawerTitle>
                {bottom_navigation.drawerTitle}
              {/* Choose a language and region */}
              {/* <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src={auth.image} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {auth.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {auth.email}
                  </h5>
                </div>
              </div> */}
            </DrawerTitle>
            <DrawerDescription>
              {/* <Divider className="mt-2" /> */}
            </DrawerDescription>
          </DrawerHeader>

          <ListBox_ />

          {/* <Divider className="mb-4" /> */}
          {/* <Card
            className="m-2 mb-4"
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody>

              <div className="flex">
                <div className="flex flex-col justify-center tracking-wider">
                  <p className="text-md leading-10">Share Your Services</p>
                  <p className="text-small tracking-wide text-default-400">
                    {"Post Services & Earn Extra Income Easily"}
                  </p>
                </div>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/images/service_logo_ai.png"
                  width={170}
                />
              </div>
            </CardBody>
          </Card> */}
          {/* <Divider className="mb-4" /> */}
          <DrawerFooter>
            {/* <Button variant="outline" onClick={() => signOut()}>Log out</Button> */}
            {/* 
            <Button
              color="default"
              radius="full"
              variant="light"
              startContent={<HelpOutlineIcon />}
            >
              Visit the Help Center
            </Button> */}

            {/* <DrawerClose asChild>
              <Button color="danger" radius="full" onPress={() => signOut()}>
                Log out
              </Button>
            </DrawerClose> */}
          </DrawerFooter>
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

  //   const changeLanguage = async (locale) => {
  //     try {
  //       router.push(redirectedPathName(locale)); // Navigate to the new language route

  //       if (id) {
  //         await updateUserLanguage({ id, locale }); // Update the user's language preference
  //       }
  //     } catch (error) {
  //       console.error("Failed to update language:", error);
  //     }
  //   };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  //   useEffect(() => {
  //     console.log(selectedKeys)
  //     const changeLanguage = async (locale) => {
  //         try {
  //           router.push(redirectedPathName(locale)); // Navigate to the new language route

  //           if (id) {
  //             await updateUserLanguage({ id, locale }); // Update the user's language preference
  //           }
  //         } catch (error) {
  //           console.error("Failed to update language:", error);
  //         }
  //       };
  //       changeLanguage(selectedKeys)

  //   }, [selectedKeys])

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

//   const [lan, setLan] = useState(selectedKeys);
//   useEffect(() => {
//     if (language === "en") {
//       setLan("English");
//     }
//     if (language === "zh") {
//       setLan("中文");
//     }
//   }, [language]);

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
          {/* <ListboxItem key="text">Text</ListboxItem>
          <ListboxItem key="number">Number</ListboxItem>
          <ListboxItem key="date">Date</ListboxItem>
          <ListboxItem key="single_date">Single Date</ListboxItem>
          <ListboxItem key="iteration">Iteration</ListboxItem> */}
          {i18n.locales.map((locale) => {
            let lan;
            if(locale === 'en') {
                lan = 'English'
            }
            if(locale === 'zh') {
                lan = '中文'
            }
            return <ListboxItem key={locale}>{lan}</ListboxItem>;
          })}
        </Listbox>
      </ListboxWrapper>
      {/* <p className="text-small text-default-500">
        Selected value: {selectedValue}
      </p> */}
    </div>
  );
}

const ListboxWrapper = ({ children }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
