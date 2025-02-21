'use client'
import { Button } from "@heroui/react";
import { Fade } from "react-awesome-reveal";
import FlagIcon from "@mui/icons-material/Flag";

export default function Report() {
  return (
    <Fade>
      <Button
     
        startContent={<FlagIcon />}
        variant="light"
        radius="full"
        className="text-gray-500 tracking-widest capitalize"
        size="lg"
      >
        {"Report this listing"}
      </Button>
    </Fade>
  );
}
