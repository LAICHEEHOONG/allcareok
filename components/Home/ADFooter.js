import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Fade } from "react-awesome-reveal";
import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useSelector } from "react-redux";
import { getCarouselItems } from "../carouselItems";

export const ADFooter = ({ ad }) => {
  const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));
  const service_type = useSelector((state) => state?.auth?.lang?.service_type);
  const [carouselItems, setCarouselItems] = useState([]);
  useEffect(() => {
    setCarouselItems(getCarouselItems(service_type));
  }, [service_type]);
  return (
    <div className="w-full flex justify-center items-center max-w-[300px] h-[35px] ">
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
                key={`${ad._id}-${serv}-${i}-${crypto.randomUUID()}`}
                className="pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center w-full max-w-[300px]"
              >
                <Fade>
                  <div className="flex justify-center items-center gap-2 m-1 mr-2 ">
                    <match.icon className="!w-6 !h-6 text-default-400" />
                    <div className="font-light w-full max-w-[200px] truncate tracking-widest text-default-400">
                      {match?.label}
                    </div>
                  </div>
                </Fade>
              </CarouselItem>
            ) : null;
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
