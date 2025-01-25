import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
} from "@heroui/react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselItems } from "../carouselItems";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";


export default function AD({ ad }) {
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const carouselItems = getCarouselItems(service_type);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Card className="m-1 mt-3 ">
      <CardHeader className="pb-0 pt-2 px-4  flex justify-between items-center">
        <p className="text-base capitalize font-medium w-full max-w-[200px] truncate">
          {`${ad.area?.town || ad.area?.city || ad.area?.state || ""}, ${
            ad.area?.country || ""
          }`}
        </p>
        <Carousel
          className="w-full max-w-[80px]"
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
        //   onMouseLeave={plugin.current.reset}
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
                      className={` mt-1 text-default-400 truncate w-full max-w-[80px]`}
                      style={{ fontSize: "8px" }}
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
      </CardHeader>
      <CardBody className="overflow-visible p-0 pb-2">
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

      <CardFooter className="p-0 hidden">
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
                      style={{ fontSize: "8px" }}
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
