import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";

export default function DeleteRightCard() {
  const ad = useSelector((state) => state.editor.ad);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-screen m-3 w-full">
      <div className="text-3xl font-semibold">Delete Service</div>
      <div className="text-default-400 mt-6 mb-6 max-w-[520px]">
        The service, along with its image and all associated information, will
        be permanently deleted. This action is irreversible and cannot be
        undone.
      </div>

      <div className="flex justify-end items-center">
        <>
          <Button
            radius="full"
            color="danger"
            variant="flat"
            aria-label="Back button"
            startContent={<DeleteForeverIcon />}
            onPress={onOpen}
          >
            Delete service
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  {/* <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader> */}
                  <ModalBody>
                    <div className="flex flex-col justify-center items-center gap-5 mt-10">
                      <Image
                        alt="Card service demo"
                        className="object-cover rounded-xl"
                        src={
                          ad.photo[0]
                            ? ad.photo[0].url
                            : "/images/handyman_2.webp"
                        }
                        width={200}
                      />
                      <div className="text-xl font-semibold flex m-5">
                        Permanently delete this service from your listing?
                      </div>
                    </div>

                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p> */}
                  </ModalBody>
                  <ModalFooter className="flex flex-col">
                    <Button color="danger"  onPress={onClose}>
                      Delete
                    </Button>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
      <div className="py-4 m-2 flex flex-col justify-center items-center">
        <h4 className="font-bold text-large m-1">
          Card service title Card service title
        </h4>
        <Image
          alt="Card service demo"
          className="object-cover rounded-xl"
          src={ad.photo[0] ? ad.photo[0].url : "/images/handyman_2.webp"}
          width={600}
        />
      </div>
    </div>
  );
}
