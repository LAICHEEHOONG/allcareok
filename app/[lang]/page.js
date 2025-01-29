"use client";
// import Fruits from "@/components/Fruits";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import {
  findUserAds,
  findAllAds,
  getAdsWithPagination,
} from "@/lib/action/adAction";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios"; // Ensure axios is imported
import ADCard from "@/components/Home/ADCard";
import {
  setADS,
  setPagination,
  setStandbyADS,
} from "@/redux/features/ad/adSlice";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({
    triggerOnce: false, // Set to true if you only want it to trigger once
    threshold: 0.5, // Fires when at least 50% of the element is visible
    rootMargin: "100px 0px", // Adjust when it triggers (100px before it reaches the viewport)
  });
  const standby_ADS = useSelector((state) => state.ADS.standby_ADS);
  const ADS = useSelector((state) => state.ADS.ADS);
  const page = useSelector((state) => state.ADS.page);

  useEffect(() => {
    getCountryFromIP().then((country) => {
      dispatch(setCountry(country));
    });
  }, []);

  useEffect(() => {
    dispatch(setSession(session));
    dispatch(setStatus(status));
  }, [session, dispatch, status]);

  useEffect(() => {
    if (user && country && country.trim()) {
      updateUserCountry({ id: user, country })
        .then(() => {
          // console.log("Country updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating country:", error);
        });
    }
  }, [user, country]);

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
    // Only fetch ads if the userId is available
    if (!user) return;

    const fetchAds = async () => {
      try {
        const ads = await findUserAds({ user }); // Pass only the userId
        dispatch(setAds(ads));
      } catch (error) {
        console.error("Error fetching user ads:", error);
      }
    };

    fetchAds();
  }, [user]); // Add userId as a dependency

  useEffect(() => {
    const getAdsWithPagination_ = async () => {
      try {
        const res = await getAdsWithPagination({
          query: { page: 1, limit: 18 },
        });
        if (res.success) {
          console.log(res.data);
          dispatch(setADS(res.data.ads.slice(0, 12)));
          dispatch(setStandbyADS(res.data.ads.slice(12, 18)));
          dispatch(
            setPagination({
              page: 3,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdsWithPagination_();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const getAdsWithPagination_ = async () => {
      try {
        dispatch(setADS([...ADS, ...standby_ADS]));
        const res = await getAdsWithPagination({
          query: { page: page + 1, limit: 6 },
        });
        if (res.success) {
          dispatch(setStandbyADS(res.data.ads));
          dispatch(
            setPagination({
              total: res.data.total,
              page: res.data.page,
              limit: res.data.limit,
              totalPages: res.data.totalPages,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdsWithPagination_();
  }, [inView]);

  // useEffect(() => {
  //   const findAllAds_ = async () => {
  //     try {
  //       const res = await findAllAds();
  //       if (res.success) {
  //         dispatch(setADS(res.data));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   findAllAds_();
  // }, []);

  return (
    <div>
      <main className="flex justify-center flex-col items-center">
        <div className="w-full max-w-[2300px] p-2 pt-2 sm:p-10 sm:pt-2 x1440l:p-20 x1440l:pt-2">
          <ADCard />
          <div
            ref={ref}
            className=" w-full h-[50px]"
          />
        </div>
      </main>
      <footer className=""> </footer>
    </div>
  );
}
