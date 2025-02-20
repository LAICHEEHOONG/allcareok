// "use client";
// import { getCarouselItems } from "../carouselItems";
// import { useEffect, useState } from "react";
// import { Divider } from "@heroui/react";

// export default function ServiceType({ service, service_type }) {
//   const [carouselItems, setCarouselItems] = useState([]);
//   useEffect(() => {
//     setCarouselItems(getCarouselItems(service_type));
//   }, [service_type]);

//   useEffect(() => {
//     console.log(carouselItems);
//   }, [carouselItems]);

//   return (
//     <div>
//       {service?.map((serv, i) => {
//         const match = carouselItems.find((item) => item?.id === serv);
//         return match ? (
//           <div key={`${crypto.randomUUID()}`} className="flex ">
//             <match.icon className="!w-6 !h-6" />
//             <div className="text-lg font-semibold">{match?.label}</div>
//           </div>
//         ) : null;
//       })}
//       <Divider />
//     </div>
//   );
// }

"use client";
import { getCarouselItems } from "../carouselItems";
import { useEffect, useState, useMemo } from "react";
import { Divider } from "@heroui/react";

export default function ServiceType({ service, service_type }) {
  const [carouselItems, setCarouselItems] = useState([]);

  // Fetch carousel items based on service_type
  useEffect(() => {
    setCarouselItems(getCarouselItems(service_type));
  }, [service_type]);

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
    <div className="flex flex-col gap-4 ">
      {service?.map((serv) => {
        const match = itemMap.get(serv);
        return match ? (
          <div key={serv} className="flex items-center gap-2">
            <match.icon className="!w-6 !h-6" />
            <div className="text-lg font-semibold">{match?.label}</div>
          </div>
        ) : null;
      })}
      <Divider />
    </div>
  );
}