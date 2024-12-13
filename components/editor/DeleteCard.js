import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";

export default function DeleteCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  return (
    <Card
      className={`m-5 p-1 w-[300px] ${
        cardFocus === "delete" ? "border-solid border-2 border-rose-300" : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("delete"));
      }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.delete}</div>
          <div className="text-base text-default-400  ">
            Once you delete a service, there is no going back. Please be
            certain.
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
