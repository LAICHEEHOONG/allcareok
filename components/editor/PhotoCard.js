import { Card, CardBody, Image } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";

export default function PhotoCard({AD}) {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);

  return (
    <Card
      className={` m-5 p-1 w-[300px] ${
        cardFocus === "photo" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("photo"));
      }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-center items-center">
          <div className="font-medium self-start">{l?.photo_upload}</div>
          <div className="text-small tracking-tight text-default-400 self-start">
            {/* 8 photos */}
            {`${AD?.photo?.length} photos`}
          </div>

          <Image
            className="flex justify-center items-center mt-4"
            width={350}
            alt="photos upload poster"
            src="/images/childcare.jpeg"
          />
        </div>
      </CardBody>
    </Card>
  );
}
