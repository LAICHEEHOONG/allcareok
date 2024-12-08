"use client";
import { Button, Image } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import { setAdsID } from "@/redux/features/editor/editorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1550: 4,
  1260: 3,
  950: 2,
  666: 1
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);

  useEffect(() => {
    dispatch(setAdsID(""));
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
          className="my-masonry-grid border-solid border-2"
          columnClassName="my-masonry-grid_column"
        >
          {ads.map((item) => (
            <div
              key={item._id}
              className="py-4 m-2 flex flex-col justify-center items-start"
            >
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="/images/handyman_2.webp"
                width={270}
                height={270}
              />
              <div className="truncate max-w-[270px] font-semibold text-sm mt-2">
                {"PRO SERVICES & Documents Clearing"}
              </div>
              <div className="text-base text-default-500 truncate text-sm">
                {"Ipoh, Perak"}
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
