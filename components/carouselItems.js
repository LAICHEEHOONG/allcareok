// carouselItems.js
import { GiBroom } from "react-icons/gi";
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

export const getCarouselItems = (service_type) => [
  { label: service_type.home_cleaning, icon: GiBroom },
  { label: service_type.aircon_servicing, icon: TbAirConditioning },
  { label: service_type.move_in_out_cleaning, icon: HouseIcon },
  { label: service_type.sofa_cleaning, icon: ChairIcon },
  { label: service_type.mattress_cleaning, icon: BedIcon },
  { label: service_type.curtain_cleaning, icon: GiTheaterCurtains },
  { label: service_type.car_washing, icon: LocalCarWashIcon },
  { label: service_type.disinfection_service, icon: BiSolidVirusBlock },
  { label: service_type.landscaping_service, icon: ForestIcon },
  { label: service_type.handyman_services, icon: HandymanIcon },
  { label: service_type.painting_services, icon: FormatPaintIcon },
  { label: service_type.moving_service, icon: FaBox },
  { label: service_type.flooring_services, icon: GiFloorPolisher },
  { label: service_type.pest_control, icon: PestControlIcon },
  { label: service_type.elderly_care, icon: ElderlyWomanIcon },
  { label: service_type.child_care, icon: LuBaby },
  { label: service_type.full_time_maid, icon: FaPeopleGroup },
];