"use client";
import { Fade } from "react-awesome-reveal";
import { Divider } from "@heroui/react";

export default function Youtube_({ youtube }) {
  return (
    <Fade className="flex flex-col  space-y-4 py-4">
      <div className="w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-lg w-full aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${
              youtube ? youtube : "MXTbTpzs7tU"
            }`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* <Divider /> */}
    </Fade>
  );
}
