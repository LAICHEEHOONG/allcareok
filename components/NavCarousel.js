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

export function NavCarousel({ service_type }) {
  const carouselItems = getCarouselItems(service_type);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

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
        {carouselItems.map(({ label, icon: Icon }, idx) => (
          <CarouselItem
            key={idx}
            className="pl-1 basis-1/7 cursor-pointer group select-none z-30"
            onClick={() => handleItemClick(label)}
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
                } ${!isTouchDevice ? "group-hover:text-[#f31260]" : ""}`}
              />
              <div
                className={`text-xs font-semibold mt-1 ${
                  activeIndex === label
                    ? "text-[#f31260] border-b-2 border-[#f31260] pb-3"
                    : "text-default-500"
                } ${!isTouchDevice ? "group-hover:text-[#f31260]" : ""}`}
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
