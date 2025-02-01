'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function CheckUser() {
    const signIn = useSelector(state => state?.auth?.signIn)
    const router = useRouter();

    useEffect(() => {
        if(signIn !== 'authenticated') {
            router.push('/')
        }
    }, [])


    return (<div></div>)
}