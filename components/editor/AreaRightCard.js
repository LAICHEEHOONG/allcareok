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
  CardHeader,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import FilterIcon from "@mui/icons-material/Filter";
import Masonry from "react-masonry-css";
import AddIcon from "@mui/icons-material/Add";
// import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { createAD } from "@/lib/action/adAction";
// import { setAd, setAds } from "@/redux/features/editor/editorSlice";
// import { findUserAds } from "@/lib/action/adAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { deleteImages } from "@/util/deleteImage";
import { useRouter, usePathname } from "next/navigation";
import { RiGalleryView2 } from "react-icons/ri";
import AddLocationIcon from "@mui/icons-material/AddLocation";

const breakpointColumnsObj = {
  default: 4,
  1700: 3,
  1400: 2,
  1111: 2,
  1050: 1,
};

//   const breakpointColumnsObj_2 = {
//     default: 2,
//     // 820: 1,
//   };

export default function AreaRightCard() {
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.auth._id);
  //   const adsId = useSelector((state) => state.editor?.adsId);
  //   const ad = useSelector((state) => state.editor.ad);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [loading2, setLoading2] = useState(false);
  //   const [manageAd, setManageAd] = useState({});
  const lang = useSelector((state) => state.auth.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const area = useSelector((state) => state.editor?.ad?.area);

  // const filterOurPreview = (previewToRemove) => {
  //   setPhotos((prev) =>
  //     prev.filter((item) => item.preview !== previewToRemove)
  //   );
  // };

  // const M = () => {
  //   const items = [
  //     {
  //       label: lang?.handyman ? lang.handyman : "Handyman",
  //       image: "/images/handyman_2.webp",
  //     },
  //     {
  //       label: lang?.cleaning ? lang.cleaning : "Cleaning",
  //       image: "/images/cleaning_2.jpeg",
  //     },
  //     {
  //       label: lang?.childcare ? lang.childcare : "Childcare",
  //       image: "/images/childcare_2.webp",
  //     },
  //     {
  //       label: lang?.hourly_maid ? lang.hourly_maid : "Hourly Maid",
  //       image: "/images/cleaning_1.webp",
  //     },
  //     {
  //       label: lang?.plumber ? lang.plumber : "Plumber",
  //       image: "/images/plumber.png",
  //     },
  //   ];

  //   return (
  //     <div className="">
  //       {manageAd?._id ? (
  //         <div className="">
  //           <div className="flex justify-between mb-7 w-full">
  //             <Button
  //               isIconOnly
  //               radius="full"
  //               color="default"
  //               variant="flat"
  //               aria-label="Back button"
  //               onPress={() => {
  //                 setManageAd({});
  //               }}
  //             >
  //               <RiGalleryView2 className="text-2xl" />
  //             </Button>
  //             <div className="flex gap-3">
  //               {manageAd._id !== ad.photo[0]?._id && (
  //                 <Button
  //                   radius="full"
  //                   color="default"
  //                   variant="flat"
  //                   aria-label="Back button"
  //                   onPress={() => {
  //                     makeCover();
  //                   }}
  //                   isLoading={loading}
  //                 >
  //                   {lang?.make_cover ? lang.make_cover : "Make cover photo"}
  //                 </Button>
  //               )}
  //               <Button
  //                 isIconOnly
  //                 radius="full"
  //                 color="default"
  //                 variant="flat"
  //                 aria-label="Back button"
  //                 onPress={() => {
  //                   deletePhoto();
  //                 }}
  //                 isLoading={loading2}
  //               >
  //                 <DeleteForeverIcon />
  //               </Button>
  //             </div>
  //           </div>
  //           <div className="flex justify-center items-center  ">
  //             <Image
  //               alt="Card service demo"
  //               className="object-cover rounded-xl hidden md:flex"
  //               src={manageAd.url}
  //               width={600}
  //               height={600}
  //             />
  //             <Image
  //               alt="Card service demo"
  //               className="object-cover rounded-xl flex md:hidden"
  //               src={manageAd.url}
  //               width={400}
  //               height={400}
  //             />
  //           </div>
  //         </div>
  //       ) : (
  //         <Masonry
  //           breakpointCols={breakpointColumnsObj}
  //           className="my-masonry-grid max-w-[1500px]"
  //           columnClassName="my-masonry-grid_column"
  //         >
  //           {(!ad.photo || ad?.photo?.length === 0) &&
  //             items.map((item) => (
  //               <div
  //                 key={item.label}
  //                 className=" flex flex-col justify-center items-center"
  //               >
  //                 <h4 className="font-bold text-large m-1">{item.label}</h4>
  //                 <Image
  //                   alt="Card service demo"
  //                   className="object-cover rounded-xl"
  //                   src={item.image}
  //                   width={270}
  //                   height={270}
  //                 />
  //               </div>
  //             ))}
  //           {ad?.photo?.length > 0 &&
  //             !manageAd?._id &&
  //             ad.photo.map((item, i) => (
  //               <div key={item.url} className="flex justify-center">
  //                 <Card
  //                   isPressable
  //                   className=""
  //                   onPress={() => setManageAd(item)}
  //                 >
  //                   <CardBody className="m-0 p-0">
  //                     <div className="relative">
  //                       {i === 0 && (
  //                         <Chip className="absolute z-40 m-3" color="default">
  //                           Cover
  //                         </Chip>
  //                       )}
  //                       <Image
  //                         alt="Card service"
  //                         className="object-cover rounded-xl cursor-pointer"
  //                         src={item.url}
  //                         width={400}
  //                         height={357}
  //                       />
  //                     </div>
  //                   </CardBody>
  //                 </Card>
  //               </div>
  //             ))}
  //         </Masonry>
  //       )}
  //     </div>
  //   );
  // };

  const M = () => {
    // const items = [
    //   {
    //     label: lang?.handyman ? lang.handyman : "Handyman",
    //     image: "/images/handyman_2.webp",
    //   },
    //   {
    //     label: lang?.cleaning ? lang.cleaning : "Cleaning",
    //     image: "/images/cleaning_2.jpeg",
    //   },
    //   {
    //     label: lang?.childcare ? lang.childcare : "Childcare",
    //     image: "/images/childcare_2.webp",
    //   },
    //   {
    //     label: lang?.hourly_maid ? lang.hourly_maid : "Hourly Maid",
    //     image: "/images/cleaning_1.webp",
    //   },
    //   {
    //     label: lang?.plumber ? lang.plumber : "Plumber",
    //     image: "/images/plumber.png",
    //   },
    // ];

    // const items = [
    //   "/images/china.webp",
    //   "/images/france.png",
    //   "/images/greece.webp",
    //   "/images/malaysia.png",
    //   "/images/japan.png",
    // ];
    // const items = [
    //   {
    //     map: "/images/beijing.png",
    //     country: "China",
    //     state: "Beijing",
    //     city: "The Palace Museum", // Correct
    //   },
    //   {
    //     map: "/images/france.png",
    //     country: "France",
    //     state: "Île-de-France", // Paris is a city; Île-de-France is the region (state equivalent)
    //     city: "Paris",
    //   },
    //   {
    //     map: "/images/greece.webp",
    //     country: "Greece",
    //     state: "Attica", // Athens is a city; Attica is the region
    //     city: "Athens",
    //   },
    //   {
    //     map: "/images/malaysia.png",
    //     country: "Malaysia",
    //     state: "Perak", // Kuala Lumpur is a city; Federal Territory is its administrative division
    //     city: "Ipoh",
    //   },
    //   {
    //     map: "/images/japan.png",
    //     country: "Japan",
    //     state: "Tokyo Metropolis", // Tokyo is both a city and a metropolis (state-equivalent in Japan)
    //     city: "Tokyo",
    //   },
    //   {
    //     map: "/images/malaysia.png",
    //     country: "Malaysia",
    //     state: "Selangor", // Kuala Lumpur is a city; Federal Territory is its administrative division
    //     city: "Kuala Lumpur",
    //   },
    //   {
    //     map: "/images/malaysia.png",
    //     country: "Taiwan",
    //     state: "Taipei", // Kuala Lumpur is a city; Federal Territory is its administrative division
    //     city: "Taipei City",
    //   },
    //   {
    //     map: "/images/malaysia.png",
    //     country: "Thailand",
    //     state: "Bangkok", // Kuala Lumpur is a city; Federal Territory is its administrative division
    //     city: "he Grand Palace",
    //   },
    //   {
    //     map: "/images/vietnam.png",
    //     country: "Vietnam",
    //     state: "", // Kuala Lumpur is a city; Federal Territory is its administrative division
    //     city: "Ho Chi Minh City",
    //   },
    //   {
    //     map: "/images/korea.png",
    //     country: "Soul korea",
    //     state: "", // Kuala Lumpur is a city; Federal Territory is its administrative division
    //     city: "soul",
    //   },
    // ];
    const items = [
      {
        map: "/images/kl.png",
        country: "Malaysia",
        state: "Selangor", // Correct administrative division for Kuala Lumpur
        city: "Kuala Lumpur",
      },
      {
        map: "/images/singapore.png",
        country: "Singapore",
        state: "Singapore", // Correct administrative division for Kuala Lumpur
        city: "Marina Bay Sands",
      },
      {
        map: "/images/beijing.png",
        country: "China",
        state: "Beijing",
        city: "The Palace Museum",
      },
      {
        map: "/images/france.png",
        country: "France",
        state: "Île-de-France", // Correct region for Paris
        city: "Paris",
      },
      {
        map: "/images/greece.webp",
        country: "Greece",
        state: "Attica", // Correct region for Athens
        city: "Athens",
      },
      {
        map: "/images/malaysia.png",
        country: "Malaysia",
        state: "Perak", // Correct state for Ipoh
        city: "Ipoh",
      },
      {
        map: "/images/japan.png",
        country: "Japan",
        state: "Tokyo Metropolis", // Correct administrative division for Tokyo
        city: "Tokyo",
      },

      {
        map: "/images/taiwan.png", // Correct image path for Taiwan
        country: "Taiwan",
        state: "Taipei City", // Correct administrative division for Taipei
        city: "Taipei 101",
      },
      {
        map: "/images/thailand.png", // Correct image path for Thailand
        country: "Thailand",
        state: "Bangkok", // Bangkok is both a state and a city
        city: "The Grand Palace",
      },
      {
        map: "/images/vietnam.png",
        country: "Vietnam",
        state: "Ho Chi Minh City", // Use the city's name as the administrative division
        city: "Landmark 81",
      },
      {
        map: "/images/korea.png",
        country: "South Korea", // Fixed typo: "Soul Korea" → "South Korea"
        state: "Seoul", // Correct state for Seoul
        city: "Seoul",
      },
    ];

    return (
      <div className="p-1">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid max-w-[1500px]"
          columnClassName="my-masonry-grid_column"
        >
          {area &&
            area?.length === 0 &&
            items.map((item) => (
              <div key={item?.map} className="flex justify-center">
                <Card
                // isPressable
                // className=""
                // onPress={() => setManageAd(item)}
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      {item?.state}
                    </p>
                    <small className="text-default-500">{item?.country}</small>
                    <h4 className="font-bold text-large">{item?.city}</h4>
                  </CardHeader>
                  <CardBody className="m-0 p-0">
                    <div className="relative">
                      {/* {i === 0 && (
                      <Chip className="absolute z-40 m-3" color="default">
                        Cover
                      </Chip>
                    )} */}
                      <Image
                        alt="Card service"
                        className="object-cover rounded-xl "
                        src={item?.map}
                        width={550}
                        height={357}
                      />
                    </div>
                  </CardBody>
                </Card>
              </div>
              // <div
              //   key={item}
              //   className=" flex flex-col justify-center items-center"
              // >
              //   {/* <h4 className="font-bold text-large m-1">{item.label}</h4> */}
              //   <Image
              //     alt="Card area"
              //     className="object-cover rounded-xl"
              //     src={item}
              //     width={270}
              //     height={270}
              //   />
              // </div>
            ))}
        </Masonry>
        {/* {manageAd?._id ? (
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
            {(!ad.photo || ad?.photo?.length === 0) &&
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
            {ad?.photo?.length > 0 &&
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
        )} */}
      </div>
    );
  };

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
  //             className="object-cover rounded-xl md:h-[240px] sm:h-[220px] h-[200px]"
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

  // const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
  //   if (acceptedFiles?.length) {
  //     // console.log(acceptedFiles);
  //     setPhotos((previousFiles) => [
  //       ...previousFiles,
  //       ...acceptedFiles.map((file) =>
  //         Object.assign(file, { preview: URL.createObjectURL(file) })
  //       ),
  //     ]);
  //   }

  //   if (rejectedFiles?.length) {
  //     setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
  //   }
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: {
  //     "image/*": [],
  //   },
  //   maxSize: 10485760,
  //   onDrop,
  // });

  // const closeModal = () => setPhotos([]);
  const closeModal = () => {};

  // const submitToMongoDB = async (data) => {
  //   try {
  //     if (adsId) {
  //       const updateAD = await createAD(data);
  //       dispatch(setAd(updateAD));
  //       const ads = await findUserAds({ user }); // Pass only the userId
  //       dispatch(setAds(ads));
  //     } else {
  //       console.log("adsId not found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const submitToCloudinary = async () => {
  //   try {
  //     setLoading(true);
  //     if (photos.length > 0) {
  //       // setLoading(true);
  //       const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  //       const uploadPhoto = async (photo) => {
  //         const photoFormData = new FormData();
  //         photoFormData.append("file", photo);
  //         photoFormData.append("upload_preset", "model_preset");
  //         const response = await fetch(URL, {
  //           method: "POST",
  //           body: photoFormData,
  //         });

  //         return response.json();
  //       };

  //       const responses = await Promise.all(
  //         photos.map((photo) => uploadPhoto(photo))
  //       );

  //       let photo_ = responses.map((item) => ({
  //         url: item.secure_url,
  //         publicId: item.public_id,
  //       }));

  //       // await submitToMongoDB({ photo, user, adsId });
  //       let { user, photo, service, area, contact, youtube } = ad;
  //       photo = [...photo, ...photo_];
  //       await submitToMongoDB({
  //         user,
  //         photo,
  //         service,
  //         area,
  //         contact,
  //         youtube,
  //         adsId,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const makeCover = async () => {
  //   try {
  //     setLoading(true);
  //     const { user, service, area, contact, youtube } = ad;

  //     let photo = ad.photo;
  //     photo = photo.filter((item) => item._id !== manageAd._id);
  //     photo = [manageAd, ...photo];

  //     await submitToMongoDB({
  //       user,
  //       photo,
  //       service,
  //       area,
  //       contact,
  //       youtube,
  //       adsId,
  //     });
  //     setManageAd({});
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deletePhoto = async () => {
  //   try {
  //     setLoading2(true);
  //     const { user, service, area, contact, youtube } = ad;

  //     let photo = ad.photo;
  //     photo = photo.filter((item) => item._id !== manageAd._id);

  //     await submitToMongoDB({
  //       user,
  //       photo,
  //       service,
  //       area,
  //       contact,
  //       youtube,
  //       adsId,
  //     });
  //     setManageAd({});

  //     await deleteImages([manageAd.publicId]);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading2(false);
  //   }
  // };

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
          <div className="text-3xl font-semibold">{lang?.area}</div>
        </div>

        <>
          <Button
            className="md:flex hidden"
            color="default"
            variant="flat"
            radius="full"
            startContent={<AddLocationIcon />}
            onPress={onOpen}
          >
            {"Add Area"}
            {/* {lang?.add_photo ? lang.add_photo : "Add photos"} */}
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
            <AddLocationIcon fontSize={"small"} />
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
                        // onPress={() =>
                        //   document.getElementById("fileInput").click()
                        // }
                      >
                        <AddIcon />
                      </Button>
                      <div className="flex-1 text-center">
                        <div>{"Add service area"}</div>
                        {/* <div className="text-xs font-light tracking-tight text-default-500 ">
                          {photos?.length === 0
                            ? lang?.no_items_selected
                            : `${photos.length} ${lang?.items_selected}`}
                        </div> */}
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    {/* {photos?.length === 0 ? (
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
                    )} */}
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
                          {lang?.cancel}
                          {/* {photos?.length === 0 ? lang?.done : lang?.cancel} */}
                        </Button>
                        <Button
                          color="primary"
                          //   onPress={async () => {
                          //     try {
                          //       await submitToCloudinary(); // Wait for the upload to complete
                          //       onClose(); // Close the modal only after upload completes
                          //     } catch (error) {
                          //       console.error("Upload failed:", error); // Handle any errors
                          //     }
                          //   }}
                          size="lg"
                          radius="full"
                          //   isDisabled={photos?.length === 0 ? true : false}
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
          {
            "Please clearly mention your service area, as customers often look for services by location."
          }
          {/* {lang?.photo_upload_description
              ? lang.photo_upload_description
              : `Upload your service poster with contact info, service details, and
          coverage area. Include real case photos to assist customers.`} */}
        </div>
        <M />
      </ScrollShadow>
    </div>
  );
}
