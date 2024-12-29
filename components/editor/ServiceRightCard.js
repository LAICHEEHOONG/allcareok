import { Button, ScrollShadow } from "@nextui-org/react";
import { getCarouselItems } from "../carouselItems";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { setAd, setAds, setPopUp } from "@/redux/features/editor/editorSlice";
import { createAD, findUserAds } from "@/lib/action/adAction";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 2,
  1300: 1,
};

export default function ServiceRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const carouselItems = getCarouselItems(service_type);
  const initService = carouselItems.map((item) => ({
    ...item,
    selected: false,
  }));
  const [serviceItem, setServiceItem] = useState(initService);
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize(); // Initialize state
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleAddService = (label) => {
    let newService = serviceItem.map((item) => {
      if (item.label === label) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    setServiceItem(newService);
  };

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, newService) => {
    try {
      setLoading(true);
      const updateService = await createAD({
        ...ad,
        adsId,
        service: newService,
      });
      dispatch(setAd(updateService));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      if (isSmallScreen) {
        dispatch(setPopUp());
      }
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    const newService = serviceItem
      .filter((item) => item.selected)
      .map((item) => item.id);

    toDB(adsId, newService);
    fetchAds();

  };

  useEffect(() => {
    setServiceItem((prevState) =>
      prevState.map((item) => {
        const isSelected = ad.service.includes(item.id); // Check if the item's id exists in ad.service
        return {
          ...item,
          selected: isSelected, // Update the selected status based on ad.service
        };
      })
    );
  }, []);

  return (
    <div className="h-[50vh] md:h-screen w-full ">
      <div className="flex justify-center items-start mb-5">
        <div className="w-full max-w-[1000px] flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-semibold">
            {`${l?.service}`}
          </div>
          <Button
            radius="full"
            size="md"
            color="primary"
            onPress={handleSave}
            isLoading={loading}
          >
            {l?.title_save}
          </Button>
        </div>
      </div>

      <ScrollShadow
        hideScrollBar
        className="flex justify-center w-full h-[40vh] md:h-[90vh]"
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid !w-full max-w-[1000px]"
          columnClassName="my-masonry-grid_column flex flex-col gap-3 items-center p-5"
        >
          {serviceItem.map(({ label, icon: Icon, selected }, idx) => (
            <div
              key={idx}
              className="text-default-500 flex justify-between items-center w-full max-w-[400px]  m-3 "
            >
              <div className="flex gap-5">
                <Icon className={`w-6 h-6 `} />
                <div>{label}</div>
              </div>

              <Button
                isIconOnly
                color={selected ? "primary" : "default"}
                aria-label="service selector Icon"
                radius="full"
                variant={selected ? "solid" : "flat"}
                size="sm"
                onPress={() => {
                  handleAddService(label);
                }}
              >
                {selected ? <CheckIcon /> : <AddIcon />}
              </Button>
            </div>
          ))}
        </Masonry>
      </ScrollShadow>
    </div>
  );
}
