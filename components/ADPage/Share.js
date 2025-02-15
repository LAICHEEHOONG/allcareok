import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@heroui/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function ShareAD() {
  return (
    <div className="flex justify-between">
      {/* <div className="text-3xl font-medium tracking-wide">{post.data[0].title}</div> */}
      <Button
        // className="hidden sm:flex"
        startContent={<ArrowBackIosIcon />}
        variant="light"
        radius="full"
      >
        Home
      </Button>
      {/* <Button
        className="flex lg:hidden"
        isIconOnly
        variant="light"
        radius="full"
      >
        <ArrowBackIosIcon />
      </Button> */}
      <div className="flex sm:gap-2 gap-5 sm:pr-0 pr-2">
        <Button
          className="hidden sm:flex"
          startContent={<IosShareIcon />}
          variant="light"
          radius="full"
        >
          Share
        </Button>
        <Button
          className="flex sm:hidden"
          isIconOnly
          variant="light"
          radius="full"
        >
          <IosShareIcon />
        </Button>
        <Button
          className="hidden sm:flex"
          startContent={<FavoriteBorderIcon />}
          variant="light"
          radius="full"
        >
          Wishlist
        </Button>
        <Button
          className="flex sm:hidden"
          isIconOnly
          variant="light"
          radius="full"
        >
          <FavoriteBorderIcon />
        </Button>
      </div>
    </div>
  );
}
