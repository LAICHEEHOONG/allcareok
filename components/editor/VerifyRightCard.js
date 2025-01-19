import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  Image,
  ScrollShadow,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds, setPopUp } from "@/redux/features/editor/editorSlice";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { createAD, findUserAds } from "@/lib/action/adAction";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import FilterIcon from "@mui/icons-material/Filter";
import { useDropzone } from "react-dropzone";

const breakpointColumnsObj_2 = {
  default: 2,
};

export default function VeryRightCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?._id);
  const email = useSelector((state) => state.auth?.email);
  const country = useSelector((state) => state.auth?.dbCountry);
  const adsId = useSelector((state) => state.editor?.adsId);
  const ad = useSelector((state) => state.editor?.ad);
  const verification = useSelector((state) => state.editor?.ad?.verification);
  const reviewStatus = useSelector((state) => state.editor?.ad?.reviewStatus);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [photos, setPhotos] = useState([]);
  const [limitPhotos, setLimitPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const [currency, setCurrency] = useState("$5 USD");

  useEffect(() => {
    if (country === "Malaysia") {
      setCurrency("RM 20");
    } else {
      setCurrency("$5 USD");
    }
  }, [country]);

  const LIMIT_PHOTO = 10;

  useEffect(() => {
    if (!user) {
      router.push(`/`);
    }
  }, []);

  useEffect(() => {
    // const dbVerification = ad?.photo || [];
    setLimitPhotos(photos.slice(0, LIMIT_PHOTO - verification?.length));
  }, [photos]);

  // Remove the preview image from the state
  const filterOurPreview = (previewToRemove) => {
    setPhotos((prev) =>
      prev.filter((item) => item.preview !== previewToRemove)
    );
  };

  const M2 = () => {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj_2}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((item) => (
          <div key={item.preview} className="relative">
            <Image
              alt="Card background"
              className="object-cover rounded-xl md:h-[240px] sm:h-[220px] h-[200px]"
              src={item.preview}
              width={240}
              // height={240}
            />

            {loading && (
              <>
                {/* Dark transparent overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl z-40"></div>
                {/* Centered spinner */}
                <div className="absolute inset-0 flex items-center justify-center z-40">
                  <Spinner color="default" />
                </div>
              </>
            )}

            <Button
              isIconOnly
              color="primary"
              aria-label="delete image"
              radius="full"
              size="sm"
              className="absolute top-2 right-2 z-30"
              variant="shadow"
              onPress={() => filterOurPreview(item.preview)}
            >
              <DeleteForeverIcon sx={{ fontSize: 22 }} />
            </Button>
          </div>
        ))}
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files).map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
            setPhotos((prev) => [...prev, ...files]);
          }}
        />
      </Masonry>
    );
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      // console.log(acceptedFiles);
      setPhotos((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 10485760,
    onDrop,
  });

  const closeModal = () => setPhotos([]);

  const submitToMongoDB = async (data) => {
    try {
      if (adsId) {
        const updateAD = await createAD(data);
        dispatch(setAd(updateAD));
        const ads = await findUserAds({ user }); // Pass only the userId
        dispatch(setAds(ads));
      } else {
        console.log("adsId not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitToCloudinary = async () => {
    try {
      setLoading(true);
      if (photos?.length > 0) {
        // setLoading(true);
        const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
        const uploadPhoto = async (photo) => {
          const photoFormData = new FormData();
          photoFormData.append("file", photo);
          photoFormData.append("upload_preset", "model_preset");
          const response = await fetch(URL, {
            method: "POST",
            body: photoFormData,
          });

          return response.json();
        };

        const responses = await Promise.all(
          limitPhotos.map((photo) => uploadPhoto(photo))
        );

        let photo_ = responses.map((item) => ({
          url: item.secure_url,
          publicId: item.public_id,
        }));

        // await submitToMongoDB({ photo, user, adsId });
        let { user, photo, service, area, contact, youtube, verification } = ad;
        verification = [...verification, ...photo_];
        await submitToMongoDB({
          user,
          photo,
          service,
          area,
          contact,
          youtube,
          adsId,
          verification,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const runToast = () => {
    toast.warning(`${l?.upload_limit}`, {
      description: `${l?.upload_limit_description}`,
      action: {
        label: "OK",
        onClick: () => console.log("Upload Limit Reached"),
      },
    });
  };

  const handlePress = () => {
    if (verification?.length < LIMIT_PHOTO) {
      onOpen();
    } else {
      runToast();
    }
  };

  const handlePayment = () => {
    const mode = "live";
    if (verification?.length === 0) {
      toast.warning(`${l?.payment_submit_title}`, {
        description: `${l?.payment_submit_content}`,
        action: {
          label: "OK",
          onClick: () => console.log("Submit Documents Before Payment"),
        },
      });
    } else {
      if (mode === "live") {
        if (country === "Malaysia") {
          router.push(
            `https://buy.stripe.com/00g6oR7pu9iA0VOdQZ?client_reference_id=${ad._id}&prefilled_email=${email}`
          );
        } else {
          router.push(
            `https://buy.stripe.com/3csdRj9xC0M433W4go?prefilled_email=${email}client_reference_id=${ad._id}`
          );
        }
      } else {
        router.push(
          `https://buy.stripe.com/test_8wMcNAdsn2anfoA14a?client_reference_id=${ad._id}&prefilled_email=${email}`
        );
      }
    }

    // live
    // router.push(
    //   `https://buy.stripe.com/fZe3cF7puamEbAsaEJ?client_reference_id=${ad._id}&prefilled_email=${email}`
    // );

    // test;
    // router.push(
    //   `https://buy.stripe.com/test_8wMcNAdsn2anfoA14a?client_reference_id=${ad._id}&prefilled_email=${email}`
    // );
  };

  return (
    <div className="md:h-screen w-full md:pl-2">
      <div className="flex justify-between items-start mb-2 max-w-[1600px]">
        <div className="flex justify-center items-center gap-3">
          <Button
            className="md:hidden flex"
            isIconOnly
            radius="full"
            color="default"
            variant="flat"
            aria-label="Back button"
            onPress={() => {
              router.push(`/${currentLocale}/editor`);
            }}
          >
            <ArrowBackIcon />
          </Button>
          <div className="text-xl md:text-3xl font-semibold">
            {l?.verify_title}
          </div>
        </div>
      </div>
      <div className=" mt-2 text-default-400 md:flex hidden">
        {l?.verify_top_content}
      </div>
      <div className=" w-full max-w-[1600px]  flex justify-center h-[80vh]">
        <div className="w-full max-w-[500px] flex flex-col justify-center items-center ">
          <Card className="m-2 mb-4 w-full" isPressable onPress={handlePress}>
            <CardBody>
              <div className="flex justify-between">
                <div className="flex flex-col justify-center md:tracking-wider m-1">
                  <div className="text-md leading-10 w-full max-w-[250px] font-semibold">
                    {l?.verify_upload_title}
                  </div>

                  <div className="text-small md:tracking-wide text-default-400 w-full max-w-[250px]">
                    {l?.verify_upload_content}
                  </div>
                  <div className="text-xs md:tracking-wide text-default-300 w-full max-w-[250px] flex md:justify-end justify-start mt-2">
                    {verification &&
                      verification?.length > 0 &&
                      `${verification?.length} photo`}
                  </div>
                </div>
                <div className=" h-full flex justify-center items-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-full md:max-w-[170px] max-w-[140px]"
                    src="/images/ic.jpeg"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {reviewStatus === "Payment Pending" && (
            <Card
              className="m-2 mb-4 w-full"
              isPressable
              onPress={handlePayment}
              isDisabled={verification?.length > 0 ? false : true}
            >
              <CardBody>
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center md:tracking-wider m-1">
                    <div className="text-md leading-10 w-full max-w-[250px] font-semibold">
                      {l?.verify_btn_title}
                    </div>

                    <div className="text-small md:tracking-wide text-default-400 w-full max-w-[250px]">
                      <div>{l?.verify_btn_content}</div>
                      <div>{`${l?.verify_fee} ${currency}`}</div>
                    </div>
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl w-full md:max-w-[170px] max-w-[140px]"
                      src="/images/payment.png"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {reviewStatus === "Under Review" && (
            <Card className="m-2 mb-4 w-full">
              <CardBody>
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center md:tracking-wider m-1">
                    <div className="text-md leading-10 w-full max-w-[250px] font-semibold">
                      {l?.payment_success_title}
                    </div>

                    <div className="text-small md:tracking-wide text-default-400 w-full max-w-[250px]">
                      {l?.payment_success_content}
                    </div>
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl w-full md:max-w-[170px] max-w-[140px]"
                      src="/images/under_review.png"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {reviewStatus === "Approved" && (
            <Card className="m-2 mb-4 w-full">
              <CardBody>
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center md:tracking-wider m-1">
                    <div className="text-md leading-10 w-full max-w-[250px] font-semibold">
                      {l?.approved_title}
                    </div>

                    <div className="text-small md:tracking-wide text-default-400 w-full max-w-[250px]">
                      {l?.approved_content}
                    </div>
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl w-full md:max-w-[170px] max-w-[140px]"
                      src="/images/approved.png"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
          {reviewStatus === "Rejected" && (
            <Card className="m-2 mb-4 w-full">
              <CardBody>
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center md:tracking-wider m-1">
                    <div className="text-md leading-10 w-full max-w-[250px] font-semibold">
                      {l?.rejected_title}
                    </div>

                    <div className="text-small md:tracking-wide text-default-400 w-full max-w-[250px]">
                      {l?.rejected_content}
                    </div>
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl w-full md:max-w-[170px] max-w-[140px]"
                      src="/images/rejected.png"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          <Drawer_ l={l} />
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="lg"
            onClose={closeModal}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 ">
                    <div className="flex justify-between items-center  ">
                      <Button
                        isIconOnly
                        radius="full"
                        color="default"
                        variant="light"
                        aria-label="add photo"
                        onPress={() =>
                          document.getElementById("fileInput").click()
                        }
                      >
                        <AddIcon />
                      </Button>
                      <div className="flex-1 text-center">
                        <div>{l?.photo_upload}</div>
                        <div className="text-xs font-light tracking-tight text-default-500 ">
                          {photos?.length === 0
                            ? l?.no_items_selected
                            : `${photos.length} ${l?.items_selected}`}
                        </div>
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    {photos?.length === 0 ? (
                      <div
                        {...getRootProps({
                          className: `p-8 border-dashed border-2 border-slate-400  ${
                            isDragActive && `bg-slate-100`
                          } cursor-pointer rounded-lg`,
                        })}
                      >
                        <div className="flex flex-col items-center justify-center gap-4">
                          <FilterIcon sx={{ fontSize: 50 }} />
                          <div className="text-xl font-semibold hidden md:flex">
                            {l?.drag}
                          </div>
                          <div className="text-xs font-light hidden md:flex">
                            {l?.browse}
                          </div>
                          <Button
                            radius="full"
                            size="lg"
                            onPress={() =>
                              document.getElementById("fileInput").click()
                            }
                            color="primary"
                          >
                            {l?.browseBtn}
                          </Button>
                          <input
                            id="fileInput"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files).map(
                                (file) =>
                                  Object.assign(file, {
                                    preview: URL.createObjectURL(file),
                                  })
                              );
                              setPhotos((prev) => [...prev, ...files]);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <ScrollShadow className="max-h-[400px]">
                        <M2 />
                      </ScrollShadow>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex flex-col gap-4 w-full">
                      <Divider />
                      <div className="flex justify-between items-center">
                        <Button
                          variant="light"
                          onPress={() => {
                            closeModal();
                            onClose();
                          }}
                          size="lg"
                          radius="full"
                        >
                          {photos?.length === 0 ? l?.done : l?.cancel}
                        </Button>
                        <Button
                          color="primary"
                          onPress={async () => {
                            try {
                              await submitToCloudinary(); // Wait for the upload to complete
                              onClose(); // Close the modal only after upload completes
                            } catch (error) {
                              console.error("Upload failed:", error); // Handle any errors
                            }
                          }}
                          size="lg"
                          radius="full"
                          isDisabled={photos?.length === 0 ? true : false}
                          isLoading={loading}
                        >
                          {l?.upload}
                        </Button>
                      </div>
                    </div>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}

function Drawer_({ l }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const u = useSelector(
    (state) => state.auth?.lang?.listing_editor_card?.understanding
  );

  return (
    <>
      <Button
        color="default"
        radius="full"
        variant="light"
        startContent={<HelpOutlineIcon />}
        fullWidth={true}
        size="lg"
        onPress={onOpen}
      >
        {l?.learn_more}
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {u?.title}
              </DrawerHeader>
              <DrawerBody>
                <section className="mb-4">
                  <h2 className="text-lg font-bold mb-2">{u?.why}</h2>
                  <ul className="list-disc ml-5 space-y-2 text-default-600">
                    {u?.why_content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section className="mb-4">
                  <h2 className="text-lg font-bold mb-2">{u?.process}</h2>
                  <ol className="list-decimal ml-5 space-y-2 text-default-600">
                    {u?.process_steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section className="mb-4">
                  <h2 className="text-lg font-bold mb-2">
                    {u?.failed_verification}
                  </h2>
                  <p className="text-default-600">
                    {u?.failed_verification_content}
                  </p>
                </section>
                <section>
                  <h2 className="text-lg font-bold mb-2">{u?.benefits}</h2>
                  <ul className="list-disc ml-5 space-y-2 text-default-600">
                    {u?.benefits_content.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </section>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
