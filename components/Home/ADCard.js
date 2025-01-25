import { findAllAds } from "@/lib/action/adAction";
import { useEffect, useRef } from "react";
import { setADS } from "@/redux/features/ad/adSlice";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
} from "@heroui/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getCarouselItems } from "../carouselItems";

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
        className="my-masonry-grid "
        columnClassName="my-masonry-grid_column "
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
  2000: 5,
  1600: 4,
  1250: 3,
  950: 2,
  550: 1,
};

function AD({ ad }) {
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const carouselItems = getCarouselItems(service_type);

  return (
    <Card className="m-1 mt-3 ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-base capitalize font-medium w-full max-w-[200px] truncate">
          {`${ad.area?.town || ad.area?.city || ad.area?.state || ""}, ${
            ad.area?.country || ""
          }`}
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="">
            {ad.photo.map((item, i) => (
              <CarouselItem key={item.url + i} className="">
                <div className=" flex justify-center items-center h-full">
                  <Image
                    alt={"ads image"}
                    className="object-cover rounded-xl"
                    radius="lg"
                    // shadow="sm"
                    src={item.url}
                    width={350}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardBody>

      <CardFooter className="p-0">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            
          }}
        >
          <CarouselContent className="-ml-1">
            {ad?.service.map((serv, i) => {
              const match = carouselItems.find((item) => item.id === serv);
              return match ? (
                <CarouselItem
                  key={serv + i}
                  className="pl-1 basis-1/7 cursor-pointer group select-none z-30"
                >
                  <div className="flex flex-col justify-center items-center p-2">
                    <match.icon className="w-4 h-4 text-default-400" />
                    <div
                      className={` mt-1 text-default-400 truncate w-full max-w-[100px]`}
                      style={{fontSize: '8px'}}
                    >
                      {match.label}
                    </div>
                  </div>
                </CarouselItem>
              ) : null;
            })}
          </CarouselContent>
          {/* <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" /> */}
        </Carousel>
      </CardFooter>
    </Card>
  );
}
