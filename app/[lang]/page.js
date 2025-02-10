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
import {
  findUserAds,
  getAdsFast,
  getPaginatedAds,
} from "@/lib/action/adAction";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import { setADS, setPagination, emptyADS } from "@/redux/features/ad/adSlice";
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
// import { setFire } from "@/redux/features/search/searchSlice";

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
  const ADS = useSelector((state) => state.ADS.ADS);
  const page = useSelector((state) => state.ADS.page);
  const totalPages = useSelector((state) => state.ADS.totalPages);
  const [ref, inView] = useInView();
  // const area = useSelector((state) => state.search?.value);
  // const fire = useSelector((state) => state.search?.fire);
  const l = useSelector((state) => state.auth?.lang?.home_card);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const [loadingAd, setLoadingAd] = useState({}); // Track loading state per adId
  const searchParams = useSearchParams();
  const area = searchParams.get("area");
  const serviceType = searchParams.get("serviceType");
  const [prevArea, setPrevArea] = useState(area);
  const [prevServiceType, setPrevServiceType] = useState(serviceType);
  // const serviceType = useSelector((state) => state.search?.serviceType);

  // useEffect(() => {
  //   const filtersChanged = area !== prevArea || serviceType !== prevServiceType;
  //   if (filtersChanged) {
  //     dispatch(emptyADS()); // Clear previous ads only when filters change
  //     setPrevArea(area); // Update previous values
  //     setPrevServiceType(serviceType);
  //   }
  // }, [area, serviceType]);

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
        router.push(
          `${redirectedPathName(
            res.language
          )}?area=${area}&serviceType=${serviceType}`,
          { scroll: false }
        );
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

  // useEffect(() => {
  //   const fetchMoreAds = async () => {
  //     try {
  //       let screenHeight = window.innerHeight;
  //       let limit = 20; // Default limit

  //       if (screenHeight >= 1400 && screenHeight < 2160) {
  //         limit = 40;
  //       } else if (screenHeight >= 2160 && screenHeight < 4320) {
  //         limit = 80;
  //       }

  //       // const res = await getAdsFast({
  //       //   query: { page: page + 1, limit: limit },
  //       // });
  //       const res = await getPaginatedAds({
  //         query: { page: page + 1, limit: limit, area: area },
  //       });

  //       if (res.success) {
  //         dispatch(setADS(res.data.ads));
  //         dispatch(setPagination(res.data));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (page < totalPages && inView) {
  //     fetchMoreAds();
  //   }
  // }, [inView]);

  // useEffect(() => {
  //   const fetchMoreAds = async () => {
  //     try {
  //       let screenHeight = window.innerHeight;
  //       let limit = 20; // Default limit

  //       if (screenHeight >= 1400 && screenHeight < 2160) {
  //         limit = 40;
  //       } else if (screenHeight >= 2160 && screenHeight < 4320) {
  //         limit = 80;
  //       }

  //       const res = await getPaginatedAds({
  //         query: {
  //           page: page + 1,
  //           limit: limit,
  //           area: area,
  //           service: serviceType,
  //         },
  //       });

  //       if (res.success) {
  //         dispatch(setADS(res.data.ads));
  //         dispatch(setPagination(res.data));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (page < totalPages && inView) {
  //     // dispatch(emptyADS()); // Clear previous ads when area changes
  //     fetchMoreAds();
  //     console.log('fetch 1')
  //   }

  // }, [inView]); // Now also runs when 'area' changes

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
  // useEffect(() => {
  //   console.log("Area:", area || "No area provided");
  // }, [area]);

  // useEffect(() => {
  //   if (area || serviceType) {
  //     dispatch(emptyADS());
  //     // dispatch(setFire());
  //   }
  // }, [area, serviceType]);

  // useEffect(() => {
  //   if (fire) {
  //     dispatch(emptyADS());
  //     dispatch(setFire());
  //   }
  // }, [fire]);

  // useEffect(() => {
  //   console.log(ADS.length);
  // }, [ADS]);
  // useEffect(() => {
  //   const fetchMoreAds = async () => {
  //     try {
  //       let screenHeight = window.innerHeight;
  //       let limit = 20; // Default limit

  //       if (screenHeight >= 1400 && screenHeight < 2160) {
  //         limit = 40;
  //       } else if (screenHeight >= 2160 && screenHeight < 4320) {
  //         limit = 80;
  //       }

  //       const res = await getPaginatedAds({
  //         query: {
  //           page: 1, // Reset to first page when filters change
  //           limit: limit,
  //           area: area,
  //           service: serviceType,
  //         },
  //       });

  //       if (res.success) {
  //         dispatch(emptyADS()); // Clear previous ads
  //         dispatch(setADS(res.data.ads));
  //         dispatch(setPagination(res.data));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (area || serviceType) {
  //     fetchMoreAds();
  //     console.log("Fetching ads for new area or serviceType");
  //   }
  // }, [area, serviceType]); // Run effect when area or serviceType changes
  useEffect(() => {
    const fetchMoreAds = async () => {
      try {
        let screenHeight = window.innerHeight;
        let limit = 20; // Default limit

        if (screenHeight >= 1400 && screenHeight < 2160) {
          limit = 40;
        } else if (screenHeight >= 2160 && screenHeight < 4320) {
          limit = 80;
        }
        // const filtersChanged =
        //   area !== prevArea || serviceType !== prevServiceType;

        const res = await getPaginatedAds({
          query: {
            // page: area || serviceType ? 1 : page + 1, // Reset page if filter changes
            // page: filtersChanged ? 1 : page + 1, // Reset page only when filters change
            page: page + 1,
            limit: limit,
            area: area ? area : "",
            service: serviceType ? serviceType : "",
          },
        });

        console.log(res);

        if (res.success) {
          // if (area || serviceType) {
          //   dispatch(emptyADS()); // Clear ads if filter changed
          // }
          // if (filtersChanged) {
          //   dispatch(emptyADS()); // Clear previous ads only when filters change
          //   setPrevArea(area); // Update previous values
          //   setPrevServiceType(serviceType);
          // }
          dispatch(setADS(res.data.ads));
          dispatch(setPagination(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    // const filtersChanged = area !== prevArea || serviceType !== prevServiceType;
    // if (filtersChanged) {
    //   dispatch(emptyADS()); // Clear previous ads only when filters change
    //   setPrevArea(area); // Update previous values
    //   setPrevServiceType(serviceType);
    //   // fetchMoreAds();
    //   // console.log("Fetching ads");
    // } else {
    //   if (inView || area || serviceType) {
    //     if (page < totalPages) {
    //       fetchMoreAds();
    //       console.log("Fetching ads");
    //     }
    //   }
    // }

    if (area !== prevArea) {
      setPrevArea(area);
      dispatch(emptyADS());
    }

    if (serviceType !== prevServiceType) {
      setPrevServiceType(serviceType);
      dispatch(emptyADS());
    }

    if (
      inView ||
      area !== prevArea ||
      serviceType !== prevServiceType
    ) {
      if (page < totalPages) {
        fetchMoreAds();
        console.log("Fetching ads");
      }
    }

    // console.log(prevArea, area);
    // console.log(prevServiceType, serviceType);
    // if ((page < totalPages && inView) || area || serviceType) {

    //   fetchMoreAds();
    //   console.log("Fetching ads");
    // }
  }, [inView, area, serviceType, prevArea, prevServiceType]);

  return (
    <div className="pb-20">
      <main className="flex justify-center flex-col items-center">
        <div className="w-full max-w-[2300px]">
          <div className="w-full">
            {ADS.length === 0 ? (
              <div className="flex flex-col gap-3 justify-center items-center h-[60vh] w-full ">
                <LogoSpinner text={true} />
                {/* <CrashPrevent /> */}
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
                className="my-masonry-grid "
                columnClassName="my-masonry-grid_column flex flex-col items-center sm:items-start"
              >
                {ADS.filter((ad) => ad.photo?.length > 0).map((ad, i) => (
                  <Card
                    key={ad._id + i}
                    className="w-full max-w-[350px] rounded-xl "
                  >
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

                    <CardBody className="overflow-visible p-3 pb-1 pt-0">
                      <Carousel
                        className="w-full cursor-pointer"
                        opts={{ align: "start", loop: true, dragFree: false }}
                      >
                        <CarouselContent>
                          {ad.photo.map((item, idx) => (
                            <CarouselItem
                              key={idx}
                              className="flex justify-center items-start"
                            >
                              {/* <Image
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
                              /> */}
                              <Image
                                className={`object-cover rounded-xl w-[310px] xl:h-[400px] x1128l:h-[350px] sm:h-[400px] 550px:h-[320px] h-[400px]`}
                                src={item.url}
                                alt="ad image"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>

                      <div
                        className={`absolute inset-x-0 top-0 z-30 flex ${
                          ad.reviewStatus === "Approved"
                            ? "justify-between"
                            : "justify-end"
                        } items-center p-1 pl-6 pr-6`}
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
                          variant={isInWishlist(ad._id) ? "solid" : "flat"}
                          isLoading={loadingAd[ad._id] || false}
                          onPress={() => updateUserWishlist_(ad._id)}
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
          <div
            ref={ref}
            className={`w-full h-[50px] flex justify-center items-center`}
          >
            {page < totalPages && page > 0 && <LogoSpinner text={false} />}
          </div>
        </div>
      </main>
    </div>
  );
}
