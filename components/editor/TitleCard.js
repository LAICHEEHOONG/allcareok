import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";

export default function TitleCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  return (
    <Card
      className={`m-5 p-1  w-[300px] ${
        cardFocus === "title" ? "border-solid border-2 border-black" : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("title"));
      }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-start">
          <div className="font-medium ">Title</div>
          <div className="text-xl text-default-500  ">
            Sit nulla est ex deserunt exercitation anim occaecat.
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
