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
import { addReportToAd } from "@/lib/action/adAction";
// reportAd({ adId, reportedEmail, reportTitle })

export default function Report({ report_btn, _id, ad_page }) {
  const email = useSelector((state) => state.auth?.email);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [checked, setChecked] = useState("");
  const [loading, setLoading] = useState(false);
  const reportTitile = [
    `${ad_page?.report_complain_1}`,
    `${ad_page?.report_complain_2}`,
    `${ad_page?.report_complain_3}`,
    `${ad_page?.report_complain_4}`,
    `${ad_page?.report_complain_5}`,
  ];
  // const reportTitile = [
  //   `It’s inaccurate or incorrect`,
  //   `It’s not a real advertisement`,
  //   `It’s a scam`,
  //   `It’s offensive`,
  //   `It’s something else`,
  // ];

  const handleCheck = (title) => {
    if (title === checked && title !== "") {
      setChecked("");
    } else {
      setChecked(title);
    }
  };

  // const reportAd_ = async (adId, reportedEmail, reportTitle, onClose) => {
  //   try {
  //     setLoading(true);
  //     const res = await reportAd({ adId, reportedEmail, reportTitle });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //     onClose();
  //   }
  // };

  const addReportToAd_ = async (_id, email, title, fn) => {
    try {
      setLoading(true);
      const res = await addReportToAd({ _id, email, title });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fn();
    }
  };

  const handleReport = (onClose) => {
    if (email) {
      if (email && checked && _id) {
        addReportToAd_(_id, email, checked, onClose);
        // reportAd_(adId, email, checked, onClose);
      }
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
                  {ad_page?.report_modal_title}
                  {/* Why are you reporting this advertisement? */}
                </div>
                <div className="capitalize text-sm font-normal">
                  {ad_page?.report_modal_content}
                  {/* This won’t be shared with the host. */}
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
                  onPress={() => handleReport(onClose)}
                  isLoading={loading}
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
