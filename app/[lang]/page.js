// "use client";
// import {
//   Image,
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   Skeleton, // Import Skeleton from Hero UI
// } from "@heroui/react";
// import { useRef, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setCountry,
//   setSession,
//   setStatus,
//   userInfo,
//   signInStatus,
// } from "@/redux/features/auth/authSlice";
// import {
//   setAds,
//   setBlockServiceBtn,
// } from "@/redux/features/editor/editorSlice";
// import { useSession } from "next-auth/react";
// import { signUp, updateUserCountry } from "@/lib/action/userAction";
// import {
//   findUserAds,
//   findAllAds,
//   getAdsWithPagination,
//   getAdsFast,
// } from "@/lib/action/adAction";
// import { useRouter, usePathname } from "next/navigation";
// import axios from "axios"; // Ensure axios is imported
// import ADCard from "@/components/Home/ADCard";
// import {
//   setADS,
//   setPagination,
//   setStandbyADS,
// } from "@/redux/features/ad/adSlice";
// import { useInView } from "react-intersection-observer";
// import { LogoSpinner } from "@/components/LogoSpinner";
// import Masonry from "react-masonry-css";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import { getCarouselItems } from "@/components/carouselItems";
// import Autoplay from "embla-carousel-autoplay";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { Fade } from "react-awesome-reveal";

// async function getCountryFromIP() {
//   try {
//     const response = await axios.get("https://ipapi.co/json/");
//     return response.data.country_name;
//   } catch (error) {
//     console.log("Error getting country from IP:", error);
//     return null;
//   }
// }

// export default function Home() {

//   const { data: session, status } = useSession();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const pathName = usePathname();
//   const user = useSelector((state) => state.auth?._id);
//   const country = useSelector((state) => state.auth?.country);
//   const { ref, inView } = useInView({
//     triggerOnce: false, // Set to true if you only want it to trigger once
//     threshold: 0.5, // Fires when at least 50% of the element is visible
//     rootMargin: "100px 0px", // Adjust when it triggers (100px before it reaches the viewport)
//   });
//   const service_type = useSelector((state) => state?.auth?.lang?.service_type);
//   const standby_ADS = useSelector((state) => state.ADS.standby_ADS);
//   const ADS = useSelector((state) => state.ADS.ADS);
//   const page = useSelector((state) => state.ADS.page);
//   const totalPages = useSelector((state) => state.ADS.totalPages);
//   const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));
//   const [carouselItems, setCarouselItems] = useState([]);
//   const [loading, setLoading] = useState(true); // Add a loading state

//   useEffect(() => {
//     setCarouselItems(getCarouselItems(service_type));
//     setTimeout(() => setLoading(false), 1000); // Simulate loading
//   }, [service_type]);

//   useEffect(() => {
//     getCountryFromIP().then((country) => {
//       dispatch(setCountry(country));
//     });
//   }, []);

//   useEffect(() => {
//     dispatch(setSession(session));
//     dispatch(setStatus(status));
//   }, [session, dispatch, status]);

//   useEffect(() => {
//     if (user && country && country.trim()) {
//       updateUserCountry({ id: user, country })
//         .then(() => {
//           // console.log("Country updated successfully.");
//         })
//         .catch((error) => {
//           console.error("Error updating country:", error);
//         });
//     }
//   }, [user, country]);

//   const redirectedPathName = (locale) => {
//     if (!pathName) return "/";
//     const segments = pathName.split("/");
//     segments[1] = locale;
//     return segments.join("/");
//   };

//   useEffect(() => {
//     const signUpUser = async (user) => {
//       try {
//         dispatch(setBlockServiceBtn(true));
//         const res = await signUp(user);
//         router.push(redirectedPathName(res.language), { scroll: false });
//         dispatch(userInfo(res));
//       } catch (err) {
//         console.log(err);
//       } finally {
//         dispatch(setBlockServiceBtn(false));
//       }
//     };

//     if (session) {
//       signUpUser(session.user);
//       dispatch(signInStatus(status));
//     }
//   }, [session]);

//   useEffect(() => {
//     // Only fetch ads if the userId is available
//     if (!user) return;

//     const fetchAds = async () => {
//       try {
//         const ads = await findUserAds({ user }); // Pass only the userId
//         dispatch(setAds(ads));
//       } catch (error) {
//         console.error("Error fetching user ads:", error);
//       }
//     };

//     fetchAds();
//   }, [user]); // Add userId as a dependency

//   useEffect(() => {
//     const getAdsFast_ = async () => {
//       console.log("getAdsFast_");
//       try {
//         // if (!inView) return;
//         // dispatch(setADS([...ADS, ...standby_ADS]));
//         const res = await getAdsFast({ query: { page: page + 1, limit: 10 } });
//         if (res.success) {
//           dispatch(setStandbyADS(res.data.ads));
//           dispatch(
//             setPagination({
//               total: res.data.total,
//               page: res.data.page,
//               limit: res.data.limit,
//               totalPages: res.data.totalPages,
//             })
//           );
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (inView && page <= totalPages) {
//       // Ensure ADS is not empty before triggering fetching
//       getAdsFast_();
//     }
//   }, [inView]);

//   useEffect(() => {
//     if (standby_ADS.length > 0) {
//       dispatch(setADS(standby_ADS));
//       dispatch(setStandbyADS([]));
//     }
//   }, [standby_ADS]);

//   return (
//     <div>
//       <main className="flex justify-center flex-col items-center">
//         <div className="w-full max-w-[2300px] p-2 pt-2 sm:p-10 sm:pt-2 x1440l:p-20 x1440l:pt-2">
//           {/* <ADCard /> */}
//           <div className="w-full ">
//             {ADS && ADS.length === 0 && (
//               <div className="flex flex-col gap-3 justify-center items-center h-[60vh] w-full ">
//                 <LogoSpinner text={true} />
//               </div>
//             )}
//             <Masonry
//               breakpointCols={{
//                 default: 6,
//                 1879: 5,
//                 1639: 4,
//                 1127: 3,
//                 949: 2,
//                 549: 1,
//               }}
//               className="my-masonry-grid"
//               columnClassName="my-masonry-grid_column"
//             >
//               {ADS.map((ad, i) => (
//                 <Card className="p-3 pt-0 rounded-xl" key={ad._id + i}>
//                   <CardHeader className="flex justify-center h-[52px]">
//                     {loading ? (
//                       <Skeleton className="w-[240px] h-5 rounded-full" /> // Skeleton for header
//                     ) : (
//                       (ad?.area?.town ||
//                         ad?.area?.city ||
//                         ad?.area?.state ||
//                         ad?.area?.country) && (
//                         <div className="flex justify-center items-center gap-1">
//                           <LocationOnIcon className="w-4 h-4 mt-1" />
//                           <div className="text-base capitalize font-medium w-full max-w-[240px] truncate mt-1 tracking-widest">
//                             {`${
//                               ad?.area?.town ||
//                               ad?.area?.city ||
//                               ad?.area?.state ||
//                               ""
//                             }${
//                               ad?.area?.town ||
//                               ad?.area?.city ||
//                               ad?.area?.state
//                                 ? ", "
//                                 : ""
//                             }${ad?.area?.country}`}
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </CardHeader>

//                   <CardBody className="overflow-visible p-0">
//                     <Carousel
//                       className="w-full cursor-pointer"
//                       opts={{ align: "start", loop: true, dragFree: false }}
//                       onClick={() => {
//                         console.log("clicked");
//                       }}
//                     >
//                       <CarouselContent>
//                         {loading ? ( // Show Skeleton if loading
//                           <CarouselItem className="flex justify-center items-start">
//                             <Skeleton className="w-[333px] h-[400px] rounded-xl" />
//                           </CarouselItem>
//                         ) : ad?.photo?.length > 0 ? (
//                           ad?.photo?.map((item, i) => (
//                             <CarouselItem
//                               key={`${item._id}-${
//                                 item.url
//                               }-${i}-${crypto.randomUUID()}`}
//                               className="flex justify-center items-start"
//                             >
//                               <div className="flex justify-center items-start h-full w-full">
//                                 <Image
//                                   alt="ads image"
//                                   className="object-cover rounded-xl w-[333px] h-[400px]"
//                                   radius="lg"
//                                   src={item.url}
//                                 />
//                               </div>
//                             </CarouselItem>
//                           ))
//                         ) : (
//                           <CarouselItem className="flex justify-center items-start h-full">
//                             <Image
//                               alt="default ad image"
//                               className="object-cover rounded-xl w-[333px] h-[400px]"
//                               radius="lg"
//                               src="/images/plumber.png"
//                             />
//                           </CarouselItem>
//                         )}
//                       </CarouselContent>
//                     </Carousel>

//                   </CardBody>

// <CardFooter className="flex justify-center p-3">
//   {loading ? (
//     <Skeleton className="w-[300px] h-[20px] rounded-full" /> // Skeleton for footer
//   ) : (
//     <div className="w-full max-w-[400px] h-[20px]">
//       <Carousel
//         className="w-full max-w-[400px]"
//         opts={{ align: "start", loop: true, dragFree: false }}
//         plugins={[plugin.current]}
//       >
//         <CarouselContent className="-ml-1">
//           {ad?.service?.map((serv, i) => {
//             const match = carouselItems.find(
//               (item) => item?.id === serv
//             );
//             return match ? (
//               <CarouselItem
//                 key={`${
//                   ad._id
//                 }-${serv}-${i}-${crypto.randomUUID()}`}
//                 className="pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center w-full max-w-[300px]"
//               >
//                 <Fade>
//                   <div className="flex justify-center items-center gap-2 m-1 mr-2">
//                     <match.icon className="!w-6 !h-6 text-default-400" />
//                     <div className="font-light w-full max-w-[200px] truncate tracking-widest text-default-400">
//                       {match?.label}
//                     </div>
//                   </div>
//                 </Fade>
//               </CarouselItem>
//             ) : null;
//           })}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   )}
// </CardFooter>
//                 </Card>
//               ))}
//             </Masonry>
//           </div>

//           <div
//             ref={ref}
//             className=" w-full h-[100px] flex justify-center items-center"
//           >
//             {page >= 1 && page < totalPages && <LogoSpinner text={false} />}
//           </div>
//         </div>
//       </main>
//       <footer className=""> </footer>
//     </div>
//   );
// }

"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountry,
  setSession,
  setStatus,
  userInfo,
  signInStatus,
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

} from "@heroui/react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LogoSpinner } from "@/components/LogoSpinner";
import { getCarouselItems } from "@/components/carouselItems";
import { ADFooter } from "@/components/Home/ADFooter";

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
  const [ref, inView] = useInView();
  const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));
  const [carouselItems, setCarouselItems] = useState([]);
  const service_type = useSelector((state) => state?.auth?.lang?.service_type);

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
    setCarouselItems(getCarouselItems(service_type));
  }, [service_type]);

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

  useEffect(() => {
    if (inView && page <= totalPages) {
      const fetchMoreAds = async () => {
        try {
    
          const res = await getAdsFast({
            query: { page: page + 1, limit: 10 },
          });
          if (res.success) {
            dispatch(setStandbyADS(res.data.ads));
            dispatch(setPagination(res.data));
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchMoreAds();
    }
  }, [inView]);

  useEffect(() => {
    if (standby_ADS.length > 0) {
      dispatch(setADS(standby_ADS));
      dispatch(setStandbyADS([]));
    }
  }, [standby_ADS]);

  return (
    <div>
      <main className="flex justify-center flex-col items-center">
        <div className="w-full max-w-[2300px] p-2 pt-2 sm:p-10 sm:pt-2 x1440l:p-20 x1440l:pt-2">
          <div className="w-full">
            {ADS.length === 0 ? (
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
                columnClassName="my-masonry-grid_column"
              >
                {ADS.map((ad, i) => (
                  <Fade key={ad._id + i} triggerOnce>
                    <Card className="p-3 pt-0 pb-0 rounded-xl">
                      <CardHeader className="flex justify-center h-[52px]">
                        {(ad?.area?.town ||
                          ad?.area?.city ||
                          ad?.area?.state ||
                          ad?.area?.country) && (
                          <div className="flex justify-center items-center gap-1">
                            <LocationOnIcon className="w-4 h-4 mt-1" />
                            <div className="text-base capitalize font-medium w-full max-w-[240px] truncate mt-1 tracking-widest">
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
                                    // className="object-cover rounded-xl w-[333px] h-[400px]"

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
                      </CardBody>
                      <CardFooter className="flex justify-center p-0 m-0">
                        <ADFooter ad={ad} />
                        {/* <div className="w-full max-w-[400px] h-[10px] ">
                        <Carousel
                          className="w-full max-w-[400px]"
                          opts={{
                            align: "start",
                            loop: true,
                            dragFree: false,
                          }}
                          plugins={[plugin.current]}
                        >
                          <CarouselContent className="-ml-1">
                            {ad?.service?.map((serv, i) => {
                              const match = carouselItems.find(
                                (item) => item?.id === serv
                              );
                              return match ? (
                                <CarouselItem
                                  key={`${
                                    ad._id
                                  }-${serv}-${i}-${crypto.randomUUID()}`}
                                  className="pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center w-full max-w-[300px]"
                                >
                                  <Fade>
                                    <div className="flex justify-center items-center gap-2 m-1 mr-2 -mt-1 ">
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
                      </div> */}
                      </CardFooter>
                    </Card>
                  </Fade>
                ))}
              </Masonry>
            )}
          </div>
          <div
            ref={ref}
            className="w-full h-[100px] flex justify-center items-center"
          >
            {page >= 1 && page < totalPages && <LogoSpinner text={false} />}
          </div>
        </div>
      </main>
    </div>
  );
}
