import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  // Link,
  // Image,
  ScrollShadow,
  // Spinner,
  // Modal,
  // ModalContent,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  Divider,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  // Spacer,
} from "@heroui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
// import { setAd, setAds, setPopUp } from "@/redux/features/editor/editorSlice";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import { createAD, findUserAds } from "@/lib/action/adAction";
// import { toast } from "sonner";
import Masonry from "react-masonry-css";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import AddIcon from "@mui/icons-material/Add";
// import FilterIcon from "@mui/icons-material/Filter";
// import { useDropzone } from "react-dropzone";
import CheckIcon from "@mui/icons-material/Check";

const breakpointColumnsObj = {
  default: 3,
  1260: 2,
  980: 1,
};

export default function BoostsRightCard() {
  const user = useSelector((state) => state.auth?._id);
  const country = useSelector((state) => state.auth?.dbCountry);
  const email = useSelector((state) => state.auth?.email);
  const ad = useSelector((state) => state.editor?.ad);
  const mode = useSelector((state) => state.editor?.mode);
  const [isExpired, setIsExpired] = useState(true);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const [currency, setCurrency] = useState({ plus: "5 USD", pro: "14 USD" });
  const paymentUrl = {
    plusUrl: {
      TEST: `https://buy.stripe.com/dR63cFdNS1Q8fQIaEK?prefilled_email=${email}&client_reference_id=${ad._id}`,
      MYR: `https://buy.stripe.com/5kAaF71169iAgUM28i?prefilled_email=${email}&client_reference_id=${ad._id}`,
      USD: `https://buy.stripe.com/6oEdRjeRW66ofQIfZ9?prefilled_email=${email}&client_reference_id=${ad._id}`,
    },
    proUrl: {
      TEST: `https://buy.stripe.com/5kAcNf39e0M4fQI3cj?prefilled_email=${email}&client_reference_id=${ad._id}`,
      MYR: `https://buy.stripe.com/14k00taBGgL2bAseV7?prefilled_email=${email}&client_reference_id=${ad._id}`,
      USD: `https://buy.stripe.com/28o7sV39ecuM8og5ky?prefilled_email=${email}&client_reference_id=${ad._id}`,
    },
  };

  useEffect(() => {
    if (country === "Malaysia") {
      setCurrency({ plus: "RM 20", pro: "RM 60" });
    } else {
      setCurrency({ plus: "$ 5", pro: "$ 15" });
    }
  }, [country]);

  useEffect(() => {
    if (ad?.topRanking) {
      setIsExpired(isTopRankingExpired(ad.topRanking));
    } else {
      setIsExpired(true); // No ranking means it is "expired"
    }
  }, [ad?.topRanking]);

  const handlePlus = () => {
    if (mode === "live") {
      if (country?.toLowerCase() === "malaysia") {
        router.push(paymentUrl.plusUrl.MYR);
      } else {
        router.push(paymentUrl.plusUrl.USD);
      }
    } else {
      router.push(paymentUrl.plusUrl.TEST);
    }
  };

  const handlePro = () => {
    if (mode === "live") {
      if (country?.toLowerCase() === "malaysia") {
        router.push(paymentUrl.proUrl.MYR);
      } else {
        router.push(paymentUrl.proUrl.USD);
      }
    } else {
      router.push(paymentUrl.proUrl.TEST);
    }
  };

  const pricingOptions = [
    {
      title: l?.boosts_right?.plan_free?.plan,
      description: l?.boosts_right?.plan_free?.description,
      price: l?.boosts_right?.plan_free?.plan,
      features: [
        l?.boosts_right?.plan_free?.features_1,
        l?.boosts_right?.plan_free?.features_2,
        l?.boosts_right?.plan_free?.features_3,
      ],
      buttonText: l?.boosts_right?.plan_free?.buttonText,
      onPress: () => console.log("Selected Free Plan"),
      isDisabled: true,
    },
    {
      title: l?.boosts_right?.plan_plus?.plan,
      description: l?.boosts_right?.plan_plus?.description,
      price: currency.plus,
      features: [
        l?.boosts_right?.plan_plus?.features_1,
        l?.boosts_right?.plan_plus?.features_2,
        l?.boosts_right?.plan_plus?.features_3,
      ],
      buttonText: l?.boosts_right?.plan_plus?.buttonText,
      onPress: () => handlePlus(),
      isDisabled: false,
    },
    {
      title: l?.boosts_right?.plan_pro?.plan,
      description: l?.boosts_right?.plan_pro?.description,
      price: currency.pro,
      features: [
        l?.boosts_right?.plan_pro?.features_1,
        l?.boosts_right?.plan_pro?.features_2,
        l?.boosts_right?.plan_pro?.features_3,
      ],
      buttonText: l?.boosts_right?.plan_pro?.buttonText,
      onPress: () => handlePro(),
      isDisabled: false, // Example: Disable button if needed
    },
  ];

  useEffect(() => {
    if (!user) {
      router.push(`/`);
    }
  }, []);

  return (
    <div className="md:h-screen w-full md:pl-2">
      <div className="flex justify-between items-start mb-2 max-w-[1600px]">
        <div className="flex justify-center items-center gap-3">
          <Button
            className="md:hidden flex"
            isIconOnly
            radius="full"
            color="default"
            variant="flat"
            aria-label="Back button"
            onPress={() => {
              router.push(`/${currentLocale}/editor`);
            }}
          >
            <ArrowBackIcon />
          </Button>
          <div className="text-xl md:text-3xl font-semibold">
            {l?.boosts_card_title}
          </div>
        </div>
      </div>
      <div className=" mt-2 text-default-400 md:flex hidden">
        {l?.boosts_right?.content}
      </div>

      <ScrollShadow className=" h-[88vh] xl:flex xl:items-center">
        <div className="w-full max-w-[1600px] flex justify-center">
          {isExpired ? (
            <div>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column m-2"
              >
                {pricingOptions.map((option, index) => (
                  <PriceCard
                    key={index}
                    title={option.title}
                    description={option.description}
                    price={option.price}
                    features={option.features}
                    buttonText={option.buttonText}
                    onPress={option.onPress}
                    isDisabled={option.isDisabled}
                  />
                ))}
              </Masonry>
              <div className=" flex justify-center items-center m-5">
                <Drawer_ l={l} />
              </div>
            </div>
          ) : (
            <TopRanking date={ad?.topRanking} l={l} />
          )}
        </div>
      </ScrollShadow>
    </div>
  );
}

function TopRanking({ date, l }) {
  // Convert the date from MongoDB (ISO format) to a Date object
  const rankingDate = new Date(date);

  // Format the date to "Fri Jan 17, 2025"
  const formattedDate = rankingDate
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/,/g, "");
  // Calculate the remaining days
  const today = new Date();
  const timeDiff = rankingDate - today; // Difference in milliseconds
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

  return (
    <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
      <div className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-widest text-center">
        {formattedDate}
      </div>
      <div className=" md:text-xl mb-20 tracking-widest text-center">
        {daysLeft > 0
          ? `${daysLeft} ${l?.boosts_right?.days_left}`
          : `${l?.boosts_right?.exp}`}
      </div>
      <Drawer_ l={l} />
    </div>
  );
}

function PriceCard({
  title,
  description,
  price,
  features,
  buttonText,
  onPress,
  isDisabled = false,
}) {
  return (
    <Card
      className="max-w-[300px] mt-4"
      // className={`max-w-[300px] mt-4 ${title === 'Free' && 'lg:flex hidden'}`}
    >
      <CardHeader className="flex gap-3 p-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-small text-default-500 h-[40px]">{description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="p-4 flex flex-col">
          <div className="text-3xl font-semibold mb-3">{price}</div>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckIcon fontSize="small" />
              <p className="text-small text-default-500">{feature}</p>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <div className="w-full flex justify-center items-center p-4">
          <Button
            radius="full"
            size="lg"
            color="primary"
            isDisabled={isDisabled}
            onPress={onPress}
          >
            {buttonText}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function Drawer_({ l }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const u = useSelector(
    (state) => state.auth?.lang?.listing_editor_card?.question_ranking
  );

  return (
    <>
      <Button
        color="default"
        radius="full"
        variant="light"
        endContent={<HelpOutlineIcon />}
        // fullWidth={true}
        size="lg"
        onPress={onOpen}
      >
        {l?.boosts_right?.question_btn}
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {u?.title}
              </DrawerHeader>
              <DrawerBody>
                <section className="mb-4">
                  <h2 className="text-lg font-bold mb-2">{u?.why}</h2>
                  <ul className="list-disc ml-5 space-y-2 text-default-600">
                    {u?.why_content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section className="mb-4">
                  <h2 className="text-lg font-bold mb-2">{u?.process}</h2>
                  <ol className="list-decimal ml-5 space-y-2 text-default-600">
                    {u?.process_steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section className="mb-4">
                  <h2 className="text-lg font-bold mb-2">
                    {u?.failed_verification}
                  </h2>
                  <p className="text-default-600">
                    {u?.failed_verification_content}
                  </p>
                </section>
                <section>
                  <h2 className="text-lg font-bold mb-2">{u?.payment}</h2>
                  <p className="text-default-600">{u?.payment_content}</p>
                </section>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

const isTopRankingExpired = (topRanking) => {
  if (!topRanking) return true; // Null means expired or not set
  const currentDate = new Date();

  return new Date(topRanking) <= currentDate; // Expired if ranking date is in the past
};
