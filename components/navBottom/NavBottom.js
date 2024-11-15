// 'use client'
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { useState } from 'react';

// export default function NavBottom() {
//   const [value, setValue] = useState(0);

//   return (
//     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
//       <Box>
//         <BottomNavigation
//           showLabels
//           value={value}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//         >
//           <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
//           <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
//           <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
//         </BottomNavigation>
//       </Box>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function NavBottom() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      className="fixed bottom-0 z-50 w-full block sm:hidden"
      animate={{
        y: isVisible ? 0 : 100, // Animate the y-axis position
      }}
      initial={{
        y: 0, // Initial position
      }}
      transition={{
        duration: 0.3, // Animation duration
        ease: "easeInOut", // Smooth easing
      }}
    >
      <Box>
        <BottomNavigation
          showLabels
          value={0}
          onChange={(event, newValue) => {
            // Handle navigation state if necessary
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
    </motion.div>
  );
}
