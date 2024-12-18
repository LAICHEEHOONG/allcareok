import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize(); // Initialize state
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handlePress = () => {
    dispatch(setFocus("delete"));
    if (isSmallScreen) {
      router.push(`/${currentLocale}/editor/mobile/delete`);
    }
  };

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "delete" ? "md:border-solid md:border-2 md:border-black" : ""
      }`}
      isPressable
      onPress={handlePress}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.delete}</div>
          <div className="text-base text-default-400  ">
            {l?.delete_left_content
              ? l.delete_left_content
              : `Once you delete a service, there is no going back. Please be
            certain.`}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
