import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";

export default function VerifyCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "verify" ? " md:border-2 md:border-black" : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("verify"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.verify_title}</div>
          <div className="text-base text-default-400  ">
            {l?.verify_content}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
