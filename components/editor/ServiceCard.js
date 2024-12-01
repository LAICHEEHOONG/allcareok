import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { GiBroom } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import HouseIcon from "@mui/icons-material/House";

export default function ServiceCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const servicesItems = [
    {
      label: "Home Cleaning",
      icon: GiBroom,
    },
    {
      label: "Aircon Servicing",
      icon: TbAirConditioning,
    },
    {
      label: "Move In/Out Cleaning",
      icon: HouseIcon,
    },
  ];
  return (
    <Card
      className={`m-5 p-3 ${
        cardFocus === "service" ? "border-solid border-2 border-black" : ""
      } w-[444px]`}
      isPressable
      onPress={() => {
        dispatch(setFocus("service"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-3">Services</div>

          {servicesItems.map(({ label, icon: Icon }, id) => (
            <div key={id} className="flex gap-3 text-default-500">
              {/* <Icon
                className={`w-6 h-6 ${
                  activeIndex === label ? "text-black" : "text-default-500"
                } group-hover:text-default-900`}
              /> */}
              <Icon className={`w-6 h-6 ${label}`} />
              <div>{label}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
