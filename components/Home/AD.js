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
    <Card className="pb-10" shadow="none">
      <CardHeader className=" w-full h-[40px] flex justify-center items-center mt-3">
        <div className="w-full max-w-[350px] flex justify-between items-center pr-2">
          <p className="text-base capitalize font-medium w-full max-w-[200px] pr-1 truncate">
            {`${ad.area?.town || ad.area?.city || ad.area?.state || ""}${
              ad.area?.town || ad.area?.city || ad.area?.state ? ", " : ""
            }${ad.area?.country}`}
          </p>
          <Carousel
            className="w-full max-w-[105px]"
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
            }}
            plugins={[plugin.current]}
          >
            <CarouselContent className="-ml-1 ">
              {ad?.service.map((serv, i) => {
                const match = carouselItems.find((item) => item.id === serv);
                return match ? (
                  <CarouselItem
                    key={serv + i}
                    className="pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center"
                  >
                    <Chip color="default" variant="flat" size="md">
                      <div className="w-full flex justify-center items-center gap-2">
                        <div>
                          <match.icon className="w-3 h-3" />
                        </div>
                        <div
                          className=" truncate w-[59px] "
                          style={{ fontSize: "10px" }}
                        >
                          {match.label}
                        </div>
                      </div>
                    </Chip>
                  </CarouselItem>
                ) : null;
              })}
            </CarouselContent>
          </Carousel>
        </div>

      </CardHeader>
      <CardBody className="overflow-visible p-0 ">
        <Carousel
          className="w-full "
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="">
            {ad.photo.length > 0 ? (
              ad.photo.map((item, i) => (
                <CarouselItem key={item.url + i} className="flex justify-center items-start">
                  <div className="flex justify-center items-start h-full  w-full max-w-[350px]">
                    <Image
                      alt={"ads image"}
                      className="object-cover rounded-xl"
                      radius="lg"
                      src={item.url}
                      width={350}
                      height={437.5}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem key="default" className="">
                <div className="flex justify-center items-start h-full">
                  <Image
                    alt="default ad image"
                    className="object-cover rounded-xl"
                    radius="lg"
                    src="/images/plumber.png"
                    width={350}
                    height={437.5}
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </CardBody>
    </Card>
  );
}
