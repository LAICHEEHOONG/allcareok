"use client";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@heroui/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdsByIds } from "@/lib/action/adAction";

export default function ShareAD({ slug }) {
  const router = useRouter();
  const [adData, setAdData] = useState({});
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
    router.push("/");
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
    <div className="flex justify-between">
      {/* <div className="text-3xl font-medium tracking-wide">{post.data[0].title}</div> */}
      <Button
        // className="hidden sm:flex"
        startContent={<ArrowBackIosIcon />}
        variant="light"
        radius="full"
        onPress={handleBack}
      >
        Home
      </Button>
      {/* <Button
        className="flex lg:hidden"
        isIconOnly
        variant="light"
        radius="full"
      >
        <ArrowBackIosIcon />
      </Button> */}
      <div className="flex sm:gap-2 gap-5 sm:pr-0 pr-2">
        <Button
          className="hidden sm:flex"
          startContent={<IosShareIcon />}
          variant="light"
          radius="full"
          onPress={sharePage}
        >
          Share
        </Button>
        <Button
          className="flex sm:hidden"
          isIconOnly
          variant="light"
          radius="full"
        >
          <IosShareIcon />
        </Button>
        <Button
          className="hidden sm:flex"
          startContent={<FavoriteBorderIcon />}
          variant="light"
          radius="full"
        >
          Wishlist
        </Button>
        <Button
          className="flex sm:hidden"
          isIconOnly
          variant="light"
          radius="full"
        >
          <FavoriteBorderIcon />
        </Button>
      </div>
    </div>
  );
}
