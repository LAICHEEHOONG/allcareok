"use client";
// import Overview from "@/components/dashboard/overview";
import Overview from "@/components/dashboard/overview";
import { findUserAds } from "@/lib/action/adAction"; // Ensure this is correctly exported
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

export default function Overview_() {
  const user = useSelector((state) => state.auth?._id); // Ensure `state.auth` contains `_id`
  const [userAds, setUserAds] = useState([]); // State to store the ads
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

  useEffect(() => {
    // Only fetch ads if the userId is available
    if (!user) return;

    const fetchAds = async () => {
      try {
        const ads = await findUserAds({ user }); // Pass only the userId
        setUserAds(ads); // Store fetched ads in state
        // console.log(ads); // Optional: Log the fetched ads
      } catch (error) {
        console.error("Error fetching user ads:", error);
      }
    };

    fetchAds();
  }, [user]); // Add userId as a dependency

  useEffect(() => {
    if (userAds.length > 0) {
      router.push(`/${currentLocale}/dashboard`);
    }
  }, [userAds]);

  return (
    <div className="w-full flex justify-center items-center">
      <Overview />
    </div>
  );
}
