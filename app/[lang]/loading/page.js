"use client";
import { Spinner } from "@heroui/react";
import { LogoSpinner } from "@/components/LogoSpinner";

const Loading = () => {
  return (
    // <div className="absolute inset-0 flex items-center justify-center dark text-foreground bg-background">

    //   <div className="text-center" style={{ transform: "scale(2)" }}>
    //     <Spinner color="danger" size="lg" />
    //   </div>
    // </div>
    <div className="h-screen w-full flex justify-center items-center">
      <div >
        <LogoSpinner text={true} />
      </div>
    </div>
  );
};

export default Loading;
