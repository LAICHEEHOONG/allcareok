

import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { getCarouselItems } from "../carouselItems";

export default function ServiceCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const serviceIds = useSelector((state) => state.editor?.ad?.service);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const carouselItems = getCarouselItems(service_type) || [];
    const resolvedServices = serviceIds?.map((serviceId) => carouselItems.find((obj) => obj?.id === serviceId))
    setServices(resolvedServices);
  }, [service_type, serviceIds]);

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "service" ? "border-solid border-2 border-black" : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("service"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-2">{l?.service}</div>
          {services?.length === 0 && (
            <div className="text-default-400 p-2">{`Add details`}</div>
          )}

          {services?.slice(0, 3).map(({ label, icon: Icon, id }) => (
            <div key={id} className="flex gap-3 text-default-400">
              <Icon className={`w-6 h-6 ${label}`} />
              <div>{label}</div>
            </div>
          ))}

          {services?.length > 3 && (
            <div className="text-sm text-default-400 p-2">{`+${services?.length - 3} more`}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}