import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ScrollShadow,
} from "@nextui-org/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { deleteAd, findUserAds } from "@/lib/action/adAction";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { setAds } from "@/redux/features/editor/editorSlice";
import { deleteImages } from "@/util/deleteImage";

export default function DeleteRightCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const ad = useSelector((state) => state.editor.ad);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userId = useSelector((state) => state.auth._id);
  const role = useSelector((state) => state.auth.role);
  const adId = useSelector((state) => state.editor.adsId);
  const [toggleDelete, setToggleDelete] = useState(false);

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: userId }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const deleteAd_ = async () => {
    try {
      const res = await deleteAd({ userId, role, adId });
      await fetchAds();
      setToggleDelete(true);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const deleteAllPhoto = async () => {
      try {
        const publicIds = ad.photo.map((item) => item.publicId);
        if (publicIds && publicIds.length > 0) {
          await deleteImages(publicIds); // Assuming deleteImages handles arrays of publicIds
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (toggleDelete) {
      deleteAllPhoto(); // Call the async function
      setToggleDelete(false);
    }
  }, [toggleDelete]); // Add ad.photo to dependencies if it's dynamic

  return (
    <div className="h-screen m-3 w-full">
      <div className="text-3xl font-semibold">Delete Service</div>
      <div className="text-default-400 mt-6 mb-6 max-w-[520px]">
        The service, along with its image and all associated information, will
        be permanently deleted. This action is irreversible and cannot be
        undone.
      </div>

      <div className="flex justify-end items-center">
        <>
          <Button
            radius="full"
            color="danger"
            variant="flat"
            aria-label="Back button"
            startContent={<DeleteForeverIcon />}
            onPress={onOpen}
          >
            Delete service
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  {/* <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader> */}
                  <ModalBody>
                    <div className="flex flex-col justify-center items-center gap-5 mt-10">
                      <Image
                        alt="Card service demo"
                        className="object-cover rounded-xl"
                        src={
                          ad.photo?.length > 0
                            ? ad.photo[0].url
                            : "/images/handyman_2.webp"
                        }
                        width={200}
                      />
                      <div className="text-xl font-semibold flex m-5">
                        Permanently delete this service?
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter className="flex flex-col">
                    <Button
                      color="danger"
                      onPress={async () => {
                        await deleteAd_();
                        onClose();
                        router.push(`/${currentLocale}/dashboard`);
                      }}
                    >
                      Delete
                    </Button>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
      <div className="py-4 m-2 flex flex-col justify-center items-center">
        <h4 className="font-bold text-large m-1">
          Card service title Card service title
        </h4>
        <ScrollShadow className="h-[66vh]" hideScrollBar={true}>
          <Image
            alt="Card service demo"
            className="object-cover rounded-xl"
            src={
              ad.photo?.length > 0 ? ad.photo[0].url : "/images/handyman_2.webp"
            }
            width={600}
          />
        </ScrollShadow>
      </div>
    </div>
  );
}
