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
import { deleteImages } from "@/util/deleteImage";
import { updatePhotoByPhotoId } from "@/lib/action/adAction";

export default function AdminPhoto() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const res = async () => {
      const ans = await fetchValidPhotos();
      try {
        // console.log(ans);
        let arrPhotos = ans.data.map((item) => ({
          ...item.photo,
          loading: false,
          exchangeUrl: "",
        }));
        // console.log(arrPhotos);
        setPhotos(arrPhotos);
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

  const handleInputChange = (id, value) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo._id === id ? { ...photo, exchangeUrl: value } : photo
      )
    );
  };

  const handleExchange = async (publicId, photoId, newUrl) => {
    try {
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId ? { ...photo, loading: true } : photo
        )
      );
      await deleteImages(publicId);
      const updatePhotoByPhotoId_ = await updatePhotoByPhotoId({
        photoId,
        newUrl,
      });
      // console.log(updatePhotoByPhotoId_);

      if (updatePhotoByPhotoId_.success) {
        setPhotos((prevPhotos) =>
          prevPhotos.filter((photo) => photo._id !== photoId)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId ? { ...photo, loading: false } : photo
        )
      );
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
              key={p._id}
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
                  src={p.url}
                  width="100%"
                  onClick={() => handleDownload(p.url)} // Trigger download on click
                />
              </CardBody>
              <CardFooter className="text-small flex flex-col gap-2 z-50">
                <Input
                  className="max-w-xs"
                  placeholder={"url"}
                  radius="full"
                  variant="bordered"
                  size="md"
                  value={p.exchangeUrl}
                  onChange={(e) => handleInputChange(p._id, e.target.value)}
                />
                <Button
                  color="primary"
                  radius="full"
                  size="sm"
                  fullWidth
                  isLoading={p.loading}
                  onPress={() =>
                    handleExchange(p.publicId, p._id, p.exchangeUrl)
                  }
                  isDisabled={p.exchangeUrl ? false : true}
                >
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
