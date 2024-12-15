import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function AreaCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const servicesItems = [
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
