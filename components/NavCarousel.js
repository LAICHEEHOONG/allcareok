

// "use client";
// import * as React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

// export function NavCarousel() {
//   const [activeIndex, setActiveIndex] = React.useState(null);

//   const handleItemClick = (index) => {
//     setActiveIndex(index); // Update the active index when an item is clicked
//   };

//   return (
//     <Carousel
//       className="w-full sm:w-10/12"
//       opts={{
//         align: "start",
//         loop: true,
//         dragFree: true,
//       }}
//     >
//       <CarouselContent className="-ml-1">
//         {Array.from({ length: 18 }).map((_, index) => (
//           <CarouselItem
//             key={index}
//             className="pl-3 basis-1/7 cursor-pointer group select-none z-30"
//             onClick={() => handleItemClick(index)}
//           >
//             <div
//               className={`flex justify-center flex-col items-center gap-1 m-3 group-hover:text-default-900 active:scale-80 transition-transform `}
//             >
//               <CleaningServicesIcon
//                 className={`w-6 ${
//                   activeIndex === index ? "text-black" : "text-default-500"
//                 } group-hover:text-default-900`}
//               />
//               <div
//                 className={`text-xs font-semibold mt-1 group-hover:text-default-900 ${
//                   activeIndex === index ? "text-black" : "text-default-500"
//                 }`}
//               >
//                 {"Castles" + index}
//               </div>
//             </div>
//             {activeIndex === index && (
//               <div className="text-black border-b-2 border-black"></div>
//             )}
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious className="hidden sm:flex" />
//       <CarouselNext className="hidden sm:flex" />
//     </Carousel>
//   );
// }

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
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index); // Update the active index when an item is clicked
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
        {Array.from({ length: 18 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-3 basis-1/7 cursor-pointer group select-none z-30 "
            onClick={() => handleItemClick(index)}
          >
            <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85  transition-transform">
              <CleaningServicesIcon
                className={`w-6 ${
                  activeIndex === index ? "text-black" : "text-default-500"
                } group-hover:text-default-900`}
              />
              <div
                className={`text-xs font-semibold mt-1 group-hover:text-default-900 ${
                  activeIndex === index
                    ? "text-black border-b-2 border-black pb-3"
                    : "text-default-500  group-hover:border-b-2  group-hover:pb-3"
                }`}
              >
                {"Castles" + index}
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