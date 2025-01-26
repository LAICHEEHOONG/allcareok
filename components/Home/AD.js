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
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function AD({ ad }) {
  const service_type = useSelector((state) => state.auth?.lang?.service_type);
  const carouselItems = getCarouselItems(service_type);
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));

  return (
    <Card className="p-2" shadow="none">
      <CardHeader className="flex justify-center">
        <div className="flex justify-center items-center gap-1 ">
          <LocationOnIcon className="w-4 h-4 mt-1" />
          <div className="text-base capitalize font-medium w-full max-w-[400px] truncate mt-1 ">
            {`${ad.area?.town || ad.area?.city || ad.area?.state || ""}${
              ad.area?.town || ad.area?.city || ad.area?.state ? ", " : ""
            }${ad.area?.country}`}
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible p-0">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="">
            {ad.photo.length > 0 ? (
              ad.photo.map((item, i) => (
                <CarouselItem
                  key={item.url + i}
                  className="flex justify-center items-start "
                >
                  <div className="flex justify-center items-start h-full  w-full max-w-[400px]">
                    <Image
                      alt={"ads image"}
                      className="object-cover rounded-xl w-[500px] h-[625px] x2160l:w-[450px] x2160l:h-[562px]  x2200l:w-[358px] x2200l:h-[447px]"
                      radius="lg"
                      src={item.url}
                      // width={400}
                      // height={450}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem key="default" className="">
                <div className="flex justify-center items-start h-full">
                  <Image
                    alt="default ad image"
                    className="object-cover rounded-xl w-[500px] h-[625px] x2160l:w-[450px] x2160l:h-[562px] x2200l:w-[358px] x2200l:h-[447px]"
                    radius="lg"
                    src="/images/plumber.png"
                    // width={400}
                    // height={450}
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </CardBody>
      <CardFooter className=" flex justify-center p-3 ">
        <div className=" w-full max-w-[400px] h-[30px]">
          <Carousel
            className="w-full max-w-[400px]"
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
                    <Chip
                      color="default"
                      startContent={
                        <match.icon className="w-4 h-4 text-default-400" />
                      }
                      variant="light"
                      size="md"
                      className="border-1"
                    >
                      <div className="text-default-400">{match.label}</div>
                    </Chip>
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
