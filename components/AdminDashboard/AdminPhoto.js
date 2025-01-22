import { fetchValidPhotos } from "@/lib/action/adAction";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Button,
} from "@heroui/react";
import Masonry from "react-masonry-css";

export default function AdminPhoto() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const res = async () => {
      const ans = await fetchValidPhotos();
      try {
        console.log(ans);
        setPhotos(ans.data);
      } catch (error) {
        console.log(error);
      }
    };
    res();
  }, []);

  const handleDownload = async (url) => {
    try {
      // Fetch the image as a Blob
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");
  
      const blob = await response.blob();
  
      // Create a Blob URL and trigger the download
      const link = document.createElement("a");
      const blobUrl = URL.createObjectURL(blob);
  
      link.href = blobUrl;
      link.download = url.split("/").pop() || "downloaded-image";
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error.message);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full p-5">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid "
          columnClassName="my-masonry-grid_column  place-items-center"
        >
          {photos.map((p) => (
            <Card
              className=" mb-2"
              key={p.photo._id}
              // isPressable
              shadow="sm"
              // onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={"ad image"}
                  className="object-cover h-[240px] w-[240px] cursor-pointer"
                  radius="lg"
                  shadow="sm"
                  src={p.photo.url}
                  width="100%"
                  onClick={() => handleDownload(p.photo.url)} // Trigger download on click
                />
              </CardBody>
              <CardFooter className="text-small flex flex-col gap-2 z-50">
                <Input
                  className="max-w-xs"
                  placeholder={"url"}
                  radius="full"
                  variant="bordered"
                  size="md"
                />
                <Button color="primary" radius="full" size="sm" fullWidth>
                  Exchange
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

const breakpointColumnsObj = {
  default: 7,
  2000: 6,
  1550: 5,
  1250: 4,
  1050: 3,
  850: 2,
  600: 1,
};
