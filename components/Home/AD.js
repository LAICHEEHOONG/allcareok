import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
  Chip,
} from "@heroui/react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselItems } from "../carouselItems";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function AD({ ad }) {
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const carouselItems = getCarouselItems(service_type);
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));

  return (
    <Card className="m-1 mt-3 ">
      <CardHeader className="pb-0 pt-2 px-4  flex justify-between items-center">
        <p className="text-base capitalize font-medium w-full max-w-[200px] pr-1 truncate">
          {`${ad.area?.town || ad.area?.city || ad.area?.state || ""}, ${
            ad.area?.country || ""
          }`}
        </p>
        <Carousel
          className="w-full max-w-[115px]"
          opts={{
            align: "start",
            loop: true,
            dragFree: false,
          }}
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-1">
            {ad?.service.map((serv, i) => {
              const match = carouselItems.find((item) => item.id === serv);
              return match ? (
                <CarouselItem
                  key={serv + i}
                  className="pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center"
                >
                  <Chip
                    className="p-2"
                    color="default"
                    startContent={<match.icon className="w-4 h-4" />}
                    variant="flat"
                    size="md"
                  >
                    <div
                      className=" truncate w-[70px]"
                      style={{ fontSize: "12px" }}
                    >
                      {match.label}
                    </div>
                  </Chip>
                </CarouselItem>
              ) : null;
            })}
          </CarouselContent>
        </Carousel>
      </CardHeader>
      <CardBody className="overflow-visible p-2">
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
                <div className=" flex justify-center items-start h-full ">
                  <Image
                    alt={"ads image"}
                    className="object-cover rounded-xl"
                    radius="lg"
                    // shadow="sm"
                    src={item.url}
                    width={350}
                    height={437.5}
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
