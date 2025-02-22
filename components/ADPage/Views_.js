'use client'
import { Fade } from "react-awesome-reveal";

export default function Views_({ views, views_text }) {
  return (
    <Fade className="text-base font-medium tracking-wider">
      {`${views} ${views_text}`}
    </Fade>
  );
}
