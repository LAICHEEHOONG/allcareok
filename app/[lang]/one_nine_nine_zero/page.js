"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminKey } from "@/lib/action/userAction";
import { useSelector } from "react-redux";

export default function OneNineNineZero() {

  const router = useRouter();
  const role = useSelector((state) => state.auth?.role);
  const _id = useSelector((state) => state.auth?._id);

  useEffect(() => {
    if (role !== "admin") {
      router.push("/");
    }

    const adminKey_ = async () => {
      try {
        const res = await adminKey({ _id });
        console.log(res);
        if (!res.pass) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    adminKey_();
  }, []);

  return <div></div>;
}

// /one_nine_nine_zero?secret=17041990
