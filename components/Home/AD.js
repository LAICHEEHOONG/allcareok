import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Button,
  Avatar,
} from "@heroui/react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselItems } from "../carouselItems";
import { useRef, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Fade } from "react-awesome-reveal";
import { countryFlag } from "../countryFlag";
import { LogoSpinner } from "../LogoSpinner";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { updateUserWishlist } from "@/lib/action/userAction";
import { showToast } from "@/lib/frontend_tool";
import { setWishlist } from "@/redux/features/auth/authSlice";
import { usePathname } from "next/navigation";

export default function AD({ ad, fn, adsId }) {
  const { data: session, status } = useSession();
  const user = useSelector((state) => state.auth?._id);
  const dispatch = useDispatch();
  const service_type = useSelector((state) => state?.auth?.lang?.service_type);
  const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));
  const [carouselItems, setCarouselItems] = useState([]);
  const l = useSelector((state) => state.auth?.lang?.home_card);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const isInWishlist = (adId) => wishlist.includes(adId);
  const [loadingAd, setLoadingAd] = useState({}); // Track loading state per adId
  const pathname = usePathname();

  const showStatus =
    pathname.endsWith("/dashboard") || pathname.endsWith("/editor");

  useEffect(() => {
    setCarouselItems(getCarouselItems(service_type));
  }, [service_type]);

  // Handle wishlist update
  const updateUserWishlist_ = async (adId) => {
    if (!session) {
      signIn();
      return;
    }

    // setIsLoading(true);
    setLoadingAd((prev) => ({ ...prev, [adId]: true })); // Set loading for the specific ad

    try {
      const res = await updateUserWishlist({ userId: user, adId }); // Update wishlist
      console.log(res.data.wishlist);
      if (res.success) {
        if (res.data.wishlist.length > wishlist.length) {
          showToast(l?.wishlist_toast?.title, l?.wishlist_toast?.description);
        }
        if (res.data.wishlist.length < wishlist.length) {
          showToast(
            l?.wishlist_toast_remove?.title,
            l?.wishlist_toast_remove?.description
          );
        }

        dispatch(setWishlist(res.data.wishlist)); // Update Redux store
      }

      // await fetchWishlist(); // Get the latest user data with wishlist
    } catch (error) {
      console.log("Error updating wishlist:", error);
    } finally {
      // setIsLoading(false);
      setLoadingAd((prev) => ({ ...prev, [adId]: false })); // Stop loading for this ad
    }
  };

  return (
    <Fade triggerOnce>
      <Card className="p-3 pb-1 pt-0 rounded-xl">
        <CardHeader className="flex justify-center h-[52px]">
          {(ad?.area?.town ||
            ad?.area?.city ||
            ad?.area?.state ||
            ad?.area?.country) && (
            <div className="flex justify-center items-center gap-2">
              {ad?.area?.country ? (
                <Avatar
                  src={
                    countryFlag.find(
                      (country) =>
                        country.value.trim().toLowerCase() ===
                        ad.area.country.trim().toLowerCase()
                    )?.description || ""
                  }
                  alt={ad.area.country}
                  className="max-w-5 h-5 w-full"
                />
              ) : (
                <LocationOnIcon className="w-4 h-4 mt-1" />
              )}

              <div className="text-base capitalize font-medium w-full max-w-[220px] truncate tracking-widest">
                {`${ad?.area?.town || ad?.area?.city || ad?.area?.state || ""}${
                  ad?.area?.town || ad?.area?.city || ad?.area?.state
                    ? ", "
                    : ""
                }${ad?.area?.country}`}
              </div>
            </div>
          )}
        </CardHeader>
        <CardBody className="overflow-visible p-0">
          <Carousel
            className="w-full cursor-pointer"
            opts={{ align: "start", loop: true, dragFree: false }}
            // onClick={() => fn()}
            onClick={() => {
              if (typeof fn === "function") {
                fn();
              }
            }}
          >
            <CarouselContent>
              {ad?.photo?.length > 0 ? (
                ad?.photo?.map((item, i) => (
                  <CarouselItem
                    key={`${crypto.randomUUID()}`}
                    className="flex justify-center items-start"
                  >
                    <div className="flex justify-center items-start h-full w-full">
                      <Image
                        alt="ads image"
                        className={`object-cover rounded-xl 
                        w-[333px] h-[400px]
                        x550l:w-[280px] x550l:h-[340px]
                        sm:w-[300px] sm:h-[360px]
                        md:w-[400px] md:h-[450px]
                        x950l:w-[300px] x950l:h-[360px] 
                        x1128l:w-[240px] x1128l:h-[300px]  
                        xl:w-[280px] xl:h-[340px]  
                        x1470l:w-[333px] x1470l:h-[400px]
                        x1640l:w-[300px] x1640l:h-[360px]   
                        x1980l:w-[333px] x1980l:h-[400px]
                         `}
                        radius="lg"
                        src={item.url}
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="flex justify-center items-start h-full">
                  <Image
                    alt="default ad image"
                    className={`object-cover rounded-xl 
                    w-[333px] h-[400px]
                    x550l:w-[280px] x550l:h-[340px]
                    sm:w-[300px] sm:h-[360px]
                    md:w-[400px] md:h-[450px]
                    x950l:w-[300px] x950l:h-[360px] 
                    x1128l:w-[240px] x1128l:h-[300px]  
                    xl:w-[280px] xl:h-[340px]  
                    x1470l:w-[333px] x1470l:h-[400px]
                    x1640l:w-[300px] x1640l:h-[360px]   
                    x1980l:w-[333px] x1980l:h-[400px]
                     `}
                    radius="lg"
                    src="/images/plumber.png"
                  />
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
          {showStatus ? (
            <>
              <div
                className={`absolute inset-x-0 top-0 z-40 flex ${
                  ad.reviewStatus !== "Payment Pending"
                    ? "justify-between"
                    : "justify-end"
                } items-center p-2`}
              >
                {ad.reviewStatus !== "Payment Pending" && (
                  <Chip
                    avatar={
                      <Avatar
                        name="allcareok"
                        src="https://www.allcareok.com/images/allcareok_logo.png"
                      />
                    }
                    variant="shadow"
                    classNames={{
                      base:
                        ad.reviewStatus === "Approved"
                          ? "bg-green-400"
                          : ad.reviewStatus === "Under Review"
                          ? "bg-indigo-400"
                          : ad.reviewStatus === "Rejected"
                          ? "bg-pink-400 "
                          : "bg-default",
                      content: "drop-shadow shadow-black text-white",
                    }}
                  >
                    <div className="font-medium tracking-wider">
                      {ad.reviewStatus === "Approved" && l?.approved}
                      {ad.reviewStatus === "Under Review" && l?.under_review}
                      {ad.reviewStatus === "Rejected" && l?.rejected}
                      {/* {l?.verified} */}
                    </div>
                  </Chip>
                )}

                <Button
                  isIconOnly
                  aria-label="Like"
                  size="sm"
                  radius="full"
                  color="danger"
                  variant={isInWishlist(ad._id) ? "solid" : "flat"} // Change based on wishlist
                  isLoading={loadingAd[ad._id] || false} // Only the clicked button will show loading
                  onPress={() => updateUserWishlist_(ad._id)} // Handle wishlist update
                >
                  <FavoriteBorderIcon style={{ color: "white" }} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div
                className={`absolute inset-x-0 top-0 z-40 flex ${
                  ad.reviewStatus === "Approved"
                    ? "justify-between"
                    : "justify-end"
                } items-center p-2`}
              >
                {ad.reviewStatus === "Approved" && (
                  <Chip
                    avatar={
                      <Avatar
                        name="allcareok"
                        src="https://www.allcareok.com/images/allcareok_logo.png"
                      />
                    }
                    variant="shadow"
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500  shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                  >
                    <div className="font-medium tracking-wider">
                      {l?.verified}
                    </div>
                  </Chip>
                )}

                <Button
                  isIconOnly
                  aria-label="Like"
                  size="sm"
                  radius="full"
                  color="danger"
                  variant={isInWishlist(ad._id) ? "solid" : "flat"} // Change based on wishlist
                  isLoading={loadingAd[ad._id] || false} // Only the clicked button will show loading
                  onPress={() => updateUserWishlist_(ad._id)} // Handle wishlist update
                >
                  <FavoriteBorderIcon style={{ color: "white" }} />
                </Button>
              </div>
            </>
          )}

          {adsId && ad?._id && adsId === ad._id ? (
            <>
              <div className="absolute inset-0 bg-pink-300 bg-opacity-50 rounded-xl z-40"></div>
              <div className="absolute inset-0 flex items-center justify-center z-40">
                <LogoSpinner text={false} />
              </div>
            </>
          ) : null}
        </CardBody>
        <CardFooter className="flex justify-center p-0 ">
          {
            <div className="w-full flex justify-center items-center max-w-[300px] h-[35px] ">
              <Carousel
                className="w-full max-w-[400px] "
                opts={{ align: "start", loop: true, dragFree: false }}
                plugins={[plugin.current]}
              >
                <CarouselContent className="-ml-1">
                  {ad?.service?.map((serv, i) => {
                    const match = carouselItems.find(
                      (item) => item?.id === serv
                    );
                    return match ? (
                      <CarouselItem
                        key={`${crypto.randomUUID()}`}
                        className="pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center w-full max-w-[300px]"
                      >
                        <Fade>
                          <div className="flex justify-center items-center gap-2 m-1 mr-2">
                            <match.icon className="!w-6 !h-6 text-default-400" />
                            <div className="font-light w-full max-w-[200px] truncate tracking-widest text-default-400">
                              {match?.label}
                            </div>
                          </div>
                        </Fade>
                      </CarouselItem>
                    ) : null;
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          }
        </CardFooter>
      </Card>
    </Fade>
  );
}
