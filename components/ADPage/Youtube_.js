"use client";
import { Fade } from "react-awesome-reveal";
import { useState, useEffect } from "react";

export default function Youtube_({ youtube }) {
  const [youtubeId, setYoutubeId] = useState("");
  useEffect(() => {
    setYoutubeId(extractVideoId(youtube));
  }, [youtube]);
  return (
    <Fade className="flex flex-col  space-y-4 py-4">
      <div className="w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-lg w-full aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${
              youtubeId ? youtubeId : ""
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

const extractVideoId = (url) => {
  if (typeof url !== "string" || !url.trim()) {
    return ""; // Return an empty string if the URL is invalid
  }

  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
};
