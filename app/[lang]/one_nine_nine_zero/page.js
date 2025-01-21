"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminKey } from "@/lib/action/userAction";
import { useSession, signIn } from "next-auth/react";


export default function OneNineNineZero() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if(!session) {
      signIn()
    }
    // Check if sessionId is empty string, undefined, or null
    // if (!sessionId || !_id) {
    //   router.push("/");
    // }

    // const adminKey_ = async () => {
    //   try {
    //     const res = await adminKey({ _id, sessionId });
    //     console.log(res);
    //     if (!res.pass) {
    //       router.push("/");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     router.push("/");
    //   }
    // };

    // adminKey_();
  }, []);

  return <div></div>;
}

//https://www.allcareok.com/en/one_nine_nine_zero?sessionId={CHECKOUT_SESSION_ID}
