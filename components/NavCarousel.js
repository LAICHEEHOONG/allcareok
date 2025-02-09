"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCarouselItems } from "./carouselItems";
import { useState, useEffect } from "react";
import { setServiceType } from "@/redux/features/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export function NavCarousel({ service_type }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const carouselItems = getCarouselItems(service_type);
  const [activeIndex, setActiveIndex] = useState(null);
  const area = useSelector((state) => state.search?.value);
  const serviceType = useSelector((state) => state.search?.serviceType);

  const handleItemClick = (label, id) => {
    if (serviceType === id) {
      dispatch(setServiceType(""));
      setActiveIndex(null);
      router.push(`?area=${area}&serviceType=${""}`);
      return;
    }
    setActiveIndex(label);
    dispatch(setServiceType(id));
    router.push(`?area=${area}&serviceType=${id}`);
  };
  // const handleItemClick = (label, id) => {
  //   const newServiceType = serviceType === id ? "" : id;
  //   setActiveIndex(newServiceType ? id : null);
  //   dispatch(setServiceType(newServiceType));

  //   // Create a clean and structured URL
  //   const params = new URLSearchParams();
  //   if (area) params.set("area", area);
  //   if (newServiceType) params.set("serviceType", newServiceType);

  //   router.push(`?${params.toString()}`);
  // };

  return (
    <Carousel
      // className="w-full sm:w-10/12 h-20"
      className="w-full  h-20"
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
      }}
    >
      <CarouselContent className="-ml-1">
        {carouselItems.map(({ label, icon: Icon, id }, idx) => (
          <CarouselItem
            key={idx}
            className="pl-1 basis-1/7 cursor-pointer group select-none z-30"
            onClick={() => {
              handleItemClick(label, id);
            }}
            // onClick={() => {
            //   handleItemClick(label);
            //   dispatch(setServiceType(id));
            //   router.push(`?area=${area}&serviceType=${id}`);
            // }}
          >
            {/* <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85 transition-transform">
              <Icon
                className={`w-6 h-6 ${
                  activeIndex === label ? "text-[#f31260]" : "text-default-500"
                } group-hover:text-[#f31260]`}
              />
              <div
                className={`text-xs font-semibold mt-1 group-hover:text-[#f31260] ${
                  activeIndex === label
                    ? "text-[#f31260] border-b-2 border-[#f31260] pb-3"
                    : "text-default-500"
                }`}
              >
                {label}
              </div>
            </div> */}

            <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85 transition-transform">
              <Icon
                className={`w-6 h-6 ${
                  activeIndex === label ? "text-[#f31260]" : "text-default-500"
                }`}
              />
              <div
                className={`text-xs font-semibold mt-1 ${
                  activeIndex === label
                    ? "text-[#f31260] border-b-2 border-[#f31260] pb-3"
                    : "text-default-500"
                }`}
              >
                {label}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
