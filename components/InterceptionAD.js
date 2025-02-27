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
                <DrawerBody>{children}</DrawerBody>
                <DrawerFooter className="border-1">
                  <Button
                    className="border-1"
                    radius="full"
                    size="sm"
                    color="primary"
                    onPress={handleClose}
                    fullWidth={true}
                  >
                    {back}
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
