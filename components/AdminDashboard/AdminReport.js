"use client";
import { findAdsWithReports, toggleAdBlockStatus } from "@/lib/action/adAction";
import { getUserById } from "@/lib/action/userAction";

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
  Avatar,
  Tooltip,
} from "@heroui/react";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdminReport() {
  const [reportData, setReportData] = useState([]);

  const findAdsWithReports_ = async () => {
    try {
      const res = await findAdsWithReports();
      if (res.success) {
        setReportData(res.data);
        console.log(res.data);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAdBlockStatus_ = async (_id) => {
    try {
      const res = await toggleAdBlockStatus(_id);
      if (res.success) {
        console.log(res.message);
        findAdsWithReports_();
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findAdsWithReports_();
  }, []);

  const handleView = (_id) => {
    if (_id) {
      window.open(`/ad/${_id}`, "_blank");
    }
  };

  const handleBlock = (_id) => {
    toggleAdBlockStatus_(_id);
  };

  const formattedDate = (dateString) => {
    if (!dateString) return "N/A"; // Return a placeholder if the date is missing

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };
  return (
    <div>
      <div>
        <Table aria-label="Example static collection table ">
          <TableHeader>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>REPORT</TableColumn>
            <TableColumn>BLOCK</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>VIEW</TableColumn>
          </TableHeader>
          <TableBody>
            {reportData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={item.user?.image}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {item.user?.name}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        {item.user?.email}
                      </h5>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        {item.report.map((r, index) => (
                          <div
                            key={index}
                            className="flex gap-4 justify-between"
                          >
                            <div>{r.email}</div>
                            <div>{r.title}</div>
                          </div>
                        ))}
                      </div>
                    }
                  >
                    <Button color="danger" size="sm" radius="full">
                      {item.report?.length}
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Button
                    color={item.block ? "danger" : "success"}
                    size="sm"
                    radius="full"
                    onPress={() => handleBlock(item._id)}
                  >
                    {item.block ? "FALSE" : "TRUE"}
                  </Button>
                </TableCell>
                <TableCell>{formattedDate(item.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    radius="full"
                    isIconOnly
                    aria-label="View"
                    onPress={() => handleView(item._id)}
                  >
                    <VisibilityIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

//   function ReviewPhotos({ verification }) {
//     const { isOpen, onOpen, onOpenChange } = useDisclosure();

//     return (
//       <>
//         <Button
//           onPress={onOpen}
//           radius="full"
//           size="sm"
//         >{`Review (${verification.length})`}</Button>
//         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">PHOTOS</ModalHeader>
//                 <ModalBody>
//                   <ScrollShadow className="h-[400px]">
//                     {verification.map((p) => (
//                       <div key={p._id} className="m-1">
//                         <Image
//                           alt={"review photo"}
//                           className="object-cover w-full cursor-pointer"
//                           radius="lg"
//                           shadow="sm"
//                           src={p.url}
//                           width="100%"
//                           onClick={() => window.open(p.url, "_blank")}
//                         />
//                         {/* <Image
//                           alt={"review photo"}
//                           className="object-cover w-full"
//                           radius="lg"
//                           shadow="sm"
//                           src={p.url}
//                           width="100%"
//                         /> */}
//                       </div>
//                     ))}
//                   </ScrollShadow>

//                   {/* <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Nullam pulvinar risus non risus hendrerit venenatis.
//                     Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                   </p>
//                   <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Nullam pulvinar risus non risus hendrerit venenatis.
//                     Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                   </p>
//                   <p>
//                     Magna exercitation reprehenderit magna aute tempor cupidatat
//                     consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
//                     incididunt cillum quis. Velit duis sit officia eiusmod Lorem
//                     aliqua enim laboris do dolor eiusmod. Et mollit incididunt
//                     nisi consectetur esse laborum eiusmod pariatur proident Lorem
//                     eiusmod et. Culpa deserunt nostrud ad veniam.
//                   </p> */}
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="light" onPress={onClose}>
//                     Close
//                   </Button>
//                   {/* <Button color="primary" onPress={onClose}>
//                     Action
//                   </Button> */}
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       </>
//     );
//   }

//   function ReviewStatus({ reviewStatus, adId }) {
//     const [selectedStatus, setSelectedStatus] = useState(reviewStatus);
//     const [loading, setLoading] = useState(false);
//     const [disable, setDisable] = useState(false);

//     const updateReviewStatus_ = async (newReviewStatus) => {
//       try {
//         setLoading(true);
//         const res = await updateReviewStatus({ adId, newReviewStatus });
//         if (res.success) {
//           console.log(res);
//         } else {
//           setSelectedStatus("Error");
//           setDisable(true);
//         }
//       } catch (error) {
//         console.log(error);
//         setSelectedStatus("Error");
//         setDisable(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const handleAction = (key) => {
//       setSelectedStatus(key);
//       console.log("Selected Status:", key); // Optional: For debugging or further actions
//       updateReviewStatus_(key);
//     };

//     return (
//       <Dropdown>
//         <DropdownTrigger>
//           <Button
//             isDisabled={disable}
//             variant="bordered"
//             radius="full"
//             size="sm"
//             isLoading={loading}
//           >
//             {selectedStatus}
//           </Button>
//         </DropdownTrigger>
//         <DropdownMenu
//           aria-label="Review Status Actions"
//           onAction={handleAction} // Handle the change
//         >
//           <DropdownItem key="Payment Pending">Payment Pending</DropdownItem>
//           <DropdownItem key="Under Review">Under Review</DropdownItem>
//           <DropdownItem key="Approved">Approved</DropdownItem>
//           <DropdownItem key="Rejected" className="text-danger" color="danger">
//             Rejected
//           </DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     );
//   }
