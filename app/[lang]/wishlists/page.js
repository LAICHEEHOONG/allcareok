"use client";
import { CheckUser } from "@/lib/frontend_tool";
import { Button } from "@heroui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { showToast } from "@/lib/frontend_tool";
import AD from "@/components/Home/AD";
import { getAdsByIds } from "@/lib/action/adAction";
import { setWishlistPage } from "@/redux/features/wishlist/wishlistSlice";

export default function Wishlists() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  // const ads = useSelector((state) => state.editor.ads);
  const l = useSelector((state) => state.auth.lang?.home_card);
  // const adsId = useSelector((state) => state.editor.adsId);
  // const role = useSelector(state => state.auth?.role);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const wishlistsAd = useSelector((state) => state.wishlists?.wishlistsAd);
  const adsId = ""; //for loading use

  useEffect(() => {
    const getAdsByIds_ = async () => {
      try {
        const adsData = await getAdsByIds(wishlist);
        if(adsData.success) {
          console.log(adsData.data);
          dispatch(setWishlistPage(adsData.data))
        }
      } catch (error) {
        console.log(error)
      }
    };

    getAdsByIds_();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[2300px] p-2 pt-2 sm:p-10 sm:pt-2 x1440l:p-20 x1440l:pt-2">
        <div className="w-full">
          <div className="flex justify-start mb-10">
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
                {l?.wishlist_page_title}
              </div>
            </div>

            {/* <Button
              isIconOnly
              aria-label="new ad"
              radius="full"
              color="default"
              variant="flat"
              onPress={handleAddAD}
            >
              <AddIcon />
            </Button> */}
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {wishlistsAd.map((item) => (
              <AD
                key={item._id}
                ad={item}
                fn={() => {
               
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

const breakpointColumnsObj = {
  default: 6,
  1879: 5,
  1639: 4,
  1127: 3,
  949: 2,
  549: 1,
};
