"use client";
import Fruits from "@/components/Fruits";
import { useEffect } from "react";
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
import { findUserAds } from "@/lib/action/adAction";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios"; // Ensure axios is imported
import ADCard from "@/components/Home/ADCard";

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
        router.push(redirectedPathName(res.language));
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

  return (
    <div>
      <main className="flex justify-center flex-col items-center">
        <div className="w-full max-w-[2300px] pl-3 p-3">
          <ADCard />
          {/* <Fruits />
          <Fruits /> */}
        </div>
      </main>
      <footer className=""> </footer>
    </div>
  );
}
