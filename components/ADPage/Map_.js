"use client";
import { Card, CardBody, Divider } from "@heroui/react";

import { GoogleMapsEmbed } from "@next/third-parties/google";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Fade } from "react-awesome-reveal";

export default function Map_({ area }) {
  const MapCard = () => {
    return (
      <div className="flex flex-col justify-center items-center">
        {(area?.town || area?.city || area?.state || area?.country) && (
          <div className="flex justify-start items-center gap-1 w-full ">
            <LocationOnIcon className="w-5 h-5 mt-1" />
            <div className="text-xl capitalize font-medium w-full max-w-[370px] truncate mt-1 tracking-widest ">
              {`${area?.town || area?.city || area?.state || ""}${
                area?.town || area?.city || area?.state ? ", " : ""
              }${area?.country}`}
            </div>
          </div>
        )}
        <Card className="w-full max-w-[1120px] my-6">
          <CardBody className="p-0">
          {/* <GoogleMapsEmbed
                className="bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height="480"
                mode="place"
                q={`${area?.town},${area?.city},${area?.state},${area?.country}`}
              /> */}
            <div className="md:hidden">
              <GoogleMapsEmbed
                className="bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height="350"
                mode="place"
                q={`${area?.town},${area?.city},${area?.state},${area?.country}`}
              />
            </div>
            <div className="md:block hidden">
              <GoogleMapsEmbed
                className="bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height="480"
                mode="place"
                q={`${area?.town},${area?.city},${area?.state},${area?.country}`}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  };
  return (
    <Fade triggerOnce className="flex flex-col">
      <Divider className="mb-12 my-4" />
      <MapCard />
    </Fade>
  );
}
