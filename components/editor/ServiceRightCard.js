import { Button, ScrollShadow } from "@nextui-org/react";
import { getCarouselItems } from "../carouselItems";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";

export default function ServiceRightCard() {
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const carouselItems = getCarouselItems(service_type);
  const initService = carouselItems.map((item) => ({
    ...item,
    selected: false,
  }));
  const [serviceItem, setServiceItem] = useState(initService);

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

  useEffect(() => {
    console.log(carouselItems);
  }, [carouselItems]);

  return (
    <div className="h-screen w-full md:pl-2">
      <div className="flex justify-between items-start mb-2 max-w-[1600px]">
        <div className="flex justify-center items-center gap-3">
          <div className="text-3xl font-semibold">{"Types of Services"}</div>
        </div>
        <>
          <Button
            className="md:flex hidden"
            radius="full"
            size="lg"
            color="primary"
          >
            {"Save"}
          </Button>
        </>
      </div>

      <ScrollShadow className="w-full flex justify-center items-start  h-[90vh]">
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

              {/* <Button
                className=""
                isIconOnly
                radius="full"
                // color={selected ? "primary" : "default"}

                color={selected ? "default" : "primary"}
                variant={selected ? "flat" : "default"}
                aria-label="add service button"
                size="md"
                onPress={() => {
                  handleAddService(label)
                }}
              >
                {selected ? <CheckIcon /> : <AddIcon />}
              </Button> */}
              <Button
                isIconOnly
                color={selected ? "primary" : "default"}
                aria-label="service selector Icon"
                radius="full"
                variant={selected ? "solid" : "light"}

                onPress={() => {
                  handleAddService(label)
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
