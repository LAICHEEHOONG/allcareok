import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Skeleton, // Import Skeleton from Hero UI
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import AD from "./AD";
import { LogoSpinner } from "../LogoSpinner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { getCarouselItems } from "../carouselItems";
import { useRef, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Fade } from "react-awesome-reveal";

export default function ADCard() {
  const ADS = useSelector((state) => state.ADS.ADS);
  const service_type = useSelector((state) => state?.auth?.lang?.service_type);
  const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));

  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    setCarouselItems(getCarouselItems(service_type));
    setTimeout(() => setLoading(false), 1000); // Simulate loading
  }, [service_type]);

  return (
    <div className="w-full ">
      {ADS && ADS.length === 0 && (
        <div className="flex flex-col gap-3 justify-center items-center h-[60vh] w-full ">
          <LogoSpinner text={true} />
        </div>
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {ADS.map((ad, i) => (
          // <AD
          //   key={item._id + i}
          //   ad={item}
          //   fn={() => {
          //     console.log("image clicked");
          //   }}
          // />
          <Card className="p-3 pt-0 rounded-xl" key={ad._id + i}>
   
            {/* Ensure full rounded corners */}
            {/* Card Header with Skeleton */}
            <CardHeader className="flex justify-center h-[52px]">
              {loading ? (
                <Skeleton className="w-[240px] h-5 rounded-full" /> // Skeleton for header
              ) : (
                (ad?.area?.town ||
                  ad?.area?.city ||
                  ad?.area?.state ||
                  ad?.area?.country) && (
                  <div className="flex justify-center items-center gap-1">
                    <LocationOnIcon className="w-4 h-4 mt-1" />
                    <div className="text-base capitalize font-medium w-full max-w-[240px] truncate mt-1 tracking-widest">
                      {`${
                        ad?.area?.town ||
                        ad?.area?.city ||
                        ad?.area?.state ||
                        ""
                      }${
                        ad?.area?.town || ad?.area?.city || ad?.area?.state
                          ? ", "
                          : ""
                      }${ad?.area?.country}`}
                    </div>
                  </div>
                )
              )}
            </CardHeader>
            {/* Card Body with Skeleton */}
            <CardBody className="overflow-visible p-0">
              <Carousel
                className="w-full cursor-pointer"
                opts={{ align: "start", loop: true, dragFree: false }}
                onClick={() => {console.log('clicked')}}
              >
                <CarouselContent>
                  {loading ? ( // Show Skeleton if loading
                    <CarouselItem className="flex justify-center items-start">
                      <Skeleton className="w-[333px] h-[400px] rounded-xl" />
                    </CarouselItem>
                  ) : ad?.photo?.length > 0 ? (
                    ad?.photo?.map((item, i) => (
                      <CarouselItem
                        key={`${item._id}-${
                          item.url
                        }-${i}-${crypto.randomUUID()}`}
                        className="flex justify-center items-start"
                      >
                        <div className="flex justify-center items-start h-full w-full">
                          <Image
                            alt="ads image"
                            className="object-cover rounded-xl w-[333px] h-[400px]"
                            radius="lg"
                            src={item.url}
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem className="flex justify-center items-start h-full">
                      <Image
                        alt="default ad image"
                        className="object-cover rounded-xl w-[333px] h-[400px]"
                        radius="lg"
                        src="/images/plumber.png"
                      />
                    </CarouselItem>
                  )}
                </CarouselContent>
              </Carousel>

              {/* {adsId && adsId === ad?._id && (
                <>
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl z-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center z-40">
                    <Spinner color="default" size="lg" />
                  </div>
                </>
              )} */}
            </CardBody>
            {/* Card Footer with Skeleton */}
            <CardFooter className="flex justify-center p-3">
              {loading ? (
                <Skeleton className="w-[300px] h-[20px] rounded-full" /> // Skeleton for footer
              ) : (
                <div className="w-full max-w-[400px] h-[20px]">
                  <Carousel
                    className="w-full max-w-[400px]"
                    opts={{ align: "start", loop: true, dragFree: false }}
                    plugins={[plugin.current]}
                  >
                    <CarouselContent className="-ml-1">
                      {ad?.service?.map((serv, i) => {
                        const match = carouselItems.find(
                          (item) => item?.id === serv
                        );
                        return match ? (
                          <CarouselItem
                            key={`${
                              ad._id
                            }-${serv}-${i}-${crypto.randomUUID()}`}
                            className="pl-1 basis-1/7 cursor-pointer group select-none z-30 flex justify-center items-center w-full max-w-[300px]"
                          >
                            <Fade>
                              <div className="flex justify-center items-center gap-2 m-1 mr-2">
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
              )}
            </CardFooter>
          </Card>
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
