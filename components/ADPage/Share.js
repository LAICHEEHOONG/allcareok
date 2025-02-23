"use client";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { getAdsByIds } from "@/lib/action/adAction";
import { useDispatch, useSelector } from "react-redux";
import {
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
import { signUp } from "@/lib/action/userAction";
import { findUserAds } from "@/lib/action/adAction";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

import { updateUserWishlist } from "@/lib/action/userAction";
import { signIn } from "next-auth/react";

import { Fade } from "react-awesome-reveal";
import { addEmailToUserView } from "@/lib/action/adAction";

export default function ShareAD({ slug, title, share_dic, wishlist_dic, _id }) {
  const router = useRouter();
  const [adData, setAdData] = useState({});
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?._id);
  const email = useSelector((state) => state.auth?.email);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const [loadingAd, setLoadingAd] = useState({}); // Track loading state per adId

  useEffect(() => {
    const signUpUser = async (user) => {
      try {
        dispatch(setBlockServiceBtn(true));
        const res = await signUp(user);

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
    dispatch(setSession(session));
    dispatch(setStatus(status));
  }, [session, status]);

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
      // console.log(res);
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

  useEffect(() => {
    const getAdsByIds_ = async () => {
      try {
        const ad = await getAdsByIds([slug]);
        const {
          _id,
          user,
          photo,
          title,
          service,
          area,
          contact,
          youtube,
          description,
          reviewStatus,
          views,
          createdAt,
        } = ad.data[0];
        setAdData({
          _id,
          user,
          photo,
          title,
          service,
          area,
          contact,
          youtube,
          description,
          reviewStatus,
          views,
          createdAt,
        });
      } catch (error) {
        console.log(error);
      }
    }; // Your fetch function
    getAdsByIds_();
  }, [slug]);

  useEffect(() => {
    console.log(adData);
  }, [adData]);

  // const handleBack = () => {
  //   // router.push("/");
  //   router.push(`/${language}`, {
  //     scroll: false,
  //   });
  // };
  const sharePage = async () => {
    const pageUrl = window.location.href; // Get current URL
    console.log(pageUrl);
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this webpage!",
          url: pageUrl,
        });
        console.log("Page shared successfully!");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(pageUrl);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    const addEmailToUserView_ = async (email, _id) => {
      try {
        const res = await addEmailToUserView({ email, _id });
        console.log(res.message);
      } catch (error) {
        console.log(error);
      }
    };
    if (email && _id) {
      addEmailToUserView_(email, _id);
    }
  }, [email, _id]);
  return (
    <Fade triggerOnce>
      <div className="flex justify-between pt-2 pb-6">
        <div className="font-semibold  md:text-lg lg:text-2xl tracking-wider capitalize">
          {title}
        </div>

        <div className="flex justify-center items-center">
          <Button
            startContent={<IosShareIcon />}
            variant="light"
            radius="full"
            onPress={sharePage}
            size="sm"
          >
            {share_dic}
          </Button>

          <Button
            startContent={<FavoriteBorderIcon />}
            radius="full"
            aria-label="Like"
            color={isInWishlist(slug) ? "danger" : "default"}
            variant={isInWishlist(slug) ? "solid" : "light"}
            isLoading={loadingAd[slug] || false}
            onPress={() => updateUserWishlist_(slug)}
            size="sm"
          >
            {wishlist_dic}
          </Button>
        </div>
      </div>
    </Fade>
  );
}
