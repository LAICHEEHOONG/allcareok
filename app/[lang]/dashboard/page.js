"use client";
import { Button } from "@heroui/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import { setAdsID, setAd, setFocus } from "@/redux/features/editor/editorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { toast } from "sonner";
import AD from "@/components/Home/AD";

const breakpointColumnsObj = {
  default: 6,
  1879: 5,
  1639: 4,
  1127: 3,
  949: 2,
  549: 1,
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const ads = useSelector((state) => state.editor.ads);
  const l = useSelector((state) => state.auth.lang?.listing_editor_card);
  const adsId = useSelector((state) => state.editor.adsId);
  const role = useSelector((state) => state.auth?.role);
  const [addBtnLoading, setAddBtnLoading] = useState(false);

  useEffect(() => {
    dispatch(setAdsID(""));
    dispatch(setAd({}));
    dispatch(setFocus("photo"));
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
    setAddBtnLoading(true);
    if (role === "admin") {
      // Admins can add unlimited ads
      router.push(`/${currentLocale}/editor`);
      return;
    }

    if (ads?.length >= 10) {
      // Show warning for non-admins when ad limit is reached
      toast.warning(`${l?.ad_limit}`, {
        description: `${l?.ad_limit_description}`,
        action: {
          label: "OK",
          onClick: () => console.log("Add Ad Limit Reached"),
        },
      });
      setAddBtnLoading(false);
    } else {
      router.push(`/${currentLocale}/editor`);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[2300px]">
        <div className="w-full">
          <div className="flex justify-between mb-10 md:p-0 p-2">
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
              isLoading={addBtnLoading}
              onPress={handleAddAD}
            >
              <AddIcon />
            </Button>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column flex flex-col items-center sm:items-start"
          >
            {ads.map((item) => (
              <AD
                key={item._id}
                ad={item}
                fn={() => {
                  selectedCard(item._id);
                }}
                adsId={adsId}
              />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}
