"use client";
import { Fade } from "react-awesome-reveal";
import FlagIcon from "@mui/icons-material/Flag";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Divider,
} from "@heroui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";

export default function Report({ report_btn }) {
  const email = useSelector((state) => state.auth?.email);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [checked, setChecked] = useState("");
  const reportTitile = [
    `It’s inaccurate or incorrect`,
    `It’s not a real advertisement`,
    `It’s a scam`,
    `It’s offensive`,
    `It’s something else`,
  ];

  const handleCheck = (title) => {
    if(title === checked && title !== '') {
      setChecked('')
    } else {
      setChecked(title);
    }
  };

  const handleReport = () => {
    if (email) {
      console.log("report");
    } else {
      signIn();
    }
  };

  return (
    <Fade triggerOnce>
      <Button
        startContent={<FlagIcon />}
        variant="light"
        radius="full"
        className="text-gray-500 tracking-widest capitalize"
        size="lg"
        onPress={onOpen}
      >
        {report_btn}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="capitalize text-xl font-semibold">
                  Why are you reporting this advertisement?
                </div>
                <div className="capitalize text-sm font-normal">
                  This won’t be shared with the host.
                </div>
              </ModalHeader>
              <ModalBody>
                {reportTitile.map((title) => {
                  return (
                    <div
                      key={title}
                      className="cursor-pointer"
                      onClick={() => {
                        handleCheck(title);
                      }}
                    >
                      <div className="flex justify-between p-4 pl-0">
                        <div className="text-base">{title}</div>
                        <Checkbox
                          isSelected={checked === title ? true : false}
                          color="danger"
                          onValueChange={() => {
                            handleCheck(title);
                          }}
                        />
                      </div>
                      <Divider />
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  radius="full"
                  isDisabled={checked ? false : true}
                  onPress={handleReport}
                >
                  Report
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fade>
  );
}
