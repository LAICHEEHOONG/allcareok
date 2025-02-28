import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ScrollShadow,
} from "@heroui/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { deleteAd, findUserAds } from "@/lib/action/adAction";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { setAds } from "@/redux/features/editor/editorSlice";
import { deleteImages } from "@/util/deleteImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AD from "../Home/AD";

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
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await deleteAd({ userId, role, adId });
      await fetchAds();
      setToggleDelete(true);
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const deleteAllPhoto = async () => {
      try {
        const publicIds = ad.photo.map((item) => item.publicId);
        if (publicIds && publicIds?.length > 0) {
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
    <div className="h-screen p-2 w-full">
      <div className="flex justify-start items-center gap-3">
        <Button
          className="md:hidden flex"
          isIconOnly
          radius="full"
          color="default"
          variant="flat"
          aria-label="Back button"
          onPress={() => {
            router.push(`/${currentLocale}/editor`);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <div className="flex flex-col">
          <div className="text-3xl font-semibold">{l?.delete_btn}</div>
          <div className="text-default-400 mt-6 mb-6 md:flex hidden ">
            {l?.delete_right_content}
          </div>
        </div>
      </div>
      <div className=" h-[91vh] flex justify-center items-center">
        {/* <ScrollShadow
          hideScrollBar
          className="w-[400px] py-5 h-[480px] flex flex-col gap-2 items-center "
        >
          <div className=" ">
            <>
              <div className=" flex justify-between items-center max-w-[400px] mx-auto">
                <Button
                  radius="full"
                  color="danger"
                  variant="flat"
                  aria-label="Back button"
                  startContent={<DeleteForeverIcon />}
                  onPress={onOpen}
                >
                  {l?.delete_btn}
                </Button>
              </div>

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop={"blur"}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <div className="flex flex-col justify-center items-center gap-5 mt-10">
                          <Image
                            alt="Card service demo"
                            className="object-cover rounded-xl"
                            src={
                              ad?.photo?.length > 0
                                ? ad.photo[0].url
                                : "/images/plumber.png"
                            }
                            width={200}
                          />
                          <div className="text-xl font-semibold text-center m-5">
                            {l?.delete_modal_title
                              ? l.delete_modal_title
                              : "Permanently delete this service?"}
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
                          isLoading={loading}
                        >
                          {l?.delete_modal_btn ? l.delete_modal_btn : "Delete"}
                        </Button>
                        <Button
                          color="primary"
                          variant="light"
                          onPress={onClose}
                        >
                          {l?.cancel ? l.cancel : "Cancel"}
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </div>
          <div className="w-[320px]">
            <AD ad={ad} />
          </div>
        </ScrollShadow> */}
        <div
          // hideScrollBar
          // className="w-[400px] py-5 h-[480px] flex flex-col gap-2 items-center border-2"
          className="flex flex-col gap-2 items-center "
        >
          <div className=" ">
            <>
              {/* <div className=" flex justify-between items-center max-w-[400px] mx-auto">
                <Button
                  radius="full"
                  color="danger"
                  variant="flat"
                  aria-label="Back button"
                  startContent={<DeleteForeverIcon />}
                  onPress={onOpen}
                >
                  {l?.delete_btn}
                </Button>
              </div> */}

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop={"blur"}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <div className="flex flex-col justify-center items-center gap-5 mt-10">
                          <Image
                            alt="Card service demo"
                            className="object-cover rounded-xl"
                            src={
                              ad?.photo?.length > 0
                                ? ad.photo[0].url
                                : "/images/plumber.png"
                            }
                            width={200}
                          />
                          <div className="text-xl font-semibold text-center m-5">
                            {l?.delete_modal_title
                              ? l.delete_modal_title
                              : "Permanently delete this service?"}
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
                          isLoading={loading}
                        >
                          {l?.delete_modal_btn ? l.delete_modal_btn : "Delete"}
                        </Button>
                        <Button
                          color="primary"
                          variant="light"
                          onPress={onClose}
                        >
                          {l?.cancel ? l.cancel : "Cancel"}
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </div>
          <div className=" flex flex-col gap-4 items-center">
            <AD ad={ad} />
            <Button
                  radius="full"
                  color="danger"
                  variant="flat"
                  fullWidth
                  aria-label="Back button"
                  startContent={<DeleteForeverIcon />}
                  onPress={onOpen}
                >
                  {l?.delete_btn}
                </Button>
            {/* <div className=" flex justify-between items-center max-w-[400px] mx-auto">
      
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
