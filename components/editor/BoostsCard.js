import { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { useRouter, usePathname } from "next/navigation";

export default function BoostsCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const ad = useSelector((state) => state.editor?.ad);
  const [isExpired, setIsExpired] = useState(true);
  const [exp, setExp] = useState(null);
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
    dispatch(setFocus("boosts"));
    if (isSmallScreen) {
      router.push(`/${currentLocale}/editor/mobile/boosts`);
    }
    // Add other logic if needed
  };

  useEffect(() => {
    if (ad?.topRanking) {
      setIsExpired(isTopRankingExpired(ad.topRanking));
    } else {
      setIsExpired(true); // No ranking means it is "expired"
    }
  }, [ad?.topRanking]);

  useEffect(() => {
    const rankingDate = new Date(ad?.topRanking);

    const formattedDate = rankingDate
      .toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/,/g, "");

    setExp(formattedDate);
  }, [ad?.topRanking]);

  return (
    <Card
      className={`m-5 p-1 w-11/12 ${
        cardFocus === "boosts" ? " md:border-2 md:border-black" : ""
      }`}
      isPressable
      onPress={handlePress}
      // onPress={() => {
      //   dispatch(setFocus("boosts"));
      // }}
    >
      <CardBody className="">
        <div className="flex flex-col justify-start gap-1">
          <div className="font-medium ">{l?.boosts_card_title}</div>
          <div className="text-base text-default-400  ">
            {isExpired
              ? l?.boosts_card_content
              : `${l?.boosts_card_content_2} ${exp}`}
            {/* {l?.boosts_card_content
              ? l.boosts_card_content
              : "Find the ideal plan to boost your services."} */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const isTopRankingExpired = (topRanking) => {
  if (!topRanking) return true; // Null means expired or not set
  const currentDate = new Date();

  return new Date(topRanking) <= currentDate; // Expired if ranking date is in the past
};
