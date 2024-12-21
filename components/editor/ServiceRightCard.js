import { Button } from "@nextui-org/react";
import FilterIcon from "@mui/icons-material/Filter";

export default function ServiceRightCard() {
  return (
    <div className="h-screen w-full md:pl-2">
      <div className="flex justify-between items-start mb-2 max-w-[1600px]">
        <div className="flex justify-center items-center gap-3">
          <div className="text-3xl font-semibold">{"Types of Services"}</div>
        </div>

        <>
          <Button
            className="md:flex hidden"
            radius="full"
            size="lg"
            color="primary"
          >
            {"Save"}
          </Button>
        </>
      </div>
    </div>
  );
}
