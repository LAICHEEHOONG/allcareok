"use client";
import Fruits from "@/components/Fruits";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCountry } from "@/redux/features/auth/authSlice";

import axios from "axios"; // Ensure axios is imported

async function getCountryFromIP() {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data.country_name;
  } catch (error) {
    console.error("Error getting country from IP:", error);
    return null;
  }
}

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCountryFromIP().then((country) => {
      dispatch(setCountry(country));
    });
  }, [dispatch]);

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
