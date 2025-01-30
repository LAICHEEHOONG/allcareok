import { findAllAds } from "@/lib/action/adAction";
import { useEffect } from "react";
import { setADS } from "@/redux/features/ad/adSlice";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import AD from "./AD";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";
import { LogoSpinner } from "../LogoSpinner";

export default function ADCard() {
  // const dispatch = useDispatch();
  const ADS = useSelector((state) => state.ADS.ADS);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const findAllAds_ = async () => {
  //     try {
  //       const res = await findAllAds();
  //       if (res.success) {
  //         dispatch(setADS(res.data));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   findAllAds_();
  // }, []);

  return (
    <div className="w-full ">
      {ADS && ADS.length === 0 && (
        <div className="flex flex-col gap-3 justify-center items-center h-[60vh] w-full ">
          <LogoSpinner text={true} />
          {/* <Fade direction="up" cascade>
            <p
              className={`font-bold text-inherit ml-2 text-2xl `}
              style={{ color: "#f31260" }}
            >
              allcareok
            </p>
          </Fade>
          <SyncLoader
            color="#F31260"
            margin={4}
            speedMultiplier={0.9}
            size={25}
          /> */}
        </div>
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {ADS.map((item, i) => (
          <AD
            key={item._id + i}
            ad={item}
            fn={() => {
              console.log("image clicked");
            }}
          />
        ))}
      </Masonry>
    </div>
  );
}

const breakpointColumnsObj = {
  default: 6,
  1879: 5,
  1639: 4,
  1127: 3,
  949: 2,
  549: 1,
};
