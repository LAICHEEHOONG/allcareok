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
  CardFooter,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Input,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import FilterIcon from "@mui/icons-material/Filter";
import Masonry from "react-masonry-css";
import AddIcon from "@mui/icons-material/Add";
// import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createAD } from "@/lib/action/adAction";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import { findUserAds } from "@/lib/action/adAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { deleteImages } from "@/util/deleteImage";
import { useRouter, usePathname } from "next/navigation";
import { RiGalleryView2 } from "react-icons/ri";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { countryData } from "@/lib/countryData";
import { Switch } from "@nextui-org/react";
import { GoogleMapsEmbed } from "@next/third-parties/google";

const breakpointColumnsObj = {
  default: 4,
  1700: 3,
  1400: 2,
  1111: 2,
  1050: 1,
};

export default function AreaRightCard() {
  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.auth._id);
  const adsId = useSelector((state) => state.editor?.adsId);
  const ad = useSelector((state) => state.editor.ad);
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
  const userCountry = useSelector((state) => state.auth?.country) || "";
  const initialArea = {
    country: area?.country,
    state: area?.state,
    city: area?.city,
    town: area?.town,
  };
  const [newArea, setNewArea] = useState(initialArea);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (newArea.country === "") {
      setNewArea((prevState) => {
        return {
          ...prevState,
          country: userCountry,
        };
      });
    }
  }, []);

  const M = () => {
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
        city: "Lotte World Tower",
      },
      {
        map: "/images/hongkong.png",
        country: "China", // Fixed typo: "Soul Korea" → "South Korea"
        state: "Hong Kong", // Correct state for Seoul
        city: "Causeway Bay",
      },
    ];

    return (
      <div className="p-1">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid max-w-[1500px]"
          columnClassName="my-masonry-grid_column"
        >
          {items.map((item) => (
            <div key={item?.map} className="flex justify-center">
              <Card
              // isPressable
              // className=""
              // onPress={() => setManageAd(item)}
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">{item?.state}</p>
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

  const closeModal = () => {
    setNewArea(initialArea);
    // onOpenChange();
  };

  const onSelectionChangeCountry = (key) => {
    setNewArea((prevState) => {
      return {
        ...prevState,
        country: key,
      };
    });
  };

  const countryAutocomplete = () => (
    <Autocomplete
      // allowsCustomValue
      isRequired
      // defaultItems={countryData}
      className="max-w-xs"
      label="Select Country"
      variant="bordered"
      size="lg"
      onSelectionChange={onSelectionChangeCountry}
      // defaultSelectedKey={newArea.country}
      // selectedKey={newArea.country}
      selectedKey={newArea.country}
    >
      {countryData.map((country) => (
        <AutocompleteItem
          key={country.value}
          value={country.label} // Ensure value is set for onSelect to work
          startContent={
            <Avatar
              alt={country.label}
              className="w-6 h-6"
              src={country.description}
            />
          }
        >
          {country.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );

  const stateField = () => {
    return (
      <Input
        className="max-w-xs"
        label="State / federal territory"
        variant="bordered"
        size="lg"
        value={newArea.state} // Bind the current value of newArea.state
        onChange={(e) => {
          setNewArea((prevState) => ({
            ...prevState,
            state: e.target.value,
          }));
        }} // Update newArea.state on input change
      />
    );
  };

  const cityField = () => {
    return (
      <Input
        className="max-w-xs"
        label="City / mulicipality"
        variant="bordered"
        size="lg"
        value={newArea.city} // Bind the current value of newArea.state
        onChange={(e) => {
          setNewArea((prevState) => ({
            ...prevState,
            city: e.target.value,
          }));
        }} // Update newArea.state on input change
      />
    );
  };

  const townField = () => {
    return (
      <Input
        className="max-w-xs"
        label="Town / neighborhood"
        variant="bordered"
        size="lg"
        value={newArea.town} // Bind the current value of newArea.state
        onChange={(e) => {
          setNewArea((prevState) => ({
            ...prevState,
            town: e.target.value,
          }));
        }} // Update newArea.state on input change
      />
    );
  };

  const MapSwitch = () => {
    return (
      <Switch
        checked={showMap} // Bind the switch's value to the state
        aria-label="Map toggle"
        onChange={(e) => setShowMap(e.target.checked)} // Update the state on toggle
        size="sm"
      >
        Map
      </Switch>
    );
  };

  const MapCard = () => {
    return (
      <Card className=" w-full h-screen max-h-[300px]">
        <CardBody>
          <div className="flex flex-col justify-center  items-center h-full">
            <div className="rounded-lg overflow-hidden w-full  h-[380px]  ">
              <GoogleMapsEmbed
              className="border-2 border-red-400 bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                allowfullscreen={false}
                width="100%"
                height="100%"
                // height={380}
                // width={400}
                mode="place"
                q={`${newArea.town},${newArea.city},${newArea.state},${newArea.country}`}
              />
            </div>
            <div className="self-start text-sm text-default-400 truncate w-full max-w-[300px] capitalize p-2">
              {`${newArea.town} ${newArea.city} ${newArea.state} ${newArea.country}`}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, area) => {
    try {
      setLoading(true);
      const saveArea = await createAD({ ...ad, adsId, area });
      dispatch(setAd(saveArea));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // if (isSmallScreen) {
      //   dispatch(setPopUp());
      // }
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    toDB(adsId, newArea);
    fetchAds();
  };

  useEffect(() => {
    console.log(newArea);
  }, [newArea]);

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
            startContent={<AddLocationIcon fontSize="medium" />}
            onPress={onOpen}
          >
            {"Area"}
          </Button>
          <Button
            className="md:hidden"
            color="default"
            variant="flat"
            radius="full"
            isIconOnly
            onPress={onOpen}
          >
            <AddLocationIcon fontSize={"small"} />
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
                    <div className="flex justify-start items-center w-full ">
                      {MapSwitch()}
                      <div className="w-full flex justify-center items-center mr-[90px]">
                        <div>{"Service Area"}</div>
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody className=" flex flex-col justify-center items-center gap-4 p-4 ">
                    {showMap ? (
                      <MapCard />
                    ) : (
                      <>
                        {countryAutocomplete()}
                        {stateField()}
                        {cityField()}
                        {townField()}
                      </>
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
                          {lang?.cancel}
                          {/* {photos?.length === 0 ? lang?.done : lang?.cancel} */}
                        </Button>
                        <Button
                          color="primary"
                          size="lg"
                          radius="full"
                          isDisabled={
                            newArea.country === "" || newArea.country === null
                          }
                          isLoading={loading}
                          onPress={handleSave}
                        >
                          {"Save"}
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
