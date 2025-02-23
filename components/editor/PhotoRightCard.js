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
  Divider,
  Spinner,
  Chip,
  Card,
  CardBody,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import FilterIcon from "@mui/icons-material/Filter";
import Masonry from "react-masonry-css";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createAD } from "@/lib/action/adAction";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import { findUserAds } from "@/lib/action/adAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { deleteImages } from "@/util/deleteImage";
import { useRouter, usePathname } from "next/navigation";
import { RiGalleryView2 } from "react-icons/ri";
import { toast } from "sonner";
import { Fade } from "react-awesome-reveal";

const breakpointColumnsObj = {
  default: 5,
  1739: 4,
  1639: 3,
  1128: 2,
  949: 1,
  // 1050: 1,
};

const breakpointColumnsObj_2 = {
  default: 2,
};

export default function PhotoRightCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth._id);
  const adsId = useSelector((state) => state.editor?.adsId);
  const ad = useSelector((state) => state.editor.ad);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [photos, setPhotos] = useState([]);
  const [limitPhotos, setLimitPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [manageAd, setManageAd] = useState({});
  const l = useSelector((state) => state.auth.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  const LIMIT_PHOTO = 10;

  useEffect(() => {
    const dbPhotos = ad?.photo || [];
    setLimitPhotos(photos.slice(0, LIMIT_PHOTO - dbPhotos.length));
  }, [photos]);

  // Remove the preview image from the state
  useEffect(() => {
    if (!user) {
      router.push(`/`);
    }
  }, []);

  // Remove the preview image from the state
  const filterOurPreview = (previewToRemove) => {
    setPhotos((prev) =>
      prev.filter((item) => item.preview !== previewToRemove)
    );
  };
  const items = [
    {
      label: l?.handyman ? l.handyman : "Handyman",
      image: "/images/handyman_poster.png",
    },
    {
      label: l?.cleaning ? l.cleaning : "Cleaning",
      image: "/images/cleaning_poster.jpeg",
    },
    {
      label: l?.childcare ? l.childcare : "Childcare",
      image: "/images/childcare_2.webp",
    },
    {
      label: l?.hourly_maid ? l.hourly_maid : "Hourly Maid",
      image: "/images/cleaning_1.webp",
    },
    {
      label: l?.plumber ? l.plumber : "Plumber",
      image: "/images/plumber.png",
    },
  ];

  // const M = () => {
  //   const items = [
  //     {
  //       label: l?.handyman ? l.handyman : "Handyman",
  //       image: "/images/handyman_poster.png",
  //     },
  //     {
  //       label: l?.cleaning ? l.cleaning : "Cleaning",
  //       image: "/images/cleaning_poster.jpeg",
  //     },
  //     {
  //       label: l?.childcare ? l.childcare : "Childcare",
  //       image: "/images/childcare_2.webp",
  //     },
  //     {
  //       label: l?.hourly_maid ? l.hourly_maid : "Hourly Maid",
  //       image: "/images/cleaning_1.webp",
  //     },
  //     {
  //       label: l?.plumber ? l.plumber : "Plumber",
  //       image: "/images/plumber.png",
  //     },
  //   ];

  //   return (
  // <div className="x950l:p-10 x950l:pt-0 lg:p-1 ">
  //   {manageAd?._id ? (
  //     <div>
  //       <div className="flex justify-between mb-7 w-full">
  //         <Button
  //           isIconOnly
  //           radius="full"
  //           color="default"
  //           variant="flat"
  //           aria-label="Back button"
  //           onPress={() => {
  //             setManageAd({});
  //           }}
  //         >
  //           <RiGalleryView2 className="text-2xl" />
  //         </Button>
  //         <div className="flex gap-3">
  //           {manageAd._id !== ad.photo[0]?._id && (
  //             <Button
  //               radius="full"
  //               color="default"
  //               variant="flat"
  //               aria-label="Back button"
  //               onPress={() => {
  //                 makeCover();
  //               }}
  //               isLoading={loading}
  //             >
  //               {l?.make_cover ? l.make_cover : "Make cover photo"}
  //             </Button>
  //           )}
  //           <Button
  //             isIconOnly
  //             radius="full"
  //             color="default"
  //             variant="flat"
  //             aria-label="Back button"
  //             onPress={() => {
  //               deletePhoto();
  //             }}
  //             isLoading={loading2}
  //           >
  //             <DeleteForeverIcon />
  //           </Button>
  //         </div>
  //       </div>
  //       <div className="flex justify-center items-center md:p-10">
  //         {/* <Image
  //           className="object-cover rounded-xl w-[400px] h-[500px] border-2 border-blue-400"
  //           alt="delete photo"
  //           src={manageAd.url}
  //         /> */}
  //               <Image
  //           className="object-cover rounded-xl x950l:w-[400px] x950l:h-[400px] w-[300px] h-[300px]"
  //           alt="delete photo"
  //           // width={400}
  //           // height={400}
  //           src={manageAd.url}
  //         />
  //       </div>
  //     </div>
  //   ) : (
  //     <Masonry
  //       breakpointCols={breakpointColumnsObj}
  //       className="my-masonry-grid max-w-[1600px]"
  //       columnClassName="my-masonry-grid_column "
  //     >
  //       {(!ad.photo || ad?.photo?.length === 0) &&
  //         items.map((item) => (
  //           <Fade
  //             key={item.label}
  //             className=" flex flex-col justify-center items-center"
  //           >
  //             <h4 className="font-bold text-large m-1">{item.label}</h4>
  //             <Card
  //               isPressable
  //               className="p-2"
  //               onPress={() => setManageAd(item)}
  //               shadow="none"
  //             >
  //               <CardBody className="m-0 p-0">
  //                 <div className="relative">
  //                   <Image
  //                     alt="Card service demo"
  //                     className="object-cover rounded-xl"
  //                     // className={`object-cover rounded-xl w-[310px] xl:h-[400px] x1128l:h-[350px] sm:h-[400px] 550px:h-[320px] h-[400px]`}
  //                     //       className="object-cover rounded-xl
  //                     // w-[300px] h-[360px]
  //                     // x1128l:w-[240px] x1128l:h-[300px]
  //                     // xl:w-[280px] xl:h-[340px]
  //                     // x1470l:w-[333px] x1470l:h-[400px]
  //                     // x1640l:w-[300px] x1640l:h-[360px]
  //                     // x1980l:w-[333px] x1980l:h-[400px]"
  //                     src={item.image}
  //                     width={300}
  //                     height={300}
  //                   />
  //                 </div>
  //               </CardBody>
  //             </Card>
  //           </Fade>
  //         ))}
  //       {ad?.photo?.length > 0 &&
  //         !manageAd?._id &&
  //         ad.photo.map((item, i) => (
  //           <Fade key={item.url + i} className="flex justify-center">
  //             <Card
  //               isPressable
  //               className="p-2"
  //               onPress={() => setManageAd(item)}
  //               shadow="none"
  //             >
  //               <CardBody className="m-0 p-0">
  //                 <div className="relative">
  //                   {i === 0 && (
  //                     <Chip className="absolute z-40 m-3" color="default">
  //                       Cover
  //                     </Chip>
  //                   )}

  //                   <Image
  //                     alt={"ads image"}
  //                     className="object-cover rounded-xl "

  //                     // className={`object-cover rounded-xl w-[310px] xl:h-[400px] x1128l:h-[350px] sm:h-[400px] 550px:h-[320px] h-[400px]`}
  //                     // className="object-cover rounded-xl
  //                     // w-[300px] h-[360px]
  //                     // x1128l:w-[240px] x1128l:h-[300px]
  //                     // xl:w-[280px] xl:h-[340px]
  //                     // x1470l:w-[333px] x1470l:h-[400px]
  //                     // x1640l:w-[300px] x1640l:h-[360px]
  //                     // x1980l:w-[333px] x1980l:h-[400px]"
  //                     radius="lg"
  //                     src={item.url}
  //                     width={300}
  //                     height={300}
  //                   />
  //                 </div>
  //               </CardBody>
  //             </Card>
  //           </Fade>
  //         ))}
  //     </Masonry>
  //   )}
  // </div>
  //   );
  // };

  // const M2 = () => {
  //   return (
  //     <Masonry
  //       breakpointCols={breakpointColumnsObj_2}
  //       className="my-masonry-grid"
  //       columnClassName="my-masonry-grid_column"
  //     >
  //       {photos.map((item) => (
  //         <div key={item.preview} className="relative">
  //           <Image
  //             alt="Card background"
  //             className="object-cover rounded-xl md:h-[240px] sm:h-[220px] h-[200px] "
  //             src={item.preview}
  //             width={240}
  //             // height={240}
  //           />

  //           {loading && (
  //             <>
  //               {/* Dark transparent overlay */}
  //               <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl z-40"></div>
  //               {/* Centered spinner */}
  //               <div className="absolute inset-0 flex items-center justify-center z-40">
  //                 <Spinner color="default" />
  //               </div>
  //             </>
  //           )}

  //           <Button
  //             isIconOnly
  //             color="primary"
  //             aria-label="delete image"
  //             radius="full"
  //             size="sm"
  //             className="absolute top-2 right-2 z-30"
  //             variant="shadow"
  //             onPress={() => filterOurPreview(item.preview)}
  //           >
  //             <DeleteForeverIcon sx={{ fontSize: 22 }} />
  //           </Button>
  //         </div>
  //       ))}
  //       <input
  //         id="fileInput"
  //         type="file"
  //         multiple
  //         accept="image/*"
  //         className="hidden"
  //         onChange={(e) => {
  //           const files = Array.from(e.target.files).map((file) =>
  //             Object.assign(file, {
  //               preview: URL.createObjectURL(file),
  //             })
  //           );
  //           setPhotos((prev) => [...prev, ...files]);
  //         }}
  //       />
  //     </Masonry>
  //   );
  // };

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

  const compressImage = (
    file,
    maxSizeMB = 2,
    maxWidth = 1080,
    maxHeight = 1080
  ) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        // const img = new Image();
        const img = new window.Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let width = img.width;
          let height = img.height;

          // Resize maintaining aspect ratio
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.floor((height / width) * maxWidth);
              width = maxWidth;
            } else {
              width = Math.floor((width / height) * maxHeight);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to Blob
          canvas.toBlob(
            (blob) => {
              if (blob.size / 1024 / 1024 > maxSizeMB) {
                reject("Compressed image is still too large");
              } else {
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
              }
            },
            "image/jpeg",
            0.7 // Adjust compression quality (0.7 = 70% quality)
          );
        };
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const submitToCloudinary = async () => {
    try {
      setLoading(true);
      if (photos.length > 0) {
        const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

        const uploadPhoto = async (photo) => {
          const compressedPhoto = await compressImage(photo); // Compress before upload
          const photoFormData = new FormData();
          photoFormData.append("file", compressedPhoto);
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

        let { user, photo, service, area, contact, youtube } = ad;
        photo = [...photo, ...photo_];
        // photo = photo.filter((item) => item.url && item.publicId);
        photo = photo.filter((item) => item.url);

        await submitToMongoDB({
          user,
          photo,
          service,
          area,
          contact,
          youtube,
          adsId,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const makeCover = async () => {
    try {
      setLoading(true);
      const { user, service, area, contact, youtube } = ad;

      let photo = ad.photo;
      photo = photo.filter((item) => item._id !== manageAd._id);
      photo = [manageAd, ...photo];

      await submitToMongoDB({
        user,
        photo,
        service,
        area,
        contact,
        youtube,
        adsId,
      });
      setManageAd({});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async () => {
    try {
      setLoading2(true);
      const { user, service, area, contact, youtube } = ad;

      let photo = ad.photo;
      photo = photo.filter((item) => item._id !== manageAd._id);

      await submitToMongoDB({
        user,
        photo,
        service,
        area,
        contact,
        youtube,
        adsId,
      });
      setManageAd({});

      await deleteImages([manageAd.publicId]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
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
    if (ad?.photo.length < 10) {
      onOpen();
    } else {
      runToast();
    }
  };
  return (
    <div className="h-screen w-full md:pl-2">
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
          <div className="text-3xl font-semibold">
            {l?.photo_upload ? l.photo_upload : "Photo upload"}
          </div>
        </div>

        <>
          <Button
            className="md:flex hidden"
            color="default"
            variant="flat"
            radius="full"
            startContent={<FilterIcon />}
            onPress={handlePress}
          >
            {l?.add_photo ? l.add_photo : "Add photos"}
          </Button>
          <Button
            className="md:hidden"
            color="default"
            variant="flat"
            radius="full"
            isIconOnly
            onPress={handlePress}
          >
            <FilterIcon fontSize={"small"} />
          </Button>
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
                        {/* <M2 /> */}
                        <Masonry
                          breakpointCols={breakpointColumnsObj_2}
                          className="my-masonry-grid"
                          columnClassName="my-masonry-grid_column"
                        >
                          {photos.map((item) => (
                            <div key={item.preview} className="relative">
                              <Image
                                alt="Card background"
                                className="object-cover rounded-xl md:h-[240px] sm:h-[220px] h-[200px] "
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
                              const files = Array.from(e.target.files).map(
                                (file) =>
                                  Object.assign(file, {
                                    preview: URL.createObjectURL(file),
                                  })
                              );
                              setPhotos((prev) => [...prev, ...files]);
                            }}
                          />
                        </Masonry>
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
        </>
      </div>
      <ScrollShadow className="h-[92vh]" hideScrollBar={true}>
        <div className="mb-6 mt-2 text-default-400 ">
          {l?.photo_upload_description
            ? l.photo_upload_description
            : `Upload your service poster with contact info, service details, and
          coverage area. Include real case photos to assist customers.`}
        </div>
        {/* <M /> */}
        <div className="x950l:p-10 x950l:pt-0 lg:p-1 ">
          {manageAd?._id ? (
            <div>
              <div className="flex justify-between mb-7 w-full">
                <Button
                  isIconOnly
                  radius="full"
                  color="default"
                  variant="flat"
                  aria-label="Back button"
                  onPress={() => {
                    setManageAd({});
                  }}
                >
                  <RiGalleryView2 className="text-2xl" />
                </Button>
                <div className="flex gap-3">
                  {manageAd._id !== ad.photo[0]?._id && (
                    <Button
                      radius="full"
                      color="default"
                      variant="flat"
                      aria-label="Back button"
                      onPress={() => {
                        makeCover();
                      }}
                      isLoading={loading}
                    >
                      {l?.make_cover ? l.make_cover : "Make cover photo"}
                    </Button>
                  )}
                  <Button
                    isIconOnly
                    radius="full"
                    color="default"
                    variant="flat"
                    aria-label="Back button"
                    onPress={() => {
                      deletePhoto();
                    }}
                    isLoading={loading2}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center md:p-10">
                {/* <Image
                  className="object-cover rounded-xl w-[400px] h-[500px] border-2 border-blue-400"
                  alt="delete photo"
                  src={manageAd.url}
                /> */}
                <Image
                  className="object-cover rounded-xl x950l:w-[400px] x950l:h-[400px] w-[300px] h-[300px]"
                  alt="delete photo"
                  // width={400}
                  // height={400}
                  src={manageAd.url}
                />
              </div>
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid max-w-[1600px]"
              columnClassName="my-masonry-grid_column "
            >
              {(!ad.photo || ad?.photo?.length === 0) &&
                items.map((item) => (
                  <Fade
                    key={item.label}
                    className=" flex flex-col justify-center items-center"
                  >
                    <h4 className="font-bold text-large m-1">{item.label}</h4>
                    <Card
                      isPressable
                      className="p-2"
                      onPress={() => setManageAd(item)}
                      shadow="none"
                    >
                      <CardBody className="m-0 p-0">
                        <div className="relative">
                          <Image
                            alt="Card service demo"
                            className="object-cover rounded-xl"
                            // className={`object-cover rounded-xl w-[310px] xl:h-[400px] x1128l:h-[350px] sm:h-[400px] 550px:h-[320px] h-[400px]`}
                            //       className="object-cover rounded-xl
                            // w-[300px] h-[360px]
                            // x1128l:w-[240px] x1128l:h-[300px]
                            // xl:w-[280px] xl:h-[340px]
                            // x1470l:w-[333px] x1470l:h-[400px]
                            // x1640l:w-[300px] x1640l:h-[360px]
                            // x1980l:w-[333px] x1980l:h-[400px]"
                            src={item.image}
                            width={300}
                            height={300}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Fade>
                ))}
              {ad?.photo?.length > 0 &&
                !manageAd?._id &&
                ad.photo.map((item, i) => (
                  <Fade key={item.url + i} className="flex justify-center">
                    <Card
                      isPressable
                      className="p-2"
                      onPress={() => setManageAd(item)}
                      shadow="none"
                    >
                      <CardBody className="m-0 p-0">
                        <div className="relative">
                          {i === 0 && (
                            <Chip className="absolute z-40 m-3" color="default">
                              Cover
                            </Chip>
                          )}

                          <Image
                            alt={"ads image"}
                            className="object-cover rounded-xl "
                            // className={`object-cover rounded-xl w-[310px] xl:h-[400px] x1128l:h-[350px] sm:h-[400px] 550px:h-[320px] h-[400px]`}
                            // className="object-cover rounded-xl
                            // w-[300px] h-[360px]
                            // x1128l:w-[240px] x1128l:h-[300px]
                            // xl:w-[280px] xl:h-[340px]
                            // x1470l:w-[333px] x1470l:h-[400px]
                            // x1640l:w-[300px] x1640l:h-[360px]
                            // x1980l:w-[333px] x1980l:h-[400px]"
                            radius="lg"
                            src={item.url}
                            width={300}
                            height={300}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Fade>
                ))}
            </Masonry>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
}
