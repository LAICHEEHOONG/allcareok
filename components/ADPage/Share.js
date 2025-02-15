import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@heroui/react";

export default function ShareAD() {
  return (
    <div className="flex">
      <Button startContent={<IosShareIcon />} variant="light" radius="full">
        Share
      </Button>
      <Button startContent={<FavoriteBorderIcon />} variant="light" radius="full">
        Wishlist
      </Button>
    </div>
  );
}
