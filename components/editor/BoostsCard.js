import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";

export default function BoostsCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "boosts"
          ? "md:border-solid md:border-2 md:border-black"
          : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("boosts"));
      }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">
            {l?.boosts_card_title ? l.boosts_card_title : "Boosts your service"}
          </div>
          <div className="text-base text-default-400  ">
            {l?.boosts_card_content
              ? l.boosts_card_content
              : "Find the ideal plan to boost your services."}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
