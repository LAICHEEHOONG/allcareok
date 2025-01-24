import { findAllAds } from "@/lib/action/adAction";
import { useEffect, useRef } from "react";
import { setADS } from "@/redux/features/ad/adSlice";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import { Image, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
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
  // 1500: 4,
  // 1150: 3,
  // 900: 2,
  // 650: 1,
};

function AD({ ad }) {
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const carouselItems = getCarouselItems(service_type);

  return (
    <Card className="py-4  m-1 mt-3">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold w-full max-w-[200px] truncate">{`${
          ad.area?.town && ad.area?.town + ","
        } ${ad.area?.city && ad.area?.city + ","} ${
          ad.area?.state && ad.area?.state + ","
        } ${ad.area?.country}`}</p>

        {/* <div className="w-full flex gap-2 justify-between m-1">
          {ad?.service.map((serv) => {
            const match = carouselItems.find((item) => item.id === serv);
            return match ? <match.icon className="w-6 h-6 m-1" /> : null;
          })}

        </div> */}
        {/* <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4> */}
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
            {ad.photo.map((item) => (
              <CarouselItem key={item.url} className="">
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
      <CardFooter className="text-small justify-between">
        <div className="w-full flex gap-2 justify-between m-1">
          {ad?.service.map((serv, i) => {
            const match = carouselItems.find((item) => item.id === serv);
            return match ? (
              <match.icon className="w-6 h-6" key={serv + i} />
            ) : null;
          })}
        </div>
      </CardFooter>
    </Card>
    // <div className="">
    //   <Carousel
    //     className="w-full"
    //     opts={{
    //       align: "start",
    //       loop: true,
    //     }}
    //   >
    //     <CarouselContent className="">
    //       {ad.photo.map((item) => (
    //         <CarouselItem key={item.url} className="">
    //           <div className=" flex justify-center items-center">
    //             <Image
    //               alt={"ads image"}
    //               className="object-cover w-[350px] h-[400px]"
    //               radius="lg"
    //               // shadow="sm"
    //               src={item.url}
    //             />
    //           </div>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //   </Carousel>
    // </div>
  );
}
