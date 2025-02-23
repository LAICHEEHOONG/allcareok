'use client'
import { Fade } from "react-awesome-reveal";

export default function AreaTitle({areaTitle}) {
    return <Fade triggerOnce>
        {areaTitle}
    </Fade>
}