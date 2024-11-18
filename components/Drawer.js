"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

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

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function DrawerProfile({ children }) {
  const [goal, setGoal] = React.useState(350);
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
            <DrawerDescription>
              {/* <Divider className="mt-2" /> */}
            </DrawerDescription>
          </DrawerHeader>

          <Divider className="mb-4" />
          <Card
            className="m-2 mb-4"
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody>
              {/* <p>
                Share Your Services
              </p>
              <p>
              It's easy to start post services and earn extra income
              </p> */}
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
          </Card>
          {/* <Divider className="mb-4" /> */}
          <DrawerFooter>
            {/* <Button variant="outline" onClick={() => signOut()}>Log out</Button> */}

            <DrawerClose asChild>
              <Button color="danger" radius="full" onPress={() => signOut()}>
                Log out
              </Button>
            </DrawerClose>
            <Button
              color="default"
              radius="full"
              variant="light"
              startContent={<HelpOutlineIcon />}
            >
              Visit the Help Center
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
