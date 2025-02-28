"use client";
import { LogoSpinner } from "@/components/LogoSpinner";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <LogoSpinner text={true} />
    </div>
  );
};

export default Loading;
