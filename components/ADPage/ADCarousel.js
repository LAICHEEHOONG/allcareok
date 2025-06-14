"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import { Card, Image, Button, CardHeader } from "@nextui-org/react";
import { Card, Image, Button, CardHeader } from "@heroui/react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Fade } from "react-awesome-reveal";
// import {
//   CLOUDINARY_ENVIRONMENTS,
//   CLOUDINARY_URL_ID,
// } from "@/util/cloudinarySetup";

const ADCarousel = ({ photo }) => {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = photo?.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div
    // className="w-full max-w-[375px] "
    >
      <EmblaCarousel slides={SLIDES} options={OPTIONS} photo={photo} />
    </div>
  );
};

export default ADCarousel;

const EmblaCarousel = (props) => {
  const { slides, options, photo } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div
        className="embla__viewport "
        ref={emblaMainRef}
      >
        <div className="embla__container ">
          {slides &&
            slides.map((index) => (
              <div
                className="embla__slide flex justify-center flex-col  items-center "
                key={index}
              >
                <Fade>
                  <Card className="border-none" shadow="none">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-end">
                      <Button
                        className="backdrop-filter backdrop-blur bg-opacity-30 bg-white"
                        size="sm"
                        isIconOnly
                        radius="full"
                        aria-label="Take a photo"
                        onPress={() => {
                          window.open(
                            photo[index].url,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      >
                        <FullscreenIcon />
                      </Button>
                    </CardHeader>
                    <Image
                      className="z-0 object-cover x950l:block md:hidden block"
                      width={367}
                      height={500}
                      // className="z-0 object-cover x950l:h-[500px] x950l:w-[375px] h-[400px] w-[300px] "
                      alt="service photo"
                      src={`${photo[index]?.url}`}
                    />
                    <Image
                      className="z-0 object-cover x950l:hidden md:block hidden"
                      width={367}
                      height={400}
                      // className="z-0 object-cover x950l:h-[500px] x950l:w-[375px] h-[400px] w-[300px] "
                      alt="service photo"
                      src={`${photo[index]?.url}`}
                    />
                  </Card>
                </Fade>
              </div>
            ))}
          {/* {slides &&
            slides.map((index) => (
              <div
                className="embla__slide flex justify-center flex-col  items-center  w-full x950l:max-w-[375px] max-w-[300px] border-2 border-red-500 "
                key={index}
              >
                <Fade>
                  <Card className="border-none" shadow="none">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-end">
                      <Button
                        className="backdrop-filter backdrop-blur bg-opacity-30 bg-white"
                        size="sm"
                        isIconOnly
                        radius="full"
                        aria-label="Take a photo"
                        onPress={() => {
                          window.open(
                            photo[index].url,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      >
                        <FullscreenIcon />
                      </Button>
                    </CardHeader>
                    <Image
                      className="z-0 object-cover x950l:h-[500px] x950l:w-[375px] h-[400px] w-[300px] "
                      alt="NextUI Fruit Image with Zoom"
                      src={`${photo[index]?.url}`}
                    />
                  </Card>
                </Fade>
              </div>
            ))} */}
        </div>
      </div>

      <div className="embla-thumbs ml-2 mr-2">
        <div className="embla-thumbs__viewport " ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides &&
              slides.map((index) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  selectedIndex={selectedIndex}
                  //   modelData={modelData}
                  photo={photo}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Thumb = (props) => {
  const { selected, index, onClick, selectedIndex, photo } = props;

  return (
    <div
      className={`embla-thumbs__slide ${
        selected ? "embla-thumbs__slide--selected" : ""
      } x950l:-mr-4 -mr-3`}
    >
      <Fade>
        <Image
          isZoomed
          radius="sm"
          // radius="none"
          onClick={onClick}
          className={`object-cover ${
            selectedIndex !== index && "!opacity-40"
          } x950l:w-[65px] w-[53px] x950l:h-[65px] h-[53px]`}
          alt="NextUI Fruit Image with Zoom"
          // src={`https://res.cloudinary.com/${CLOUDINARY_ENVIRONMENTS}/image/upload/t_test_2/${CLOUDINARY_URL_ID}/${modelData.images[index].publicId}.webp`}
          src={`${photo[index].url}`}
        />
      </Fade>
    </div>
  );
};
