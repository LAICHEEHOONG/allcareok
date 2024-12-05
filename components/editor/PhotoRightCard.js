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
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import FilterIcon from "@mui/icons-material/Filter";
import Masonry from "react-masonry-css";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const breakpointColumnsObj = {
  default: 4,
  1550: 3,
  1260: 2,
  900: 1,
};

const breakpointColumnsObj_2 = {
  default: 2,
};

export default function PhotoRightCard() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [photos, setPhotos] = useState([]);

  const filterOurPreview = (previewToRemove) => {
    setPhotos((prev) =>
      prev.filter((item) => item.preview !== previewToRemove)
    );
  };

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

  const M2 = () => {
    const items = [
      { label: "Handyman", image: "/images/handyman_2.webp" },
      { label: "Cleaning", image: "/images/cleaning_2.jpeg" },
      { label: "Childcare", image: "/images/childcare_2.webp" },
      { label: "Hourly Maid", image: "/images/cleaning_1.webp" },
    ];
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
              className="object-cover rounded-xl"
              src={item.preview}
              width={240}
              height={240}
            />
            <Button
              isIconOnly
              color="primary"
              aria-label="delete image"
              radius="full"
              size="sm"
              className="absolute top-2 right-2 z-50"
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

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  const closeModal = () => setPhotos([]);

  const submitToCloudinary = async () => {
    try {
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
        console.log(responses);
        // responses.forEach((obj1) => {
        //   setModelForm((obj2) => ({
        //     ...obj2,
        //     images: [
        //       ...obj2.images,
        //       { url: obj1.secure_url, publicId: obj1.public_id },
        //     ],
        //   }));
        // });
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setUploadToggle(true);
    }
  };

  return (
    <div className="h-screen m-3">
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
                        <div>Upload photos</div>
                        <div className="text-xs font-light tracking-tight text-default-500 ">
                          {photos.length === 0
                            ? "No items selected"
                            : `${photos.length} items selected`}
                        </div>
                      </div>
                      {/* <input
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
                      /> */}
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
                        {/* <input {...getInputProps()} /> */}
                        <div className="flex flex-col items-center justify-center gap-4">
                          <FilterIcon sx={{ fontSize: 50 }} />
                          <div className="text-xl font-semibold">
                            Drag and drop
                          </div>
                          <div className="text-xs font-light ">
                            or browse for photos
                          </div>
                          <Button
                            radius="full"
                            size="lg"
                            onPress={() =>
                              document.getElementById("fileInput").click()
                            }
                            color="primary"
                            // variant="flat"
                          >
                            Browse
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
                      <ScrollShadow className=" max-h-[500px]">
                        <M2 />
                      </ScrollShadow>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex flex-col gap-4 w-full">
                      <Divider />
                      <div className="flex justify-between items-center">
                        <Button
                          // color="danger"
                          variant="light"
                          onPress={() => {
                            closeModal();
                            onClose();
                          }}
                          size="lg"
                          radius="full"
                        >
                          {photos.length === 0 ? "Done" : "Cancel"}
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
                        >
                          Upload
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
