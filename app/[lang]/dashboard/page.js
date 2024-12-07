// "use client";
// import Overview from "@/components/dashboard/overview";
// import DashboardComponent from "@/components/dashboard/dashboard";
// import { findUserAds } from "@/lib/action/adAction";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export default function Dashboard() {
//   const user = useSelector((state) => state.auth?._id);

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const userAds = await findUserAds({ user });
//         console.log(userAds);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAds();
//   }, []);

//   return (
//     <div className="w-full flex justify-center items-center">
//       <Overview />
//       <DashboardComponent />
//     </div>
//   );
// }

"use client";
import Overview from "@/components/dashboard/overview";
import DashboardComponent from "@/components/dashboard/dashboard";
import { findUserAds } from "@/lib/action/adAction"; // Ensure this is correctly exported
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.auth?._id); // Ensure `state.auth` contains `_id`
  const [userAds, setUserAds] = useState([]); // State to store the ads

  useEffect(() => {
    // Only fetch ads if the userId is available
    if (!user) return;

    const fetchAds = async () => {
      try {
        const ads = await findUserAds({ user }); // Pass only the userId
        setUserAds(ads); // Store fetched ads in state
        console.log(ads); // Optional: Log the fetched ads
      } catch (error) {
        console.error("Error fetching user ads:", error);
      }
    };

    fetchAds();
  }, [user]); // Add userId as a dependency

  return (
    <div className="w-full flex justify-center items-center">
      {userAds.length === 0 ? <Overview /> : <DashboardComponent />}
      {/* <Overview /> Pass ads to Overview component */}
      {/* <DashboardComponent /> */}
    </div>
  );
}
