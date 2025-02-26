"use client";
import {
  Drawer,
  DrawerContent,
  // DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InterceptionAD({ children }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdropType, setBackdropType] = useState("opaque");
  // useEffect(() => {
  //   onOpen(); // Open the drawer when the component mounts
  // }, []);

  useEffect(() => {
    // Detect if the user is on iOS
    const isIOS =
      typeof window !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;

    setBackdropType(isIOS ? "blur" : "opaque");

    onOpen(); // Open the drawer when the component mounts
  }, []);

  return (
    <>
      <Drawer
        placement="bottom"
        size="xl"
        isOpen={isOpen}
        // onOpenChange={onOpenChange}
        backdrop={backdropType} // Dynamically set the backdrop type
        onOpenChange={(open) => {
          // onOpenChange(open);
          if (!open) router.back(); // Navigate back when modal closes
        }}
      >
        <DrawerContent>
          {(onClose) => {
            // Custom close function that also navigates back
            const handleClose = () => {
              // onClose();
              router.back();
            };

            return (
              <>
                <DrawerBody>{children}</DrawerBody>
                <DrawerFooter>
                  <Button
                    radius="full"
                    size="sm"
                    color="primary"
                    onPress={handleClose}
                  >
                    Back
                  </Button>
                </DrawerFooter>
              </>
            );
          }}
        </DrawerContent>
      </Drawer>
    </>
  );
}
