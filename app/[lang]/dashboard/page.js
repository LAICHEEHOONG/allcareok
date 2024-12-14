"use client";
import { Button, Image, Card, CardBody, CardFooter } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import { setAdsID, setAd } from "@/redux/features/editor/editorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1450: 4,
  1150: 3,
  850: 2,
  570: 1,
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);

  useEffect(() => {
    dispatch(setAdsID(""));
    dispatch(setAd({}));
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

  return (
    <div className="m-10 flex justify-center items-center">
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
            <div className="text-3xl font-semibold"> Your listings</div>
          </div>

          <Button
            isIconOnly
            aria-label="new ad"
            radius="full"
            color="default"
            variant="flat"
            onPress={() => {
              router.push(`/${currentLocale}/editor`);
            }}
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
                  // className="object-cover rounded-xl"
                  // src="/images/handyman_2.webp"
                  className="z-0 object-cover"
                  src={
                    item.photo.length === 0
                      ? "/images/handyman_2.webp"
                      : item.photo[0].url
                  }
                  // width="100%"
                  width={500}
                  height={300}
                />
              </CardBody>
              <CardFooter className="text-small flex-col items-start overflow-visible truncate max-w-[250px]">
                <b className="truncate max-w-[240px]">
                  {
                    "PRO SERVICES & Documents ClearingClearingClearingClearingClearing"
                  }
                </b>
                <p className="text-default-500 truncate max-w-[240px]">
                  {"Ipoh, Perak"}
                </p>
              </CardFooter>
            </Card>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
