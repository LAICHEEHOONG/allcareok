"use client";
// import { CheckUser } from "@/lib/frontend_tool";
import { Button } from "@heroui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Masonry from "react-masonry-css";
// import { showToast } from "@/lib/frontend_tool";
import AD from "@/components/Home/AD";
import { getAdsByIds } from "@/lib/action/adAction";
import { setWishlistPage } from "@/redux/features/wishlist/wishlistSlice";

export default function Wishlists() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const l = useSelector((state) => state.auth.lang?.home_card);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const wishlistsAd = useSelector((state) => state.wishlists?.wishlistsAd);
  const adsId = ""; //for loading use
  // const language = useSelector((state) => state.auth?.language);

  useEffect(() => {
    if (!wishlist || wishlist.length === 0) {
      dispatch(setWishlistPage([]));
      return;
    }

    const getAdsByIds_ = async () => {
      try {
        const adsData = await getAdsByIds(wishlist);
        console.log(adsData);
        if (adsData.success) {
          dispatch(setWishlistPage(adsData.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAdsByIds_();
  }, [wishlist]);

  const handleImageClick = (id) => {
    // window.open(`${language ? language : "en"}/ad/${id}`, "_blank");
    router.push(`/${currentLocale}/ad/${id}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[2300px] ">
        <div className="w-full">
          <div className="flex justify-start mb-10 md:p-0 p-2">
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
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column flex flex-col items-center sm:items-start"
          >
            {wishlistsAd.map((item) => (
              <AD key={item._id} ad={item} fn={() => {handleImageClick(item._id)}} adsId={adsId} />
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
