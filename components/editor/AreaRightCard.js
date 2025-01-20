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
  Card,
  CardBody,
  CardHeader,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Input,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import { createAD } from "@/lib/action/adAction";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import { findUserAds } from "@/lib/action/adAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { countryData } from "@/lib/countryData";
import { Switch } from "@heroui/react";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import FlagIcon from "@mui/icons-material/Flag";

const breakpointColumnsObj = {
  default: 4,
  1700: 3,
  1400: 2,
  1111: 2,
  1050: 1,
};

export default function AreaRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const area = useSelector((state) => state.editor?.ad?.area);
  const userCountry = useSelector((state) => state.auth?.dbCountry) || "";
  const initialArea = {
    country: area?.country,
    state: area?.state,
    city: area?.city,
    town: area?.town,
  };
  const [newArea, setNewArea] = useState(initialArea);
  const [showMap, setShowMap] = useState(false);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  useEffect(() => {
    if (newArea?.country === "") {
      setNewArea((prevState) => {
        return {
          ...prevState,
          country: userCountry,
        };
      });
    }
  }, []);

  useEffect(() => {
    if (!ad?.user) {
      router.push(`/`);
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
        map: "/images/beijing.jpg",
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
              <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">{item?.state}</p>
                  <small className="text-default-500">{item?.country}</small>
                  <h4 className="font-bold text-large">{item?.city}</h4>
                </CardHeader>
                <CardBody className="m-0 p-0">
                  <div className="relative">
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
          ))}
        </Masonry>
      </div>
    );
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
      allowsCustomValue
      isRequired
      className="max-w-xs"
      aria-label="country"
      // label={l?.select_country}
      radius="full"
      placeholder={l?.select_country}
      variant="bordered"
      size="lg"
      onInputChange={onSelectionChangeCountry}
      defaultInputValue={newArea?.country}
      startContent={<FlagIcon className="text-gray-400" />}
    >
      {countryData.map((country) => (
        <AutocompleteItem
          key={country?.value}
          value={country?.label} // Ensure value is set for onSelect to work
          startContent={
            <Avatar
              alt={country?.label}
              className="w-6 h-6"
              src={country?.description}
            />
          }
        >
          {country?.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );

  const stateField = () => {
    return (
      <Input
        className="max-w-xs"
        // label={l?.state}
        placeholder={l?.state}
        variant="bordered"
        size="lg"
        radius="full"
        value={newArea?.state} // Bind the current value of newArea.state
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
        // label={l?.city}
        placeholder={l?.city}
        radius="full"
        variant="bordered"
        size="lg"
        value={newArea?.city} // Bind the current value of newArea.state
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
        // label={l?.town}
        placeholder={l?.town}
        radius="full"
        variant="bordered"
        size="lg"
        value={newArea?.town} // Bind the current value of newArea.state
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
        <div className="w-12">{l?.map}</div>
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
                className=" bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height={276}
                mode="place"
                q={`${newArea?.town},${newArea?.city},${newArea?.state},${newArea?.country}`}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  const MapCard2 = () => {
    return (
      <div className="flex justify-center items-center m-4 h-[80vh]">
        <Card className="w-full mt-5 max-w-[900px]">
          <CardHeader className="pb-0 p-2 px-4 flex-col items-start uppercase tracking-wide">
            <p className="text-tiny  font-bold">{area?.state}</p>
            <small className="text-default-500 ">{area?.country}</small>
            <h4 className="font-bold text-large ">{`${area?.city} ${area?.town}`}</h4>
          </CardHeader>
          <CardBody className={`m-0 p-0 h-[450px]  md:h-[500px]`}>
            <div className="md:hidden">
              <GoogleMapsEmbed
                className="bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height="450"
                mode="place"
                q={`${area?.town},${area?.city},${area?.state},${area?.country}`}
              />
            </div>
            <div className="md:block hidden">
              <GoogleMapsEmbed
                className="bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height="500"
                mode="place"
                q={`${area?.town},${area?.city},${area?.state},${area?.country}`}
              />
            </div>
          </CardBody>
        </Card>
      </div>
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

  const toDB = async (adsId, area, fn) => {
    try {
      setLoading(true);
      const saveArea = await createAD({ ...ad, adsId, area });
      dispatch(setAd(saveArea));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fn();
    }
  };

  const handleSave = (fn) => {
    const adsId = ad._id;
    toDB(adsId, newArea, fn);
    fetchAds();
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
          <div className="text-3xl font-semibold">{l?.area}</div>
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
            {l?.area_button}
          </Button>
          <Button
            className="md:hidden"
            color="default"
            variant="flat"
            radius="full"
            isIconOnly
            onPress={onOpen}
          >
            <AddLocationIcon fontSize={"medium"} />
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="lg"
            onClose={() => {
              setShowMap(false);
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 ">
                    <div className="flex justify-start items-center w-full ">
                      {MapSwitch()}
                      <div className="w-full flex justify-center items-center mr-[90px]">
                        <div>{l?.area}</div>
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody className="flex flex-col justify-center items-center gap-4 p-4 ">
                    {showMap ? (
                      <MapCard />
                    ) : (
                      <ScrollShadow className="w-full flex flex-col  items-center gap-3 h-[160px] md:h-[250px] p-2">
                        {townField()}
                        {cityField()}
                        {stateField()}
                        {countryAutocomplete()}
                      </ScrollShadow>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex flex-col gap-3 w-full">
                      <Divider />
                      <div className="flex justify-between items-center">
                        <Button
                          variant="light"
                          onPress={() => {
                            // closeModal();
                            onClose();
                          }}
                          size="md"
                          radius="full"
                        >
                          {l?.cancel}
                          {/* {photos?.length === 0 ? lang?.done : lang?.cancel} */}
                        </Button>
                        <Button
                          color="primary"
                          size="md"
                          radius="full"
                          isDisabled={
                            newArea.country === "" || newArea.country === null
                          }
                          isLoading={loading}
                          onPress={() => {
                            handleSave(onClose);
                            // onClose();
                            // closeModal();
                          }}
                        >
                          {l?.title_save}
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

      <ScrollShadow className="h-[94vh]" hideScrollBar={true}>
        {area?.country === "" && (
          <div className="mb-6 mt-2 text-default-400 hidden md:block ">
            {l?.area_content}
          </div>
        )}

        {area?.country ? <MapCard2 /> : <M />}
      </ScrollShadow>
    </div>
  );
}
