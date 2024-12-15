import { Card, CardBody, Image } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setPopUp } from "@/redux/features/editor/editorSlice";

export default function PhotoCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const photo = useSelector(state => state.editor.ad.photo)

  return (
    <Card
      className={` m-5 p-1 w-11/12 ${
        cardFocus === "photo" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("photo"));
        dispatch(setPopUp())
      }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-center items-center">
          <div className="font-medium self-start">{l?.photo_upload}</div>
          <div className="text-small tracking-tight text-default-400 self-start">
            {/* 8 photos */}
            {`${photo ? photo.length : '0'} photos`}
          </div>

          <Image
            className="flex justify-center items-center mt-4 md:max-w-[270px]"
            // width={350}
            width={500}
            alt="photos upload poster"
            src="/images/childcare.jpeg"
          />
        </div>
      </CardBody>
    </Card>
  );
}
