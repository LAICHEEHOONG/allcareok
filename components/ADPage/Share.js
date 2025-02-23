"use client";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { getAdsByIds } from "@/lib/action/adAction";
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
  // getAdsFast,
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
import { updateUserWishlist } from "@/lib/action/userAction";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  setSearchValue,
  setServiceType,
} from "@/redux/features/search/searchSlice";
import { Fade } from "react-awesome-reveal";

export default function ShareAD({ slug, title, share_dic, wishlist_dic }) {
  const router = useRouter();
  const [adData, setAdData] = useState({});

  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const user = useSelector((state) => state.auth?._id);
  const country = useSelector((state) => state.auth?.country);
  const wishlist = useSelector((state) => state.auth?.wishlist);
  const [loadingAd, setLoadingAd] = useState({}); // Track loading state per adId
  const searchParams = useSearchParams();
  const area = searchParams.get("area");
  const serviceType = searchParams.get("serviceType");
  // const language = useSelector((state) => state.auth?.language);
  // const l = useSelector((state) => state.auth?.lang?.ad_page);

  useEffect(() => {
    const signUpUser = async (user) => {
      try {
        dispatch(setBlockServiceBtn(true));
        const res = await signUp(user);
        // if (language !== res.language) {
        //   router.push(
        //     `${redirectedPathName(res.language)}?area=${
        //       area ? area : ""
        //     }&serviceType=${serviceType ? serviceType : ""}`,
        //     { scroll: false }
        //   );
        // }

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

  const handleBack = () => {
    // router.push("/");
    router.push(`/${language}`, {
      scroll: false,
    });
  };
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
  return (
    <Fade triggerOnce>
      <div className="flex justify-between pt-2 pb-6">
        {/* <Button
        // className="hidden sm:flex"
        startContent={<ArrowBackIosIcon />}
        variant="light"
        radius="full"
        onPress={handleBack}
      > */}
        {/* {(language === "en" || !language) && "Home"}
        {language === "zh" && "主页"} */}
        {/* {translations[language]?.home ? translations[language]?.home : "Home"} */}
        {/* </Button> */}
        <div className="font-semibold  md:text-lg lg:text-2xl tracking-wider capitalize">
          {title}
        </div>

        <div className="flex justify-center items-center">
          <Button
            // className="hidden x950l:flex"
            startContent={<IosShareIcon />}
            variant="light"
            radius="full"
            onPress={sharePage}
            size="sm"
          >
            {share_dic}
            {/* {lang === "en" && "Share"}
          {lang === "zh" && "分享"} */}
          </Button>

          <Button
            // className="hidden x950l:flex"
            startContent={<FavoriteBorderIcon />}
            // variant="light"
            radius="full"
            aria-label="Like"
            color={isInWishlist(slug) ? "danger" : "default"}
            variant={isInWishlist(slug) ? "solid" : "light"}
            isLoading={loadingAd[slug] || false}
            onPress={() => updateUserWishlist_(slug)}
            size="sm"
          >
            {wishlist_dic}
            {/* Wishlist */}
          </Button>
        </div>
      </div>
    </Fade>
  );
}
