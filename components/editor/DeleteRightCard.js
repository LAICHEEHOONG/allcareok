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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
// import { Card, CardContent } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";
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
      <div className="flex flex-col justify-center items-center gap-5 -mt-6 md:-mt-16 h-[84vh]">
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
              {/* <div className="font-bold text-base md:text-lg pr-2">
                  {ad?.title}
                </div> */}
              {/* <div>
                  <Button
                    className="hidden md:flex"
                    radius="full"
                    color="danger"
                    variant="flat"
                    aria-label="Back button"
                    startContent={<DeleteForeverIcon />}
                    onPress={onOpen}
                  >
                    {l?.delete_btn ? l.delete_btn : "Delete service"}
                  </Button>
                  <Button
                    className="flex md:hidden"
                    radius="full"
                    color="danger"
                    variant="flat"
                    aria-label="Back button"
                    onPress={onOpen}
                    isIconOnly
                  >
                    <DeleteForeverIcon />
                  </Button>
                </div> */}
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
                              : "/images/handyman_2.webp"
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
                      <Button color="primary" variant="light" onPress={onClose}>
                        {l?.cancel ? l.cancel : "Cancel"}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        </div>
        <div
          className={` w-[333px] h-[400px]
                     x550l:w-[280px] x550l:h-[340px]
                     sm:w-[300px] sm:h-[360px]
                     md:w-[400px] md:h-[450px]
                     x950l:w-[300px] x950l:h-[360px] 
                     x1470l:w-[333px] x1470l:h-[400px]
                     x1640l:w-[300px] x1640l:h-[360px]   
                     x1980l:w-[333px] x1980l:h-[400px]`}
        >
          <AD ad={ad} />
        </div>
      </div>
      {/* <ScrollShadow className="h-[92vh]" hideScrollBar={true}>
        <div className="text-default-400 mt-6 mb-6 ">
          {l?.delete_right_content
            ? l.delete_right_content
            : `The service, along with its image and all associated information, will
        be permanently deleted. This action is irreversible and cannot be
        undone.`}
        </div>

        <div className="border-1 w-full ">
          <>
            <div className=" flex justify-between items-center max-w-[400px] mx-auto">
              <div className="font-bold text-base md:text-lg pr-2">
                {ad?.title}
              </div>
              <div>
                <Button
                  className="hidden md:flex"
                  radius="full"
                  color="danger"
                  variant="flat"
                  aria-label="Back button"
                  startContent={<DeleteForeverIcon />}
                  onPress={onOpen}
                >
                  {l?.delete_btn ? l.delete_btn : "Delete service"}
                </Button>
                <Button
                  className="flex md:hidden"
                  radius="full"
                  color="danger"
                  variant="flat"
                  aria-label="Back button"
                  onPress={onOpen}
                  isIconOnly
                >
                  <DeleteForeverIcon />
                </Button>
              </div>
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
                              : "/images/handyman_2.webp"
                          }
                          width={200}
                        />
                        <div className="text-xl font-semibold flex m-5">
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
                      <Button color="primary" variant="light" onPress={onClose}>
                        {l?.cancel ? l.cancel : "Cancel"}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        </div>

        <div className="py-4 m-2 flex flex-col justify-center items-center">
          {ad?.photo?.length > 0 ? (
            <CarouselPhoto ad={ad} />
          ) : (
            <Image
              alt="Card service demo"
              className="object-cover rounded-xl  lg:w-[600px] lg:h-[600px] md:w-[400px] md:h-[400px]  xs:w-[400px] xs:h-[350px]"
              src={"/images/handyman_2.webp"}
              width={600}
            />
          )}
        </div>
      </ScrollShadow> */}
      {/* <ScrollShadow
        className="h-screen   flex flex-col  items-center"
        hideScrollBar={true}
      >
        <div className="flex flex-col justify-center items-center gap-5  py-">
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
                                : "/images/handyman_2.webp"
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
          <div
            className="
                      w-[333px] h-[400px]
                     x550l:w-[280px] x550l:h-[340px]
                     sm:w-[300px] sm:h-[360px]
                     md:w-[400px] md:h-[450px]
                     x950l:w-[300px] x950l:h-[360px] 
               
                
                     x1470l:w-[333px] x1470l:h-[400px]
                     x1640l:w-[300px] x1640l:h-[360px]   
                     x1980l:w-[333px] x1980l:h-[400px]"
          >
            <AD ad={ad} />
          </div>
        </div>
      </ScrollShadow> */}
    </div>
  );
}

// function CarouselPhoto({ ad }) {
//   const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

//   return (
//     <Carousel
//       className="w-full  "
//       // plugins={[plugin.current]}
//       // onMouseEnter={plugin.current.stop}
//       // onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent className="">
//         {ad.photo.map((item, i) => (
//           <CarouselItem
//             key={item.url + i}
//             className="flex justify-center items-center"
//           >
//             {/* <Image
//               alt="Card service demo"
//               className="object-cover rounded-xl lg:w-[600px] lg:h-[500px] md:w-[400px] md:h-[400px]  xs:w-[400px] xs:h-[350px]"
//               src={item.url}
//               width={600}
//             /> */}
//             <Image
//               alt={"ads delete"}
//               className={`object-cover rounded-xl 
//                      w-[333px] h-[400px]
//                      x550l:w-[280px] x550l:h-[340px]
//                      sm:w-[300px] sm:h-[360px]
//                      md:w-[400px] md:h-[450px]
//                      x950l:w-[300px] x950l:h-[360px] 
//                      x1128l:w-[240px] x1128l:h-[300px]  
//                      xl:w-[280px] xl:h-[340px]  
//                      x1470l:w-[333px] x1470l:h-[400px]
//                      x1640l:w-[300px] x1640l:h-[360px]   
//                      x1980l:w-[333px] x1980l:h-[400px]
//                       `}
//               radius="lg"
//               src={item.url}
//             />
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
