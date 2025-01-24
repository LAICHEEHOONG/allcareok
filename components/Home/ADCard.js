import { findAllAds } from "@/lib/action/adAction";
import { useEffect, useRef } from "react";
import { setADS } from "@/redux/features/ad/adSlice";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import { Image, Card, CardBody, CardFooter } from "@heroui/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
    <div className="w-full">
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
  // 1500: 4,
  // 1150: 3,
  // 900: 2,
  // 650: 1,
};

function AD({ ad }) {
  return (
    <div className="m-3">
      <Carousel
        className="w-full  "
        opts={{
          align: "start",
          loop: true,
        }}
        // plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {ad.photo.map((item) => (
            <CarouselItem
              key={item.url}
              className="flex justify-center items-center"
            >
              <Image
                alt={"ads image"}
                className="object-cover w-[400px] h-[400px]"
                radius="lg"
                shadow="sm"
                src={item.url}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="pt-3">
        <div className="text-base uppercase font-bold">{`${ad.area?.town && ad.area?.town + ','} ${ad.area?.city && ad.area?.city + ',' } ${ad.area?.state && ad.area?.state + ','} ${ad.area?.country}`}</div>
        <div>
          
        </div>
      </div>
    </div>
  );
}
