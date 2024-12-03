import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function YoutubeCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const servicesItems = [
    {
      label: "https://www.youtube.com/watch?v=QLH26YLnQvkx",
      icon: YouTubeIcon,
    },
    {
      label: "https://www.youtube.com/watch?v=QLH26YLnQvkx",
      icon: YouTubeIcon,
    },
    {
      label: "https://www.youtube.com/watch?v=QLH26YLnQvkx",
      icon: YouTubeIcon,
    },
  ];
  return (
    <Card
      className={`m-5 p-1 w-[300px] ${
        cardFocus === "youtube" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("youtube"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2 ">
          <div className="font-medium mb-2">YouTube</div>

          {servicesItems.map(({ label, icon: Icon }, id) => (
            <div key={id} className="flex gap-3 text-default-400 ">
              <Icon className={`w-6 h-6 ${label}`} />
              <div className="truncate">{label}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
