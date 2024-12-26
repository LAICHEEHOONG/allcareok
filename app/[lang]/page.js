"use client";
import Fruits from "@/components/Fruits";
import { getCountryFromIP } from "@/lib/action/userAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCountry } from "@/redux/features/auth/authSlice";
// import { setIsSmallScreen } from "@/redux/features/screen/screenSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCountryFromIP().then((country) => {
      dispatch(setCountry(country));
    });
  }, [dispatch]);

  // const [isSmallScreen, setIsSmallScreen] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
  //   const handleResize = () => dispatch(setIsSmallScreen(mediaQuery.matches));
  //   handleResize(); // Initialize state
  //   mediaQuery.addEventListener("change", handleResize);
  //   return () => mediaQuery.removeEventListener("change", handleResize);
  // }, []);
  return (
    <div className="">
      <main className="flex justify-center flex-col items-center">
        <div className="m-2">
          <Fruits />
          <Fruits />
        </div>
      </main>
      <footer className=""> </footer>
    </div>
  );
}
