"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export function CheckUser() {
  const signIn = useSelector((state) => state?.auth?.signIn);
  const router = useRouter();

  useEffect(() => {
    if (signIn !== "authenticated") {
      router.push("/");
    }
  }, []);

  return <></>;
}

export function CrashPrevent() {
  const ADS = useSelector((state) => state.ADS.ADS);

  useEffect(() => {
    console.log("crash prevent");
    const handleRefresh = () => {
      console.log("handleRefresh");
      window.location.reload();
    };
    if (ADS.length === 0) {
      const timer = setTimeout(() => {
        handleRefresh();
      }, 10000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [ADS]);

  return <></>;
}

export const showToast = (title = "Warning", description = "", fn = () => {}) => {

  toast.success(title, {
    description: description,
    action: {
      label: "OK",
      onClick: () => {
        if (typeof fn === "function") fn(); // Check before calling
      },
    },
  });
};