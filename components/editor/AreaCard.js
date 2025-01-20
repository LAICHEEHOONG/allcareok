import { Card, CardBody } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import FlagIcon from "@mui/icons-material/Flag";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { PiMapPinAreaFill } from "react-icons/pi";
import { GiVillage } from "react-icons/gi";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AreaCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const area = useSelector((state) => state.editor?.ad?.area);
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
    dispatch(setFocus("area"));
    if (isSmallScreen) {
      router.push(`/${currentLocale}/editor/mobile/area`);
    }
    // Add other logic if needed
  };

  const servicesItems = [
    {
      label: area?.town,
      icon: GiVillage,
    },
    {
      label: area?.city,
      icon: ApartmentIcon,
    },
    {
      label: area?.state,
      icon: PiMapPinAreaFill,
    },
    {
      label: area?.country,
      icon: FlagIcon,
    },
  ];
  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "area" ? " md:border-2 md:border-black" : ""
      } `}
      isPressable
      onPress={handlePress}
    >
      <CardBody>
        <div className="flex flex-col justify-start gap-2">
          <div className="font-medium mb-2">{l?.area}</div>

          {servicesItems.map(({ label, icon: Icon }, id) =>
            label ? (
              <div key={id} className="flex gap-3 text-default-400">
                <Icon className={`w-6 h-6 ${label}`} />
                <div className="capitalize">{label}</div>
              </div>
            ) : null
          )}
          {area?.country === "" && (
            <div className="text-default-400 p-2">{l?.add_service_area}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
