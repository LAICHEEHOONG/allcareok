"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InterceptionAD({ children }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    onOpen(); // Open the drawer when the component mounts
  }, []);

  return (
    <>
      <Drawer
        placement="right"
        size="full"
        isOpen={isOpen}
        // onOpenChange={onOpenChange}
        onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) router.back(); // Navigate back when modal closes
        }}
      >
        <DrawerContent>
          {(onClose) => {
            // Custom close function that also navigates back
            const handleClose = () => {
              onClose();
              router.back();
            };
            // const handleClose = () => {
            //   onClose();
            //   if (window.history.length > 1) {
            //     router.back();
            //   } else {
            //     router.push("/"); // Navigate to home or another page
            //   }
            // };

            return (
              <>
                <DrawerBody>{children}</DrawerBody>
                <DrawerFooter>
                  <Button radius="full" size="sm" color="primary" onPress={handleClose}>
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
