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
import { Fade } from "react-awesome-reveal";

export function NavCarousel({ service_type }) {
  const carouselItems = getCarouselItems(service_type);
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Carousel
      className="w-full sm:w-10/12 h-20"
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
            <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85 transition-transform">
              <Icon
                className={`w-6 h-6 ${
                  activeIndex === label ? "text-black" : "text-default-500"
                } group-hover:text-default-900`}
              />
              <div
                className={`text-xs font-semibold mt-1 group-hover:text-default-900 ${
                  activeIndex === label
                    ? "text-black border-b-2 border-black pb-3"
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
