import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { PiMapPinAreaFill } from "react-icons/pi";
import { GiVillage } from "react-icons/gi";

export default function AreaCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const area = useSelector((state) => state.editor?.ad?.area);

  const servicesItems = [
    {
      label: area?.town,
      icon: GiVillage,
    },
    {
      label: area?.city,
      icon: ApartmentIcon,
    },
    {
      label: area?.state,
      icon: PiMapPinAreaFill,
    },
    {
      label: area?.country,
      icon: FlagIcon,
    },
  ];
  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "area" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("area"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-2">{l?.area}</div>
          {/* 
          {servicesItems.map(({ label, icon: Icon }, id) => (
            <div key={id} className="flex gap-3 text-default-400">
              <Icon className={`w-6 h-6 ${label}`} />
              <div>{label}</div>
            </div>
          ))} */}
          {servicesItems.map(({ label, icon: Icon }, id) =>
            label ? (
              <div key={id} className="flex gap-3 text-default-400">
                <Icon className={`w-6 h-6 ${label}`} />
                <div className="capitalize">{label}</div>
              </div>
            ) : null
          )}
          {area?.country === "" && (
            <div className="text-default-400 p-2">{l?.add_service_area}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
