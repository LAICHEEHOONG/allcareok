import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { useRouter, usePathname } from "next/navigation";
import { contactServices } from "@/components/contactServices";

export default function ContactCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const contact = useSelector((state) => state.editor.ad?.contact);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handlePress = () => {
    dispatch(setFocus("contact"));
    if (isSmallScreen) {
      router.push(`/${currentLocale}/editor/mobile/contact`);
    }
  };

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "contact" ? "md:border-2 md:border-black" : ""
      }`}
      isPressable
      onPress={handlePress}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-2">{l?.contact}</div>
          {contactServices.filter((item) => contact?.[item.name]).length > 0 ? (
            contactServices
              .filter((item) => contact?.[item.name])
              .map((item) => (
                <div
                  key={item.name}
                  className="flex gap-3 p-1 text-default-400"
                >
                  <item.icon className="w-6 h-6" />
                  <div className="truncate">{contact[item.name]}</div>
                </div>
              ))
          ) : (
            <div className="text-default-400 p-2">{l?.contact_empty_title}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}