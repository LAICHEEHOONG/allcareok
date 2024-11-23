"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TbAirConditioning } from "react-icons/tb";
import HouseIcon from "@mui/icons-material/House";
import ChairIcon from "@mui/icons-material/Chair";
import BedIcon from "@mui/icons-material/Bed";
import { GiTheaterCurtains } from "react-icons/gi";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import { BiSolidVirusBlock } from "react-icons/bi";
import ForestIcon from "@mui/icons-material/Forest";
import HandymanIcon from "@mui/icons-material/Handyman";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import { FaBox } from "react-icons/fa";
import { GiFloorPolisher } from "react-icons/gi";
import PestControlIcon from "@mui/icons-material/PestControl";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import { LuBaby } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiBroom } from "react-icons/gi";
import { usePathname } from "next/navigation";

export function NavCarousel({ service_type }) {
  // Define icons and labels in a list

  const carouselItems = [
    {
      label: service_type.home_cleaning,
      icon: GiBroom,
    },
    {
      label: service_type.aircon_servicing,
      icon: TbAirConditioning,
    },
    {
      label: service_type.move_in_out_cleaning,
      icon: HouseIcon,
    },
    {
      label: service_type.sofa_cleaning,
      icon: ChairIcon,
    },
    {
      label: service_type.mattress_cleaning,
      icon: BedIcon,
    },
    {
      label: service_type.curtain_cleaning,
      icon: GiTheaterCurtains,
    },
    {
      label: service_type.car_washing,
      icon: LocalCarWashIcon,
    },
    {
      label: service_type.disinfection_service,
      icon: BiSolidVirusBlock,
    },
    {
      label: service_type.landscaping_service,
      icon: ForestIcon,
    },
    {
      label: service_type.handyman_services,
      icon: HandymanIcon,
    },
    {
      label: service_type.painting_services,
      icon: FormatPaintIcon,
    },
    {
      label: service_type.moving_service,
      icon: FaBox,
    },
    {
      label: service_type.flooring_services,
      icon: GiFloorPolisher,
    },
    {
      label: service_type.pest_control,
      icon: PestControlIcon,
    },
    {
      label: service_type.elderly_care,
      icon: ElderlyWomanIcon,
    },
    {
      label: service_type.child_care,
      icon: LuBaby,
    },
    {
      label: service_type.full_time_maid,
      icon: FaPeopleGroup,
    },
  ];
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index); // Update the active index when an item is clicked
  };

  React.useEffect(() => {
    // console.log(activeIndex);
  }, [activeIndex]);

  const pathname = usePathname();
  const isDashboard = pathname.endsWith("/dashboard");

  // React.useEffect(() => {
  //   console.log(isDashboard);
  // }, [isDashboard]);

  return (
    <>
      {isDashboard ? (
        <></>
      ) : (
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
      )}
    </>
  );
}
