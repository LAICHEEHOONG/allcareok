import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";

export default function TitleCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const ad = useSelector(state => state.editor?.ad)

  return (
    <Card
      className={`m-5 p-1 w-11/12  ${
        cardFocus === "title" ? "border-solid border-2 border-black" : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("title"));
      }}
      
    >
      <CardBody className="">
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.title}</div>
          <div className="text-xl text-default-400 ">
            {ad?.title}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
