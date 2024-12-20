"use client";

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
import { useRouter, usePathname } from "next/navigation";

export function DrawerProfile({ children, bottom_navigation }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);
  const blockServiceBtn = useSelector((state) => state.editor.blockServiceBtn);

  const changeRouter = () => {
    if (ads.length === 0) {
      router.push(`/${currentLocale}/overview`);
    } else {
      router.push(`/${currentLocale}/dashboard`);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-2">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src={auth.image} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {auth.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {auth.email}
                  </h5>
                </div>
              </div>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          <Divider className="mb-4" />
          <Card
            className="m-2 mb-4"
            isPressable={!blockServiceBtn}
            onPress={() => {
              changeRouter();
            }}
          >
            <CardBody>
              <div className="flex">
                <div className="flex flex-col justify-center tracking-wider">
                  <p className="text-md leading-10">
                    {ads.length === 0
                      ? bottom_navigation.share
                      : bottom_navigation.my_service}
                  </p>
                  <p className="text-small tracking-wide text-default-400">
                    {bottom_navigation.shareContent}
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
          </Card>
          <DrawerFooter>
            <Button
              color="default"
              radius="full"
              variant="light"
              startContent={<HelpOutlineIcon />}
            >
              {bottom_navigation.help}
            </Button>

            <DrawerClose asChild>
              <Button color="danger" radius="full" onPress={() => signOut()}>
                {bottom_navigation.logout}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
