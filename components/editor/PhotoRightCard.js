import {
  ScrollShadow,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import FilterIcon from "@mui/icons-material/Filter";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1550: 3,
  1260: 2,
  900: 1,
  // 2000: 6,
  // 1700: 5,
  // 1400: 4,
  // 1030: 3,
  // 700: 2,
  // 300: 1,
};

export default function PhotoRightCard() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const M = () => {
    const items = [
      { label: "Handyman", image: "/images/handyman_2.webp" },
      { label: "Cleaning", image: "/images/cleaning_2.jpeg" },
      { label: "Childcare", image: "/images/childcare_2.webp" },
      { label: "Hourly Maid", image: "/images/cleaning_1.webp" },
    ];
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="py-4 m-2 flex flex-col justify-center items-center"
          >
            <h4 className="font-bold text-large m-1">{item.label}</h4>
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={item.image}
              width={270}
              height={270}
            />
          </div>
        ))}
      </Masonry>
    );
  };

  return (
    <div className=" h-screen m-3">
      <div className="flex justify-between items-start ">
        <div className="text-3xl font-semibold">Photo upload</div>
        <>
          <Button
            color="default"
            variant="flat"
            radius="full"
            startContent={<FilterIcon />}
            onPress={onOpen}
          >
            Add photos
          </Button>
          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <p>
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
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
      <div className="mt-6 mb-6 text-default-400 max-w-[500px]">
        Upload your service poster with contact info, service details, and
        coverage area. Include real case photos to assist customers.
      </div>
      <ScrollShadow className="h-[73vh]" hideScrollBar={false}>
        <M />
      </ScrollShadow>
    </div>
  );
}
