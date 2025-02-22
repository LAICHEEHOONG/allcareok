"use client";
import { getCarouselItems } from "../carouselItems";
import { useEffect, useState, useMemo } from "react";
import { Divider } from "@heroui/react";
import { Fade } from "react-awesome-reveal";

export default function ServiceType({
  service,
  service_type,
  service_type_description,
}) {
  const [carouselItems, setCarouselItems] = useState([]);

  // Fetch carousel items based on service_type
  useEffect(() => {
    setCarouselItems(getCarouselItems(service_type, service_type_description));
  }, [service_type, service_type_description]);

  // Create a map for efficient lookup of carousel items
  const itemMap = useMemo(() => {
    const map = new Map();
    carouselItems.forEach((item) => {
      if (item?.id) {
        map.set(item.id, item);
      }
    });

    return map;
  }, [carouselItems]);

  return (
    <Fade className="flex flex-col gap-4 space-y-4 py-4 ">
      {service?.map((serv) => {
        const match = itemMap.get(serv);
        return match ? (
          <div key={serv} className="flex items-center gap-2">
            <match.icon className="!w-6 !h-6 m-4 text-gray-600" />
            <div className="text-left">
              <div className="w-full max-w-[300px] x950l:max-w-[500px]">
                <div className="text-lg font-medium truncate tracking-wide">
                  {match?.label}
                </div>
              </div>
              <div className="w-full max-w-[300px] x950l:max-w-[500px]">
                <div className="text-sm text-gray-600 tracking-wide">
                  {match?.description}
                </div>
              </div>
            </div>

            {/* <div className="text-lg font-semibold">{match?.label}</div> */}
          </div>
        ) : null;
      })}
      {/* <Divider /> */}
    </Fade>
  );
}
