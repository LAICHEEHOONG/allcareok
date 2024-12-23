import { Button, ScrollShadow } from "@nextui-org/react";
import { getCarouselItems } from "../carouselItems";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import { createAD, findUserAds } from "@/lib/action/adAction";

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
      // if (isSmallScreen) {
      //   dispatch(setPopUp());
      // }
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    const newService = serviceItem
      .filter((item) => item.selected)
      .map((item) => item.id);

    toDB(adsId, newService);
    fetchAds();
    // const newAd = { ...ad, service: newService };
    // dispatch(setAd(newAd));
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
    <div className="h-screen w-full ">
      <div className="flex justify-center items-center mb-5">
        <div className="w-full max-w-[500px] flex justify-between items-center">
          <div className="text-3xl font-semibold">{"Types of Services"}</div>
          <Button
            radius="full"
            size="lg"
            color="primary"
            onPress={handleSave}
            isLoading={loading}
          >
            {"Save"}
          </Button>
        </div>
      </div>

      <ScrollShadow
        hideScrollBar
        className="w-full flex justify-center items-start h-[90vh]"
      >
        <div className="flex flex-col gap-6 justify-center items-center p-5 w-full">
          {serviceItem.map(({ label, icon: Icon, selected }, idx) => (
            <div
              key={idx}
              className="text-default-500 flex justify-between items-center w-full max-w-[500px]"
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
                onPress={() => {
                  handleAddService(label);
                }}
              >
                {selected ? <CheckIcon /> : <AddIcon />}{" "}
              </Button>
            </div>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
