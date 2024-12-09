"use client";
import { Button, Image, Card, CardBody, CardFooter } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import { setAdsID } from "@/redux/features/editor/editorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);

  useEffect(() => {
    dispatch(setAdsID(""));
    if (ads.length === 0) {
      router.push(`/${currentLocale}`);
    }
  }, []);

  return (
    <div className="flex justify-center items-center m-10  ">
      <div className="min-w-80 max-w-[1600px] w-full ">
        <div className="flex justify-between">
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
          columnClassName="my-masonry-grid_column "
        >
          {ads.map((item) => (
            <Card
              key={item._id}
              className=" m-5"
              isPressable
              shadow="sm"
              onPress={() => {
                dispatch(setAdsID(item._id));
                router.push(`/${currentLocale}/editor`);
              }}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/images/handyman_2.webp"
                  width="100%"
                  // width={270}
                  // height={270}
                />
              </CardBody>
              <CardFooter className="text-small flex-col items-start ">
                <b className=" truncate max-w-[270px]">
                  {
                    "PRO SERVICES & Documents ClearingClearingClearingClearingClearing"
                  }
                </b>
                <p className="text-default-500  truncate max-w-[270px]">
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
