"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountry, setSession, setStatus, userInfo, signInStatus, setWishlist } from "@/redux/features/auth/authSlice";
import { setAds, setBlockServiceBtn } from "@/redux/features/editor/editorSlice";
import { useSession, signIn } from "next-auth/react";
import { signUp, updateUserCountry } from "@/lib/action/userAction";
import { findUserAds } from "@/lib/action/adAction";
import { getPaginatedAds } from "@/lib/action/adAction";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import { setADS, setPagination, emptyADS } from "@/redux/features/ad/adSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Image, Card, CardBody, CardFooter, CardHeader, Avatar, Chip, Button } from "@heroui/react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { LogoSpinner } from "@/components/LogoSpinner";
import { ADFooter } from "@/components/Home/ADFooter";
import { countryFlag } from "@/components/countryFlag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { updateUserWishlist } from "@/lib/action/userAction";
import { toast } from "sonner";
import { setSearchValue, setServiceType } from "@/redux/features/search/searchSlice";

// Utility function
async function getCountryFromIP() {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data.country_name;
  } catch (error) {
    console.log("Error getting country from IP:", error);
    return null;
  }
}

// Custom hook for user ads
const useUserAds = (user) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) return;
    const fetchAds = async () => {
      try {
        const ads = await findUserAds({ user });
        dispatch(setAds(ads));
      } catch (error) {
        console.error("Error fetching user ads:", error);
      }
    };
    fetchAds();
  }, [user, dispatch]);
};

// Custom hook for wishlist
const useWishlist = (user, session) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const [loadingAd, setLoadingAd] = useState({});

  const updateWishlist = async (adId) => {
    if (!session) {
      toast.info("Please sign in to add to wishlist");
      signIn(null, { callbackUrl: window.location.href });
      return;
    }
    setLoadingAd((prev) => ({ ...prev, [adId]: true }));
    try {
      const res = await updateUserWishlist({ userId: user, adId });
      if (res.success) {
        dispatch(setWishlist(res.data.wishlist));
      } else {
        toast.error("Failed to update wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("An error occurred while updating the wishlist");
    } finally {
      setLoadingAd((prev) => ({ ...prev, [adId]: false }));
    }
  };

  const isInWishlist = (adId) => wishlist.includes(adId);

  return { wishlist, updateWishlist, isInWishlist, loadingAd };
};

export default function Home() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.auth?._id);
  const country = useSelector((state) => state.auth?.country);
  const ADS = useSelector((state) => state.ADS.ADS);
  const page = useSelector((state) => state.ADS.page);
  const totalPages = useSelector((state) => state.ADS.totalPages);
  const [ref, inView] = useInView();
  const l = useSelector((state) => state.auth?.lang?.home_card);
  const language = useSelector((state) => state.auth?.language);
  const area = searchParams.get("area");
  const serviceType = searchParams.get("serviceType");
  const [prevArea, setPrevArea] = useState(area);
  const [prevServiceType, setPrevServiceType] = useState(serviceType);
  const [hasNoAds, setHasNoAds] = useState(false);
  const isFetchingRef = useRef(false);

  useUserAds(user);
  const { updateWishlist, isInWishlist, loadingAd } = useWishlist(user, session);

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  useEffect(() => {
    const signUpUser = async (user) => {
      try {
        dispatch(setBlockServiceBtn(true));
        const res = await signUp(user);
        if (language !== res.language) {
          router.push(
            `${redirectedPathName(res.language)}?area=${area || ""}&serviceType=${serviceType || ""}`,
            { scroll: false }
          );
        }
        dispatch(userInfo(res));
      } catch (err) {
        console.error("Error signing up user:", err);
        toast.error("Failed to sign up. Please try again.");
      } finally {
        dispatch(setBlockServiceBtn(false));
      }
    };
    if (session) signUpUser(session.user);
    dispatch(signInStatus(status));
  }, [session]);

  useEffect(() => {
    getCountryFromIP().then((country) => dispatch(setCountry(country)));
  }, []);

  useEffect(() => {
    dispatch(setSession(session));
    dispatch(setStatus(status));
  }, [session, status]);

  useEffect(() => {
    if (user && country?.trim()) updateUserCountry({ id: user, country });
  }, [user, country]);

  const fetchMoreAds = async (pageReset) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      let screenHeight = window.innerHeight;
      let limit = 20;
      if (screenHeight >= 1400 && screenHeight < 2160) limit = 40;
      else if (screenHeight >= 2160 && screenHeight < 4320) limit = 80;

      const res = await getPaginatedAds({
        query: {
          page: pageReset ? 1 : page + 1,
          limit,
          area: area || "",
          service: serviceType || "",
        },
      });

      if (res.success) {
        if (res.data.total === 0) {
          if (area || serviceType) {
            toast.warning(`${l?.search_not_found?.title}`, {
              description: `${l?.search_not_found?.description}`,
              action: { label: "OK" },
            });
            router.push(`${redirectedPathName(language)}`, { scroll: false });
          } else {
            setHasNoAds(true);
          }
        } else {
          setHasNoAds(false);
          dispatch(setADS(res.data.ads));
          dispatch(setPagination(res.data));
        }
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast.error(l?.error_fetching_ads || "Error fetching ads");
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    let pageReset_ = false;
    if (area !== prevArea) {
      setPrevArea(area);
      dispatch(emptyADS());
      pageReset_ = true;
    }
    if (serviceType !== prevServiceType) {
      setPrevServiceType(serviceType);
      dispatch(emptyADS());
      pageReset_ = true;
    }
    if (inView && page < totalPages) fetchMoreAds(pageReset_);
    dispatch(setSearchValue(area));
    dispatch(setServiceType(serviceType));
  }, [inView, page, totalPages, area, serviceType]);

  const handleImageClick = (id) => {
    window.open(`${language || "en"}/ad/${id}`, "_blank");
  };

  return (
    <div className="pb-20">
      <main className="flex justify-center flex-col items-center">
        <div className="w-full max-w-[2300px]">
          <div className="w-full">
            {hasNoAds ? (
              <div className="flex flex-col gap-3 justify-center items-center h-[60vh] w-full">
                <div>{l?.no_ads_available || "No ads available"}</div>
              </div>
            ) : ADS.length === 0 ? (
              <div className="flex flex-col gap-3 justify-center items-center h-[60vh] w-full">
                <LogoSpinner text={true} />
              </div>
            ) : (
              <Masonry
                breakpointCols={{
                  default: 6,
                  1879: 5,
                  1639: 4,
                  1127: 3,
                  949: 2,
                  549: 1,
                }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column flex flex-col items-center sm:items-start"
              >
                {ADS.filter((ad) => ad.photo?.length > 0).map((ad, i) => (
                  <Card key={ad._id} className="w-full max-w-[350px] rounded-xl">
                    <CardHeader className="flex justify-center h-[52px]">
                      {(ad?.area?.town || ad?.area?.city || ad?.area?.state || ad?.area?.country) && (
                        <div className="flex justify-center items-center gap-2">
                          {ad?.area?.country ? (
                            <Avatar
                              src={countryFlag.find((c) => c.value.trim().toLowerCase() === ad.area.country.trim().toLowerCase())?.description || ""}
                              showFallback
                              name={ad.area.country}
                              className="max-w-5 h-5 w-full"
                            />
                          ) : (
                            <LocationOnIcon className="w-4 h-4 mt-1" />
                          )}
                          <div className="text-base capitalize font-medium w-full max-w-[220px] truncate tracking-widest">
                            {`${ad?.area?.town || ad?.area?.city || ad?.area?.state || ""}${ad?.area?.town || ad?.area?.city || ad?.area?.state ? ", " : ""}${ad?.area?.country}`}
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardBody className="overflow-visible p-3 pb-1 pt-0">
                      <Carousel
                        className="w-full cursor-pointer"
                        opts={{ align: "start", loop: true, dragFree: false }}
                        onClick={() => handleImageClick(ad._id)}
                      >
                        <CarouselContent>
                          {ad.photo.map((item, idx) => (
                            <CarouselItem key={idx} className="flex justify-center items-start">
                              <Image
                                className="object-cover rounded-xl w-[310px] xl:h-[400px] x1128l:h-[350px] sm:h-[400px] 550px:h-[320px] h-[400px]"
                                src={item.url}
                                alt="ad image"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                      <div
                        className={`absolute inset-x-0 top-0 z-30 flex ${ad.reviewStatus === "Approved" ? "justify-between" : "justify-end"} items-center p-1 pl-6 pr-6`}
                      >
                        {ad.reviewStatus === "Approved" && (
                          <Chip
                            avatar={<Avatar name="allcareok" src="https://www.allcareok.com/images/allcareok_logo.png" />}
                            variant="shadow"
                            classNames={{
                              base: "bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30",
                              content: "drop-shadow shadow-black text-white",
                            }}
                          >
                            <div className="font-medium tracking-wider">{l?.verified}</div>
                          </Chip>
                        )}
                        <Button
                          isIconOnly
                          aria-label={isInWishlist(ad._id) ? "Remove from wishlist" : "Add to wishlist"}
                          size="sm"
                          radius="full"
                          color="danger"
                          variant={isInWishlist(ad._id) ? "solid" : "flat"}
                          isLoading={loadingAd[ad._id] || false}
                          onPress={() => updateWishlist(ad._id)}
                        >
                          <FavoriteBorderIcon style={{ color: "white" }} />
                        </Button>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-center p-0">
                      <ADFooter ad={ad} />
                    </CardFooter>
                  </Card>
                ))}
              </Masonry>
            )}
          </div>
          <div ref={ref} className="w-full h-[50px] flex justify-center items-center">
            {page < totalPages && page > 0 && <LogoSpinner text={false} />}
          </div>
        </div>
      </main>
    </div>
  );
}