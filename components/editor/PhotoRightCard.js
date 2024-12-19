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
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import FilterIcon from "@mui/icons-material/Filter";
import Masonry from "react-masonry-css";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createAD } from "@/lib/action/adAction";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import { findUserAds } from "@/lib/action/adAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { deleteImages } from "@/util/deleteImage";
import { useRouter, usePathname } from "next/navigation";
import CollectionsIcon from "@mui/icons-material/Collections";
import { FcStackOfPhotos } from "react-icons/fc";
import { RiGalleryView2 } from "react-icons/ri";

const breakpointColumnsObj = {
  default: 5,
  1650: 4,
  1320: 3,
  1111: 2,
  820: 1,
};

const breakpointColumnsObj_2 = {
  default: 2,
  // 820: 1,
};

export default function PhotoRightCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth._id);
  const adsId = useSelector((state) => state.editor?.adsId);
  const ad = useSelector((state) => state.editor.ad);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [manageAd, setManageAd] = useState({});
  const lang = useSelector((state) => state.auth.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  const filterOurPreview = (previewToRemove) => {
    setPhotos((prev) =>
      prev.filter((item) => item.preview !== previewToRemove)
    );
  };

  const M = () => {
    const items = [
      {
        label: lang?.handyman ? lang.handyman : "Handyman",
        image: "/images/handyman_2.webp",
      },
      {
        label: lang?.cleaning ? lang.cleaning : "Cleaning",
        image: "/images/cleaning_2.jpeg",
      },
      {
        label: lang?.childcare ? lang.childcare : "Childcare",
        image: "/images/childcare_2.webp",
      },
      {
        label: lang?.hourly_maid ? lang.hourly_maid : "Hourly Maid",
        image: "/images/cleaning_1.webp",
      },
      {
        label: lang?.plumber ? lang.plumber : "Plumber",
        image: "/images/plumber.png",
      },
    ];

    return (
      <div className="">
        {manageAd?._id ? (
          <div className="">
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
                    {lang?.make_cover ? lang.make_cover : "Make cover photo"}
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
            <div className="flex justify-center items-center  ">
              <Image
                alt="Card service demo"
                className="object-cover rounded-xl hidden md:flex"
                src={manageAd.url}
                width={600}
                height={600}
              />
              <Image
                alt="Card service demo"
                className="object-cover rounded-xl flex md:hidden"
                src={manageAd.url}
                width={400}
                height={400}
              />
            </div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid max-w-[1500px]"
            columnClassName="my-masonry-grid_column"
          >
            {(!ad.photo || ad.photo.length === 0) &&
              items.map((item) => (
                <div
                  key={item.label}
                  className=" flex flex-col justify-center items-center"
                >
                  <h4 className="font-bold text-large m-1">{item.label}</h4>
                  <Image
                    alt="Card service demo"
                    className="object-cover rounded-xl"
                    src={item.image}
                    width={270}
                    height={270}
                  />
                </div>
              ))}
            {ad.photo?.length > 0 &&
              !manageAd?._id &&
              ad.photo.map((item, i) => (
                <div key={item.url} className="flex justify-center">
                  <Card
                    isPressable
                    className=""
                    onPress={() => setManageAd(item)}
                  >
                    <CardBody className="m-0 p-0">
                      <div className="relative">
                        {i === 0 && (
                          <Chip className="absolute z-40 m-3" color="default">
                            Cover
                          </Chip>
                        )}
                        <Image
                          alt="Card service"
                          className="object-cover rounded-xl cursor-pointer"
                          src={item.url}
                          width={400}
                          height={357}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
          </Masonry>
        )}
      </div>
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
      if (photos.length > 0) {
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
          photos.map((photo) => uploadPhoto(photo))
        );

        let photo_ = responses.map((item) => ({
          url: item.secure_url,
          publicId: item.public_id,
        }));

        // await submitToMongoDB({ photo, user, adsId });
        let { user, photo, service, area, contact, youtube } = ad;
        photo = [...photo, ...photo_];
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
      console.log(err);
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
  return (
    <div className="h-screen w-full">
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
            {lang?.photo_upload ? lang.photo_upload : "Photo upload"}
          </div>
        </div>

        <>
          <Button
            className="md:flex hidden"
            color="default"
            variant="flat"
            radius="full"
            startContent={<FilterIcon />}
            onPress={onOpen}
          >
            {lang?.add_photo ? lang.add_photo : "Add photos"}
          </Button>
          <Button
            className="md:hidden"
            color="default"
            variant="flat"
            radius="full"
            isIconOnly
            // size={'lg'}
            // startContent={<FilterIcon />}
            onPress={onOpen}
          >
            <FilterIcon fontSize={"small"} />
            {/* {lang?.add_photo ? lang.add_photo : "Add photos"} */}
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
                        <div>{lang?.photo_upload}</div>
                        <div className="text-xs font-light tracking-tight text-default-500 ">
                          {photos.length === 0
                            ? lang?.no_items_selected
                            : `${photos.length} ${lang?.items_selected}`}
                        </div>
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    {photos.length === 0 ? (
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
                            {lang?.drag}
                          </div>
                          <div className="text-xs font-light hidden md:flex">
                            {lang?.browse}
                          </div>
                          <Button
                            radius="full"
                            size="lg"
                            onPress={() =>
                              document.getElementById("fileInput").click()
                            }
                            color="primary"
                          >
                            {lang?.browseBtn}
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
                          {photos.length === 0 ? lang?.done : lang?.cancel}
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
                          isDisabled={photos.length === 0 ? true : false}
                          isLoading={loading}
                        >
                          {lang?.upload}
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
          {lang?.photo_upload_description
            ? lang.photo_upload_description
            : `Upload your service poster with contact info, service details, and
        coverage area. Include real case photos to assist customers.`}
        </div>
        <M />
      </ScrollShadow>
    </div>
  );
}
