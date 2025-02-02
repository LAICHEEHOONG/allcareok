"use client";
import { SyncLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";

export default function LogoSpinner({ text = true }) {
  
  return (
    <div className="flex flex-col justify-center items-center ">
      {text && (
        <Fade direction="up" cascade className="mr-2">
          <p
            className={`font-bold text-inherit ml-2 text-2xl `}
            style={{ color: "#f31260" }}
          >
            allcareok
          </p>
        </Fade>
      )}

      <SyncLoader  color="#F31260" margin={8} speedMultiplier={0.9} size={20} />
    </div>

    // <div className="flex flex-col justify-center items-center">
    //   <Fade direction="up" cascade>
    //     {text && (
    //       <p
    //         className={`font-bold text-inherit ml-2 text-2xl `}
    //         style={{ color: "#f31260" }}
    //       >
    //         allcareok
    //       </p>
    //     )}

    //     <SyncLoader
    //       color="#F31260"
    //       margin={4}
    //       speedMultiplier={0.9}
    //       size={25}
    //     />
    //   </Fade>
    // </div>
  );
}
