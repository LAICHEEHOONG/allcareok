import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";

export default function DescriptionCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "description" ? "border-solid border-2 border-black" : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("description"));
      }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.description}</div>
          <div className="text-base text-default-400  ">
            Sit nulla est ex deserunt exercitation anim occaecat.
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
