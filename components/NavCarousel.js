"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Chip } from "@nextui-org/react";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export function NavCarousel() {
  return (
    <Carousel
      className="w-8/12 m-1"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="pl-3 basis-1/7">
            <div className="flex justify-center flex-col items-center gap-1 m-1">
              <CleaningServicesIcon className="w-5 text-default-500" />
              <div className="text-xs font-semibold text-default-500">
                {"Castles" + index}
              </div>
            </div>
            {/* <Chip color="default" radius="full" variant="light" className="pt-4 ">
 
          
            </Chip> */}
            {/* <Button color="primary" variant="light">
              Light
            </Button> */}
            {/* <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center ">
                  <span className=" font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div> */}
          </CarouselItem>
          //   <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
          //     <div className="p-1">
          //       <Card>
          //         <CardContent className="flex aspect-square items-center justify-center p-6">
          //           <span className="text-2xl font-semibold">{index + 1}</span>
          //         </CardContent>
          //       </Card>
          //     </div>
          //   </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// export function NavCarousel() {
//     return (
//       <Carousel className="w-full">
//         <CarouselContent className="-ml-1 flex">
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem key={index} className="pl-1">
//               <div className="p-1">
//                 <Card className="w-14 h-14"> {/* 56px = 14rem */}
//                   <CardContent className="flex items-center justify-center w-full h-full">
//                     <span className="text-base font-semibold">{index + 1}</span>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     )
//   }
