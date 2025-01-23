import {
  fetchAdsWithValidReviewStatus,
  updateReviewStatus,
} from "@/lib/action/adAction";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  ScrollShadow,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdminReview() {
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const fetchAdsWithValidReviewStatus_ = async () => {
      try {
        const res = await fetchAdsWithValidReviewStatus();
        console.log(res);
        setClientData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdsWithValidReviewStatus_();
  }, []);

  return (
    <div>
      <Table aria-label="Example static collection table ">
        <TableHeader>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>PHOTOS</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>PAYMENT</TableColumn>
          <TableColumn>VIEW</TableColumn>
        </TableHeader>
        <TableBody>
          {clientData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.user?.email || "N/A"}</TableCell>
              {/* <TableCell>{`${item.verification?.length || 0}`}</TableCell> */}
              <TableCell>
                <ReviewPhotos verification={item.verification} />
              </TableCell>
              <TableCell>
                <ReviewStatus
                  reviewStatus={item.reviewStatus}
                  adId={item._id}
                />
              </TableCell>
              <TableCell className="uppercase">
                {item.reviewPayment?.paymentStatus}
              </TableCell>
              <TableCell>
                <Button radius="full" isIconOnly aria-label="View">
                  <VisibilityIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ReviewPhotos({ verification }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        radius="full"
        size="sm"
      >{`Review (${verification.length})`}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">PHOTOS</ModalHeader>
              <ModalBody>
                <ScrollShadow className="h-[400px]">
                  {verification.map((p) => (
                    <div key={p._id} className="m-1">
                      <Image
                        alt={"review photo"}
                        className="object-cover w-full cursor-pointer"
                        radius="lg"
                        shadow="sm"
                        src={p.url}
                        width="100%"
                        onClick={() => window.open(p.url, "_blank")}
                      />
                      {/* <Image
                        alt={"review photo"}
                        className="object-cover w-full"
                        radius="lg"
                        shadow="sm"
                        src={p.url}
                        width="100%"
                      /> */}
                    </div>
                  ))}
                </ScrollShadow>

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
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function ReviewStatus({ reviewStatus, adId }) {
  const [selectedStatus, setSelectedStatus] = useState(reviewStatus);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const updateReviewStatus_ = async (newReviewStatus) => {
    try {
      setLoading(true);
      const res = await updateReviewStatus({ adId, newReviewStatus });
      if (res.success) {
        console.log(res);
      } else {
        setSelectedStatus("Error");
        setDisable(true);
      }
    } catch (error) {
      console.log(error);
      setSelectedStatus("Error");
      setDisable(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (key) => {
    setSelectedStatus(key);
    console.log("Selected Status:", key); // Optional: For debugging or further actions
    updateReviewStatus_(key);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isDisabled={disable}
          variant="bordered"
          radius="full"
          size="sm"
          isLoading={loading}
        >
          {selectedStatus}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Review Status Actions"
        onAction={handleAction} // Handle the change
      >
        <DropdownItem key="Payment Pending">Payment Pending</DropdownItem>
        <DropdownItem key="Under Review">Under Review</DropdownItem>
        <DropdownItem key="Approved">Approved</DropdownItem>
        <DropdownItem key="Rejected" className="text-danger" color="danger">
          Rejected
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

// updateReviewStatus({ adId, newReviewStatus })
// function ReviewStatus({ reviewStatus }) {
//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button variant="bordered" radius="full" size="sm">
//           {reviewStatus}
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Static Actions">
//         <DropdownItem key="Payment Pending">Payment Pending</DropdownItem>
//         <DropdownItem key="Under Review">Under Review</DropdownItem>
//         <DropdownItem key="Approved">Approved</DropdownItem>
//         <DropdownItem key="Rejected" className="text-danger" color="danger">
//           Rejected
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
//       enum: ["Approved", "Under Review", "Rejected", "Payment Pending"], // Define allowed values
