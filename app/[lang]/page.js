"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountry,
  setSession,
  setStatus,
  userInfo,
  signInStatus,
  setWishlist,
} from "@/redux/features/auth/authSlice";
import {
  setAds,
  setBlockServiceBtn,
} from "@/redux/features/editor/editorSlice";
import { useSession } from "next-auth/react";
import { signUp, updateUserCountry } from "@/lib/action/userAction";
import { findUserAds, getAdsFast } from "@/lib/action/adAction";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import { Fade } from "react-awesome-reveal";
import {
  setADS,
  setPagination,
  setStandbyADS,
} from "@/redux/features/ad/adSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Avatar,
  Chip,
  Button,
} from "@heroui/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LogoSpinner } from "@/components/LogoSpinner";
import { ADFooter } from "@/components/Home/ADFooter";
import { countryFlag } from "@/components/countryFlag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { updateUserWishlist } from "@/lib/action/userAction";
import { signIn } from "next-auth/react";
import { CrashPrevent } from "@/lib/frontend_tool";
import { showToast } from "@/lib/frontend_tool";

async function getCountryFromIP() {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data.country_name;
  } catch (error) {
    console.log("Error getting country from IP:", error);
    return null;
  }
}

export default function Home() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const user = useSelector((state) => state.auth?._id);
  const country = useSelector((state) => state.auth?.country);
  const standby_ADS = useSelector((state) => state.ADS.standby_ADS);
  const ADS = useSelector((state) => state.ADS.ADS);
  const page = useSelector((state) => state.ADS.page);
  const totalPages = useSelector((state) => state.ADS.totalPages);
  // const [ref, inView] = useInView();
  const [ref, inView] = useInView({
    threshold: 1, // Increase the percentage of visibility required
    triggerOnce: false, // Ensure it keeps triggering
  });
  const [starter, setStarter] = useState(false);
  const l = useSelector((state) => state.auth?.lang?.home_card);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const [loadingAd, setLoadingAd] = useState({}); // Track loading state per adId

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
        router.push(redirectedPathName(res.language), { scroll: false });
        dispatch(userInfo(res));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setBlockServiceBtn(false));
      }
    };

    if (session) {
      signUpUser(session.user);
      dispatch(signInStatus(status));
    }
  }, [session]);

  useEffect(() => {
    getCountryFromIP().then((country) => dispatch(setCountry(country)));
  }, []);

  useEffect(() => {
    dispatch(setSession(session));
    dispatch(setStatus(status));
  }, [session, status]);

  useEffect(() => {
    if (user && country?.trim()) {
      updateUserCountry({ id: user, country });
    }
  }, [user, country]);

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
  }, [user]);

  // fectch data
  useEffect(() => {
    const fetchMoreAds = async () => {
      try {
        const res = await getAdsFast({
          query: { page: page + 1, limit: 12 },
        });
        if (res.success) {
          dispatch(setStandbyADS(res.data.ads));
          dispatch(setPagination(res.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!starter) {
          setTimeout(() => {
            setStarter(true);
          }, 500);
        }
      }
    };
    if (standby_ADS.length === 0 && page <= totalPages) {
      fetchMoreAds();
    }
  }, [standby_ADS]);

  // show data
  useEffect(() => {
    if (standby_ADS.length > 0) {
      setTimeout(() => {
        dispatch(setADS(standby_ADS));
        dispatch(setStandbyADS([]));
      }, 500);
    }
  }, [inView]);

  useEffect(() => {
    if (page > totalPages) {
      setStarter(false);
    }
  }, [page]);

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
      console.log(res);
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

  // Check if the ad is in the wishlist
  const isInWishlist = (adId) => wishlist.includes(adId);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        // Manually trigger the logic when close to the bottom
        dispatch(setADS(standby_ADS));
        dispatch(setStandbyADS([]));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [standby_ADS]);

  return (
    <div className="pb-20">
      <main className="flex justify-center flex-col items-center">
        <div className="w-full max-w-[2300px] p-2 pt-2 sm:p-10 sm:pt-2 x1440l:p-20 x1440l:pt-2">
          <div className="w-full">
            {ADS.length === 0 ? (
              <div className="flex flex-col gap-3 justify-center items-center h-[60vh] w-full ">
                <LogoSpinner text={true} />
                <CrashPrevent />
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
                columnClassName="my-masonry-grid_column"
              >
                {ADS.map((ad, i) => (
                  // <Fade key={ad._id + i} triggerOnce>
                  <Card key={ad._id + i} className="p-3 pb-1 pt-0 rounded-xl">
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
                              showFallback
                              name={ad.area.country}
                              // alt={ad.area.country}
                              className="max-w-5 h-5 w-full"
                            />
                          ) : (
                            <LocationOnIcon className="w-4 h-4 mt-1" />
                          )}

                          <div className="text-base capitalize font-medium w-full max-w-[220px] truncate tracking-widest">
                            {`${
                              ad?.area?.town ||
                              ad?.area?.city ||
                              ad?.area?.state ||
                              ""
                            }${
                              ad?.area?.town ||
                              ad?.area?.city ||
                              ad?.area?.state
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
                      >
                        <CarouselContent>
                          {ad.photo?.length ? (
                            ad.photo.map((item, idx) => (
                              <CarouselItem
                                key={idx}
                                className="flex justify-center items-start"
                              >
                                <Image
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
                                  src={item.url}
                                  alt="ad image"
                                />
                              </CarouselItem>
                            ))
                          ) : (
                            <CarouselItem>
                              <Image
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
                                src="/images/plumber.png"
                                alt="default image"
                              />
                            </CarouselItem>
                          )}
                        </CarouselContent>
                      </Carousel>
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
                              // className="bg-white"
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
                            // isLoading={isLoading} // Show loading when updating
                            isLoading={loadingAd[ad._id] || false} // Only the clicked button will show loading
                            onPress={() => updateUserWishlist_(ad._id)} // Handle wishlist update
                          >
                            <FavoriteBorderIcon style={{ color: "white" }} />
                          </Button>
                        </div>
                      </>
                    </CardBody>
                    <CardFooter className="flex justify-center p-0">
                      <ADFooter ad={ad} />
                    </CardFooter>
                  </Card>
                  // </Fade>
                ))}
              </Masonry>
            )}
          </div>

          {starter && (
            <div
              ref={ref}
              className={`w-full h-[100px] flex justify-center items-center `}
            >
              {page <= totalPages && page > 1 && <LogoSpinner text={false} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
