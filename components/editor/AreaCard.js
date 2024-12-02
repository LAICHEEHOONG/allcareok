import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { GiBroom } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function AreaCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const servicesItems = [
    // {
    //   label: "Home Cleaning",
    //   icon: GiBroom,
    // },
    // {
    //   label: "Aircon Servicing",
    //   icon: TbAirConditioning,
    // },
    // {
    //   label: "Move In/Out Cleaning",
    //   icon: HouseIcon,
    // },
    {
      label: "Ipoh",
      icon: LocationOnIcon,
    },
    {
      label: "Bercham",
      icon: LocationOnIcon,
    },
    {
      label: "Sungai Siput",
      icon: LocationOnIcon,
    },
  ];
  return (
    <Card
      className={`m-5 p-1 w-[300px] ${
        cardFocus === "area" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("area"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-2">Service Area</div>

          {servicesItems.map(({ label, icon: Icon }, id) => (
            <div key={id} className="flex gap-3 text-default-400">
              <Icon className={`w-6 h-6 ${label}`} />
              <div>{label}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
