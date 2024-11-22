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
// import { TbAirConditioning } from "react-icons/tb";
// import HouseIcon from "@mui/icons-material/House";
// import ChairIcon from '@mui/icons-material/Chair';

// export function NavCarousel2() {
//   const [activeIndex, setActiveIndex] = React.useState(null);

//   const handleItemClick = (index) => {
//     setActiveIndex(index); // Update the active index when an item is clicked
//   };

//   React.useEffect(() => {
//     console.log(activeIndex);
//   }, [activeIndex]);

//   return (
//     <Carousel
//       className="w-full sm:w-10/12 h-20"
//       opts={{
//         align: "start",
//         loop: true,
//         dragFree: true,
//       }}
//     >
//       <CarouselContent className="-ml-1">
//         <CarouselItem
//           className="pl-3 basis-1/7 cursor-pointer group select-none z-30 "
//           onClick={() => handleItemClick("Home Cleaning")}
//         >
//           <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85  transition-transform">
//             <CleaningServicesIcon
//               className={`w-6 ${
//                 activeIndex === "Home Cleaning"
//                   ? "text-black"
//                   : "text-default-500"
//               } group-hover:text-default-900`}
//             />

//             <div
//               className={`text-xs font-semibold mt-1 group-hover:text-default-900 ${
//                 activeIndex === "Home Cleaning"
//                   ? "text-black border-b-2 border-black pb-3"
//                   : "text-default-500  "
//               }`}
//             >
//               {"Home Cleaning"}
//             </div>
//           </div>
//         </CarouselItem>
//         <CarouselItem
//           className="pl-3 basis-1/7 cursor-pointer group select-none z-30 "
//           onClick={() => handleItemClick("Aircon Servicing")}
//         >
//           <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85  transition-transform">
//             <TbAirConditioning
//               className={`w-6 h-6 ${
//                 activeIndex === "Aircon Servicing"
//                   ? "text-black"
//                   : "text-default-500"
//               } group-hover:text-default-900`}
//             />

//             <div
//               className={`text-xs font-semibold mt-1 group-hover:text-default-900 ${
//                 activeIndex === "Aircon Servicing"
//                   ? "text-black border-b-2 border-black pb-3"
//                   : "text-default-500  "
//               }`}
//             >
//               {"Aircon Servicing"}
//             </div>
//           </div>
//         </CarouselItem>
//         <CarouselItem
//           className="pl-3 basis-1/7 cursor-pointer group select-none z-30 "
//           onClick={() => handleItemClick("Move In/Out Cleaning")}
//         >
//           <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85  transition-transform">
//             <HouseIcon
//               className={`w-6 h-6 ${
//                 activeIndex === "Move In/Out Cleaning"
//                   ? "text-black"
//                   : "text-default-500"
//               } group-hover:text-default-900`}
//             />

//             <div
//               className={`text-xs font-semibold mt-1 group-hover:text-default-900 ${
//                 activeIndex === "Move In/Out Cleaning"
//                   ? "text-black border-b-2 border-black pb-3"
//                   : "text-default-500  "
//               }`}
//             >
//               {"Move In/Out Cleaning"}
//             </div>
//           </div>
//         </CarouselItem>
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
import { TbAirConditioning } from "react-icons/tb";
import HouseIcon from "@mui/icons-material/House";
import ChairIcon from '@mui/icons-material/Chair';
import BedIcon from '@mui/icons-material/Bed';
import { GiTheaterCurtains } from "react-icons/gi";
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import { BiSolidVirusBlock } from "react-icons/bi";
import ForestIcon from '@mui/icons-material/Forest';
import HandymanIcon from '@mui/icons-material/Handyman';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { FaBox } from "react-icons/fa";
import { GiFloorPolisher } from "react-icons/gi";
import PestControlIcon from '@mui/icons-material/PestControl';
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman';
import { LuBaby } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";

// Define icons and labels in a list
const carouselItems = [
  {
    label: "Home Cleaning",
    icon: CleaningServicesIcon,
  },
  {
    label: "Aircon Servicing",
    icon: TbAirConditioning,
  },
  {
    label: "Move In/Out Cleaning",
    icon: HouseIcon,
  },
  {
    label: 'Sofa Cleaning',
    icon: ChairIcon
  },
  {
    label: 'Mattress Cleaning',
    icon: BedIcon
  },
  {
    label: 'Curtain Cleaning',
    icon: GiTheaterCurtains
  },
  {
    label: 'Car Washing',
    icon: LocalCarWashIcon
  },
  {
    label: 'Disinfection Service',
    icon: BiSolidVirusBlock
  },
  {
    label: 'Landscaping Service',
    icon: ForestIcon
  },
  {
    label: 'Handyman Services',
    icon: HandymanIcon
  },
  {
    label: 'Painting Services',
    icon: FormatPaintIcon
  },
  {
    label: 'Moving Service',
    icon: FaBox
  },
  {
    label: 'Flooring Services',
    icon: GiFloorPolisher
  },
  {
    label: 'Pest Control',
    icon: PestControlIcon
  },
  {
    label: 'Elderly Care',
    icon: ElderlyWomanIcon
  },
  {
    label: 'Child Care',
    icon: LuBaby
  },
  {
    label: 'Full Time Maid',
    icon: FaPeopleGroup
  },
];

export function NavCarousel2() {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index); // Update the active index when an item is clicked
  };

  React.useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);

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
            className="pl-3 basis-1/7 cursor-pointer group select-none z-30"
            onClick={() => handleItemClick(label)}
          >
            <div className="flex justify-center flex-col items-center gap-1 m-3 active:scale-85 transition-transform">
              <Icon
                className={`w-6 h-6 ${
                  activeIndex === label
                    ? "text-black"
                    : "text-default-500"
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