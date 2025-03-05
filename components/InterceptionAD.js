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
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InterceptionAD({ children, back }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen(); // Open the drawer when the component mounts
  }, []);

  return (
    <>
      <Drawer
        placement="bottom"
        size="full"
        isOpen={isOpen}
        hideCloseButton
        // className="!p-0 !m-0"
        // onOpenChange={onOpenChange}
        // backdrop="blur" // Dynamically set the backdrop type
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
                <DrawerBody className="p-2">{children}</DrawerBody>
                <DrawerFooter>
                  <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-[1120px] ">
                      <Button
                        className="z-50"
                        radius="full"
                        size="md"
                        color="primary"
                        onPress={handleClose}
                        fullWidth={true}
                      >
                        {back}
                      </Button>
                    </div>
                  </div>
                </DrawerFooter>
              </>
            );
          }}
        </DrawerContent>
      </Drawer>
    </>
  );
}
