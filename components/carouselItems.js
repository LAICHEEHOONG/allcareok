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
  { label: service_type.home_cleaning, icon: GiBroom, id: "home_cleaning" },
  {
    label: service_type.aircon_servicing,
    icon: TbAirConditioning,
    id: "aircon_servicing",
  },
  {
    label: service_type.move_in_out_cleaning,
    icon: HouseIcon,
    id: "move_in_out_cleaning",
  },
  { label: service_type.sofa_cleaning, icon: ChairIcon, id: "sofa_cleaning" },
  {
    label: service_type.mattress_cleaning,
    icon: BedIcon,
    id: "mattress_cleaning",
  },
  {
    label: service_type.curtain_cleaning,
    icon: GiTheaterCurtains,
    id: "curtain_cleaning",
  },
  {
    label: service_type.car_washing,
    icon: LocalCarWashIcon,
    id: "car_washing",
  },
  {
    label: service_type.disinfection_service,
    icon: BiSolidVirusBlock,
    id: "disinfection_service",
  },
  {
    label: service_type.landscaping_service,
    icon: ForestIcon,
    id: "landscaping_service",
  },
  {
    label: service_type.handyman_services,
    icon: HandymanIcon,
    id: "handyman_services",
  },
  {
    label: service_type.painting_services,
    icon: FormatPaintIcon,
    id: "painting_services",
  },
  { label: service_type.moving_service, icon: FaBox, id: "moving_service" },
  {
    label: service_type.flooring_services,
    icon: GiFloorPolisher,
    id: "flooring_services",
  },
  {
    label: service_type.pest_control,
    icon: PestControlIcon,
    id: "pest_control",
  },
  {
    label: service_type.elderly_care,
    icon: ElderlyWomanIcon,
    id: "elderly_care",
  },
  { label: service_type.child_care, icon: LuBaby, id: "child_care" },
  {
    label: service_type.full_time_maid,
    icon: FaPeopleGroup,
    id: "full_time_maid",
  },
];
