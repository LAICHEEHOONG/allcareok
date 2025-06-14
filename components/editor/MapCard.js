import { Card, CardBody } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function MapCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "map" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("map"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-center gap-3 items-center">
          <div className="font-medium self-start">{l?.location}</div>
          <div className="rounded-lg overflow-hidden">
            <GoogleMapsEmbed
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              height={130}
              width={268}
              mode="place"
              q="Brooklyn+Bridge,New+York,NY"
            />
          </div>
          <div className="self-start text-sm text-default-400 ">
            123, Jalan Medan Ipoh, Medan Ipoh Bestari, 99999 Ipoh, Perak
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
