"use client";
import { Button } from "@heroui/react";
import { Fade } from "react-awesome-reveal";
import FlagIcon from "@mui/icons-material/Flag";

export default function Report({ report_btn }) {
  return (
    <Fade>
      <Button
        startContent={<FlagIcon />}
        variant="light"
        radius="full"
        className="text-gray-500 tracking-widest capitalize"
        size="lg"
      >
        {report_btn}
      </Button>
    </Fade>
  );
}
