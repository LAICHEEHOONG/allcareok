'use client'
import { Fade } from "react-awesome-reveal";

export default function Views_({ views, views_text }) {
  return (
    <Fade triggerOnce className="text-base font-medium tracking-wider  flex md:justify-start justify-end">
      {`${views} ${views_text}`}
    </Fade>
  );
}
