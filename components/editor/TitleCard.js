import { Card, CardBody } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setPopUp } from "@/redux/features/editor/editorSlice";
import { useState, useEffect } from "react";

export default function TitleCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const ad = useSelector((state) => state.editor?.ad);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //function to check if the screen is small
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize(); // Initialize state
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <Card
      className={`m-5 p-1 w-11/12  ${
        cardFocus === "title" ? "md:border-2 md:border-black" : ""
      }`}
      isPressable
      onPress={() => {
        dispatch(setFocus("title"));
        if (isSmallScreen) {
          dispatch(setPopUp());
        }
      }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.title}</div>
          <div className="text-xl text-default-400 ">{ad?.title}</div>
        </div>
      </CardBody>
    </Card>
  );
}
