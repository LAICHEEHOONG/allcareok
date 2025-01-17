import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Link,
  Image,
  ScrollShadow,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Spacer,
} from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds, setPopUp } from "@/redux/features/editor/editorSlice";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { createAD, findUserAds } from "@/lib/action/adAction";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import FilterIcon from "@mui/icons-material/Filter";
import { useDropzone } from "react-dropzone";
import CheckIcon from "@mui/icons-material/Check";

// const breakpointColumnsObj_2 = {
//   default: 2,
// };

const breakpointColumnsObj = {
  default: 3,
  1260: 2,
  980: 1,
};

export default function BoostsRightCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?._id);
  const email = useSelector((state) => state.auth?.email);
  const adsId = useSelector((state) => state.editor?.adsId);
  const ad = useSelector((state) => state.editor?.ad);
  //   const verification = useSelector((state) => state.editor?.ad?.verification);
  //   const reviewStatus = useSelector((state) => state.editor?.ad?.reviewStatus);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [photos, setPhotos] = useState([]);
  const [limitPhotos, setLimitPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const mode = "test";

  const handlePlus = () => {
    console.log('handlePlus')
    if (mode === "live") {
      router.push(
        `https://buy.stripe.com/dR63cFdNS1Q8fQIaEK?client_reference_id=${ad._id}&prefilled_email=${email}`
      );
    } else {
      router.push(
        `https://buy.stripe.com/test_eVa7tgcoj4iv0tGbIP?prefilled_email=${email}&client_reference_id=${ad._id}`
      );
    }
  };

  const handlePro = () => {
    console.log('handlePro')
    if (mode === "live") {
      router.push(
        `https://buy.stripe.com/5kAcNf39e0M4fQI3cj?client_reference_id=${ad._id}&prefilled_email=${email}&utm_campaign=pro`
      );
    } else {
      router.push(
        `https://buy.stripe.com/test_14kfZM9c79CPfoA5ks?prefilled_email=${email}&client_reference_id=${ad._id}&utm_campaign=pro`
      );
    }
  };

  const pricingOptions = [
    {
      title: "Free",
      description: "Free Starter Plan: Perfect for New Users to Try!",
      price: "Free",
      features: ["Standard Ranking", "Email Support", "Forever"],
      buttonText: "Continue with Free",
      onPress: () => console.log("Selected Free Plan"),
      isDisabled: true,
    },
    {
      title: "Plus",
      description: "Experience a taste of top rankings for 7 days at just $7!",
      price: "$7",
      features: ["Top Ranking", "Priority Email Support", "7 Days"],
      buttonText: "Upgrade to Plus",
      onPress: () => handlePlus(),
      isDisabled: false,
    },
    {
      title: "Pro",
      description:
        "Get top rankings for 30 days at just $20 and maximize your ad's reach!",
      price: "$20",
      features: ["Top Ranking", "Priority Email Support", "30 Days"],
      buttonText: "Ugrade to Pro",
      onPress: () => handlePro(),
      isDisabled: false, // Example: Disable button if needed
    },
  ];

  useEffect(() => {
    if (!user) {
      router.push(`/`);
    }
  }, []);

  const submitToMongoDB = async (data) => {
    try {
      if (adsId) {
        const updateAD = await createAD(data);
        dispatch(setAd(updateAD));
        const ads = await findUserAds({ user }); // Pass only the userId
        dispatch(setAds(ads));
      } else {
        console.log("adsId not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const runToast = () => {
    // toast.warning(`${l?.upload_limit}`, {
    //   description: `${l?.upload_limit_description}`,
    //   action: {
    //     label: "OK",
    //     onClick: () => console.log("Upload Limit Reached"),
    //   },
    // });
  };

  const handlePress = () => {
    // if (verification?.length < LIMIT_PHOTO) {
    //   onOpen();
    // } else {
    //   runToast();
    // }
  };

  const handlePayment = () => {
    // const mode = "live";
    // if (verification?.length === 0) {
    //   toast.warning(`${l?.payment_submit_title}`, {
    //     description: `${l?.payment_submit_content}`,
    //     action: {
    //       label: "OK",
    //       onClick: () => console.log("Submit Documents Before Payment"),
    //     },
    //   });
    // } else {
    //   if (mode === "live") {
    //     router.push(
    //       `https://buy.stripe.com/fZe3cF7puamEbAsaEJ?client_reference_id=${ad._id}&prefilled_email=${email}`
    //     );
    //   } else {
    //     router.push(
    //       `https://buy.stripe.com/test_8wMcNAdsn2anfoA14a?client_reference_id=${ad._id}&prefilled_email=${email}`
    //     );
    //   }
    // }
  };

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
            {"Boost Your Ad to Top Rankings!"}
          </div>
        </div>
      </div>
      <div className=" mt-2 text-default-400 md:flex hidden">
        {"Discover the ideal plan, beginning at under $7 per week."}
      </div>
      {/* <div className=" pt-10 "> */}
      <ScrollShadow className=" h-[88vh] xl:flex xl:items-center">
        <div className="  w-full max-w-[1600px] flex justify-center ">
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
        </div>
      </ScrollShadow>
      {/* </div> */}

      {/* <div className=" w-full max-w-[1600px]  flex justify-center h-[80vh]">
        <div className="w-full max-w-[500px] flex flex-col justify-center items-center ">
          <Card className="m-2 mb-4 w-full" isPressable onPress={handlePress}>
            <CardBody>
              <div className="flex justify-between">
                <div className="flex flex-col justify-center md:tracking-wider m-1">
                  <div className="text-md leading-10 w-full max-w-[250px] font-semibold">
                    {l?.verify_upload_title}
                  </div>

                  <div className="text-small md:tracking-wide text-default-400 w-full max-w-[250px]">
                    {l?.verify_upload_content}
                  </div>
                  <div className="text-xs md:tracking-wide text-default-300 w-full max-w-[250px] flex md:justify-end justify-start mt-2"></div>
                </div>
                <div className=" h-full flex justify-center items-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-full md:max-w-[170px] max-w-[140px]"
                    src="/images/ic.jpeg"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          <Drawer_ l={l} />
        </div>
      </div> */}
    </div>
  );
}

// import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

// function PriceCard() {
//   return (
//     <Card className="max-w-[300px] mt-4">
//       <CardHeader className="flex gap-3 p-4">
//         {/* <Image
//           alt="nextui logo"
//           height={40}
//           radius="sm"
//           src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
//           width={40}
//         /> */}
//         <div className="flex flex-col">
//           <p className="text-md">Free</p>
//           <p className="text-small text-default-500">
//             Free Starter Plan: Perfect for New Users to Try!
//           </p>
//         </div>
//       </CardHeader>
//       <Divider />
//       <CardBody>
//         <div className="p-4 flex flex-col">
//           <div className="text-3xl font-semibold mb-3">Free</div>

//           <div className="flex items-center gap-2">
//             <CheckIcon fontSize="small" />
//             <p className="text-small text-default-500">Standard Ranking</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckIcon fontSize="small" />
//             <p className="text-small text-default-500">Email Support</p>
//           </div>
//         </div>
//       </CardBody>
//       {/* <Divider /> */}
//       <CardFooter>
//         <div className="w-full flex justify-center items-center p-4">
//         <Button
//           radius="full"
//           size="lg"
//           color="primary"
//           isDisabled
//           // isLoading={loading}
//           // onPress={handleSave}
//         >
//           Continue with Free
//         </Button>
//         </div>

//       </CardFooter>
//     </Card>
//   );
// }

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
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{description}</p>
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
    (state) => state.auth?.lang?.listing_editor_card?.understanding
  );

  return (
    <>
      <Button
        color="default"
        radius="full"
        variant="light"
        startContent={<HelpOutlineIcon />}
        fullWidth={true}
        size="lg"
        onPress={onOpen}
      >
        {l?.learn_more}
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
                  <h2 className="text-lg font-bold mb-2">{u?.benefits}</h2>
                  <ul className="list-disc ml-5 space-y-2 text-default-600">
                    {u?.benefits_content.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
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
