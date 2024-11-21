"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export function NavCarousel() {
  return (
    <Carousel
      className="w-full sm:w-10/12"
      opts={{
        align: "start",
        loop: true,
        dragFree:true
      }}
    >
      <CarouselContent className="-ml-1">
        {Array.from({ length: 18 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-3 basis-1/7 cursor-pointer group select-none"
          >
            <div className="flex justify-center flex-col items-center gap-1 m-3 group-hover:text-default-900 active:scale-80 transition-transform">
              {/* Apply active effect for shrink animation */}
              <CleaningServicesIcon className="w-5 text-default-500 group-hover:text-default-900" />
              <div className="text-xs font-semibold text-default-500 group-hover:text-default-900">
                {"Castles" + index}
              </div>
            </div>
          </CarouselItem>
          // <CarouselItem
          //   key={index}
          //   className="pl-3 basis-1/7 cursor-pointer group" // Add 'group' class
          // >
          //   <div className="flex justify-center flex-col items-center gap-1 m-3 group-hover:text-default-900">
          //     {/* Apply hover to the entire group */}
          //     <CleaningServicesIcon className="w-5 text-default-500 group-hover:text-default-900" />
          //     {/* Change icon color on hover */}
          //     <div className="text-xs font-semibold text-default-500 group-hover:text-default-900">
          //       {/* Change text color on hover */}
          //       {"Castles" + index}
          //     </div>
          //   </div>
          // </CarouselItem>
          // <CarouselItem key={index} className="pl-3 basis-1/7">
          //   <div className="flex justify-center flex-col items-center gap-1 m-3">
          //     <CleaningServicesIcon className="w-5 text-default-500" />
          //     <div className="text-xs font-semibold text-default-500">
          //       {"Castles" + index}
          //     </div>
          //   </div>
          // </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
