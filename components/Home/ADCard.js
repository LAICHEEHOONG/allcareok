import { findAllAds } from "@/lib/action/adAction";
import { useEffect } from "react";
import { setADS } from "@/redux/features/ad/adSlice";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import AD from "./AD";

export default function ADCard() {
  const dispatch = useDispatch();
  const ADS = useSelector((state) => state.ADS.ADS);

  useEffect(() => {
    const findAllAds_ = async () => {
      try {
        const res = await findAllAds();
        console.log(res);
        if (res.success) {
          dispatch(setADS(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    findAllAds_();
  }, []);

  useEffect(() => {
    console.log(ADS);
  }, [ADS]);

  return (
    <div className="w-full ">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {ADS.map((item) => (
          <AD key={item._id} ad={item} />
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
