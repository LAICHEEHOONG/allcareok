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
  const area = useSelector((state) => state.search?.area);
  const serviceType = useSelector((state) => state.search?.serviceType);

  const handleItemClick = (label, id) => {
    if (serviceType === id) {
      dispatch(setServiceType(""));
      setActiveIndex(null);
      router.push(`?area=${area ? area : ""}&serviceType=${""}`);
      return;
    }
    setActiveIndex(label);
    dispatch(setServiceType(id));
    router.push(`?area=${area ? area : ""}&serviceType=${id}`);
  };

  // useEffect(() => {
  //   const selectedService = carouselItems.filter(
  //     (item) => item.id === serviceType
  //   );
  //   if (selectedService[0]?.label) {
  //     setActiveIndex(selectedService[0]?.label);
  //   }

  //   if(!serviceType) {
  //     dispatch(setServiceType(''))
  //   }

  // }, [serviceType]);

  useEffect(() => {
    if (!serviceType || serviceType === null || serviceType === undefined) {
      setActiveIndex("");
    }

    const selectedService = carouselItems.find(
      (item) => item.id === serviceType
    );
    if (selectedService?.label) {
      setActiveIndex(selectedService.label);
    }
    console.log(serviceType);
  }, [serviceType]);

  // useEffect(() => {
  //   if(serviceType) {
  //     setActiveIndex(serviceType)
  //   }
  // }, [serviceType])

  return (
    <Carousel
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
          >
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
