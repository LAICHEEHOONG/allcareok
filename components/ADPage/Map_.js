"use client";
import { Card, CardBody } from "@heroui/react";

import { GoogleMapsEmbed } from "@next/third-parties/google";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Fade } from "react-awesome-reveal";

export default function Map_({ area }) {
  const MapCard = () => {
    return (
      <div className="flex flex-col justify-center items-center m-4 ">
        {/* {(area?.town || area?.city || area?.state || area?.country) && (
          <div className="flex justify-center items-center gap-1">
            <LocationOnIcon className="w-4 h-4 mt-1" />
            <div className="text-base capitalize font-medium w-full max-w-[240px] truncate mt-1 tracking-widest ">
              {`${area?.town || area?.city || area?.state || ""}${
                area?.town || area?.city || area?.state ? ", " : ""
              }${area?.country}`}
            </div>
          </div>
        )} */}
        <Card className="w-full max-w-[900px]">
          <CardBody className="p-0">
            <div className="sm:hidden">
              <GoogleMapsEmbed
                className="bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height="350"
                mode="place"
                q={`${area?.town},${area?.city},${area?.state},${area?.country}`}
              />
            </div>
            <div className="sm:block hidden">
              <GoogleMapsEmbed
                className="bg-black"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                width="100%"
                height="310"
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
    <Fade className="w-ful">
      <MapCard />
    </Fade>
  );
}
