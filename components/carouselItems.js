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
import { LiaUserNurseSolid } from "react-icons/lia";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";

import { MdElectricBolt } from "react-icons/md";
import { MdPlumbing } from "react-icons/md";
import { MdOutlineRoofing } from "react-icons/md";
import { MdOutlineCarpenter } from "react-icons/md";
import { GiCrackedGlass } from "react-icons/gi";
import { CiUnlock } from "react-icons/ci";
import { GiAutoRepair } from "react-icons/gi";
import { MdOutlineDesignServices } from "react-icons/md";
import { GiFoodTruck } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { PiSecurityCamera } from "react-icons/pi";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import { TbMassage } from "react-icons/tb";
import { BiTaxi } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlinePool } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { RiSpyLine } from "react-icons/ri";
import { BiCabinet } from "react-icons/bi";

export const getCarouselItems = (service_type, service_type_description) => [
  {
    label: service_type.home_cleaning,
    description: service_type_description?.home_cleaning,
    icon: GiBroom,
    id: "home_cleaning",
  },
  {
    label: service_type.aircon_servicing,
    description: service_type_description?.aircon_servicing,
    icon: TbAirConditioning,
    id: "aircon_servicing",
  },
  {
    label: service_type.move_in_out_cleaning,
    description: service_type_description?.move_in_out_cleaning,
    icon: HouseIcon,
    id: "move_in_out_cleaning",
  },
  {
    label: service_type.sofa_cleaning,
    description: service_type_description?.sofa_cleaning,
    icon: ChairIcon,
    id: "sofa_cleaning",
  },
  {
    label: service_type.mattress_cleaning,
    description: service_type_description?.mattress_cleaning,
    icon: BedIcon,
    id: "mattress_cleaning",
  },
  {
    label: service_type.curtain_cleaning,
    description: service_type_description?.curtain_cleaning,
    icon: GiTheaterCurtains,
    id: "curtain_cleaning",
  },
  {
    label: service_type.car_washing,
    description: service_type_description?.car_washing,
    icon: LocalCarWashIcon,
    id: "car_washing",
  },
  {
    label: service_type.disinfection_service,
    description: service_type_description?.disinfection_service,
    icon: BiSolidVirusBlock,
    id: "disinfection_service",
  },
  {
    label: service_type.landscaping_service,
    description: service_type_description?.landscaping_service,
    icon: ForestIcon,
    id: "landscaping_service",
  },
  {
    label: service_type.handyman_services,
    description: service_type_description?.handyman_services,
    icon: HandymanIcon,
    id: "handyman_services",
  },
  {
    label: service_type.painting_services,
    description: service_type_description?.painting_services,
    icon: FormatPaintIcon,
    id: "painting_services",
  },
  {
    label: service_type.moving_service,
    description: service_type_description?.moving_service,
    icon: FaBox,
    id: "moving_service",
  },
  {
    label: service_type.flooring_services,
    description: service_type_description?.flooring_services,
    icon: GiFloorPolisher,
    id: "flooring_services",
  },
  {
    label: service_type.pest_control,
    description: service_type_description?.pest_control,
    icon: PestControlIcon,
    id: "pest_control",
  },
  {
    label: service_type.elderly_care,
    description: service_type_description?.elderly_care,
    icon: ElderlyWomanIcon,
    id: "elderly_care",
  },
  {
    label: service_type.child_care,
    description: service_type_description?.child_care,
    icon: LuBaby,
    id: "child_care",
  },
  {
    label: service_type.full_time_maid,
    description: service_type_description?.full_time_maid,
    icon: FaPeopleGroup,
    id: "full_time_maid",
  },
  {
    label: service_type.nurse,
    description: service_type_description?.nurse,
    icon: LiaUserNurseSolid,
    id: "nurse",
  },
  {
    label: service_type.renovate,
    description: service_type_description?.renovate,
    icon: GiFamilyHouse,
    id: "renovate",
  },
  {
    label: service_type.pet_grooming,
    description: service_type_description?.pet_grooming,
    icon: MdOutlinePets,
    id: "pet_grooming",
  },
  {
    label: service_type.electrical_services,
    description: service_type_description?.electrical_services,
    icon: MdElectricBolt,
    id: "electrical_services",
  },
  {
    label: service_type.plumbing_services,
    description: service_type_description?.plumbing_services,
    icon: MdPlumbing,
    id: "plumbing_services",
  },
  {
    label: service_type.roof_repair,
    description: service_type_description?.roof_repair,
    icon: MdOutlineRoofing,
    id: "roof_repair",
  },
  {
    label: service_type.carpentry_services,
    description: service_type_description?.carpentry_services,
    icon: MdOutlineCarpenter,
    id: "pet_grooming",
  },
  {
    label: service_type.glass_repair,
    description: service_type_description?.glass_repair,
    icon: GiCrackedGlass,
    id: "glass_repair",
  },
  {
    label: service_type.locksmith_services,
    description: service_type_description?.locksmith_services,
    icon: CiUnlock,
    id: "locksmith_services",
  },
  {
    label: service_type.appliance_repair,
    description: service_type_description?.appliance_repair,
    icon: GiAutoRepair,
    id: "appliance_repair",
  },
  {
    label: service_type.interior_design,
    description: service_type_description?.interior_design,
    icon: MdOutlineDesignServices,
    id: "interior_design",
  },
  {
    label: service_type.event_catering,
    description: service_type_description?.event_catering,
    icon: GiFoodTruck,
    id: "event_catering",
  },
  {
    label: service_type.security_services,
    description: service_type_description?.security_services,
    icon: MdOutlineSecurity,
    id: "security_services",
  },
  {
    label: service_type.security_camera,
    description: service_type_description?.security_camera,
    icon: PiSecurityCamera,
    id: "security_camera",
  },
  {
    label: service_type.laundry_services,
    description: service_type_description?.laundry_services,
    icon: MdOutlineLocalLaundryService,
    id: "laundry_services",
  },
  {
    label: service_type.babysitting,
    description: service_type_description?.babysitting,
    icon: FaBaby,
    id: "babysitting",
  },
  {
    label: service_type.massage_therapy,
    description: service_type_description?.massage_therapy,
    icon: TbMassage,
    id: "massage_therapy",
  },
  {
    label: service_type.personal_driver,
    description: service_type_description?.personal_driver,
    icon: BiTaxi,
    id: "personal_driver",
  },
  {
    label: service_type.private_tutoring,
    description: service_type_description?.private_tutoring,
    icon: GiTeacher,
    id: "private_tutoring",
  },
  {
    label: service_type.computer_repair,
    description: service_type_description?.computer_repair,
    icon: FaComputer,
    id: "computer_repair",
  },
  {
    label: service_type.phone_repair,
    description: service_type_description?.phone_repair,
    icon: IoPhonePortraitOutline,
    id: "phone_repair",
  },
  {
    label: service_type.pool_maintenance,
    description: service_type_description?.pool_maintenance,
    icon: MdOutlinePool,
    id: "pool_maintenance",
  },
  {
    label: service_type.private_investigator,
    description: service_type_description?.private_investigator,
    icon: RiSpyLine,
    id: "private_investigator",
  },
  {
    label: service_type.car_rental,
    description: service_type_description?.car_rental,
    icon: FaCar,
    id: "car_rental",
  },
  {
    label: service_type.furniture_assembly,
    description: service_type_description?.furniture_assembly,
    icon: BiCabinet,
    id: "furniture_assembly",
  },
];
