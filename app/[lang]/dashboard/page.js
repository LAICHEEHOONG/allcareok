"use client";
import {
  Button,
  Image,
  Card,
  CardBody,
  CardFooter,
  Spinner,
} from "@heroui/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import { setAdsID, setAd, setFocus } from "@/redux/features/editor/editorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Masonry from "react-masonry-css";
import { toast } from "sonner";

const breakpointColumnsObj = {
  default: 5,
  1500: 4,
  1150: 3,
  900: 2,
  650: 1,
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);
  const l = useSelector((state) => state.auth.lang?.listing_editor_card);
  const adsId = useSelector((state) => state.editor.adsId);

  useEffect(() => {
    dispatch(setAdsID(""));
    dispatch(setAd({}));
    dispatch(setFocus('photo'))
    if (ads.length === 0) {
      router.push(`/${currentLocale}`);
    }
  }, []);

  const selectedCard = (id) => {
    let AD_ = ads.filter((item) => item._id === id);
    dispatch(setAdsID(id));
    dispatch(setAd(AD_[0]));
    router.push(`/${currentLocale}/editor`);
  };

  const handleAddAD = () => {
    if (ads?.length >= 10) {
      toast.warning(`${l?.ad_limit}`, {
        description: `${l?.ad_limit_description}`,
        action: {
          label: "OK",
          onClick: () => console.log("Add Ad Limit Reached"),
        },
      });
    } else {
      router.push(`/${currentLocale}/editor`);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="m-10 flex justify-center items-center w-full max-w-[2000px]">
        <div className="w-full">
          <div className="flex justify-between mb-10">
            <div className="flex gap-4">
              <Button
                isIconOnly
                aria-label="back to home page button"
                radius="full"
                color="default"
                variant="flat"
                onPress={() => {
                  router.push(`/${currentLocale}`);
                }}
              >
                <ArrowBackIcon />
              </Button>
              <div className="text-3xl font-semibold">
                {l?.your_listing ? l?.your_listing : "Your Listing"}
              </div>
            </div>

            <Button
              isIconOnly
              aria-label="new ad"
              radius="full"
              color="default"
              variant="flat"
              onPress={handleAddAD}
              // onPress={() => {
              //   router.push(`/${currentLocale}/editor`);
              // }}
            >
              <AddIcon />
            </Button>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {ads.map((item) => (
              <Card
                key={item._id}
                className="flex mb-2"
                isPressable
                shadow="sm"
                onPress={() => {
                  selectedCard(item._id);
                }}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    alt="Card background"
                    className="z-0 object-cover"
                    src={
                      item.photo.length === 0
                        ? "/images/handyman_2.webp"
                        : item.photo[0].url
                    }
                    width={500}
                    height={300}
                  />
                  {adsId === item._id && (
                    <>
                      {/* Dark transparent overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl z-40"></div>
                      {/* Centered spinner */}
                      <div className="absolute inset-0 flex items-center justify-center z-40">
                        <Spinner color="default" size="lg" />
                      </div>
                    </>
                  )}
                </CardBody>
                <CardFooter className="text-small flex-col items-start overflow-visible truncate max-w-[250px]">
                  <b className="truncate max-w-[240px]">{item?.title}</b>
                  <p className="text-default-500 truncate max-w-[240px]">
                    {"Ipoh, Perak"}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}
