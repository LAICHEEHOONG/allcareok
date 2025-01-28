import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Spinner,
} from "@heroui/react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselItems } from "../carouselItems";
import { useRef, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function AD({ ad, fn, adsId }) {
  const service_type = useSelector((state) => state?.auth?.lang?.service_type);
  // const carouselItems = getCarouselItems(service_type) || [];
  const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));

  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    setCarouselItems(getCarouselItems(service_type));
  }, [service_type]);

  return (
    <Card className="p-3 pt-0 ">
      <CardHeader className="flex justify-center h-[52px]">
        {(ad?.area?.town ||
          ad?.area?.city ||
          ad?.area?.state ||
          ad?.area?.country) && (
          <div className="flex justify-center items-center gap-1">
            <LocationOnIcon className="w-4 h-4 mt-1" />
            <div className="text-base capitalize font-medium w-full max-w-[240px] truncate mt-1 tracking-widest ">
              {`${ad?.area?.town || ad?.area?.city || ad?.area?.state || ""}${
                ad?.area?.town || ad?.area?.city || ad?.area?.state ? ", " : ""
              }${ad?.area?.country}`}
            </div>
          </div>
        )}
      </CardHeader>
      <CardBody className="overflow-visible p-0">
        <Carousel
          className="w-full cursor-pointer"
          opts={{
            align: "start",
            loop: true,
            dragFree: false,
          }}
          onClick={() => {
            fn();
          }}
        >
          <CarouselContent className="">
            {ad?.photo?.length > 0 ? (
              ad?.photo?.map((item, i) => (
                <CarouselItem
                  key={item.url + i}
                  className="flex justify-center items-start "
                >
                  <div className="flex justify-center items-start h-full  w-full">
                    <Image
                      alt={"ads image"}
                      className={`object-cover rounded-xl 
                     w-[333px] h-[400px]
                     x550l:w-[280px] x550l:h-[340px]
                     sm:w-[300px] sm:h-[360px]
                     md:w-[400px] md:h-[450px]
                     x950l:w-[300px] x950l:h-[360px] 
                     x1128l:w-[240px] x1128l:h-[300px]  
                     xl:w-[280px] xl:h-[340px]  
                     x1470l:w-[333px] x1470l:h-[400px]
                     x1640l:w-[300px] x1640l:h-[360px]   
                     x1980l:w-[333px] x1980l:h-[400px]
                      `}
                      radius="lg"
                      src={item.url}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem key="default" className="">
                <div className="flex justify-center items-start h-full">
                  <Image
                    alt="default ad image"
                    className="object-cover rounded-xl
                     w-[333px] h-[400px]
                     x550l:w-[280px] x550l:h-[340px]
                     sm:w-[300px] sm:h-[360px]
                     md:w-[400px] md:h-[450px]
                     x950l:w-[300px] x950l:h-[360px] 
                     x1128l:w-[240px] x1128l:h-[300px]  
                     xl:w-[280px] xl:h-[340px]  
                     x1470l:w-[333px] x1470l:h-[400px]
                     x1640l:w-[300px] x1640l:h-[360px]   
                     x1980l:w-[333px] x1980l:h-[400px]"
                    radius="lg"
                    src="/images/plumber.png"
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
        {adsId && adsId === ad?._id && (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl z-40"></div>

            <div className="absolute inset-0 flex items-center justify-center z-40">
              <Spinner color="default" size="lg" />
            </div>
          </>
        )}
      </CardBody>
      <CardFooter className=" flex justify-center p-3 ">
        <div className=" w-full max-w-[400px] h-[20px]">
          <Carousel
            className="w-full max-w-[400px]"
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
            }}
            plugins={[plugin.current]}
          >
            <CarouselContent className="-ml-1">
              {ad?.service?.map((serv, i) => {
                const match = carouselItems.find((item) => item?.id === serv);
                return match ? (
                  <CarouselItem
                    key={serv + i}
                    className={`pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center w-full max-w-[300px]`}
                  >
                    <div className="flex justify-center items-center gap-2 m-1 mr-2 ">
                      <match.icon className="!w-6 !h-6 text-default-400" />
                      <div className="font-light w-full max-w-[200px] truncate tracking-widest text-default-400">
                        {match?.label}
                      </div>
                    </div>
                  </CarouselItem>
                ) : null;
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </CardFooter>
    </Card>
  );
}
