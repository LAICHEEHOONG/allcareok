import { useState, useEffect } from "react";
import { Button, ScrollShadow, Textarea } from "@heroui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import ErrorIcon from "@mui/icons-material/Error";

import SaveIcon from '@mui/icons-material/Save';

import { createAD, findUserAds } from "@/lib/action/adAction";

export default function DescriptionRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const description = useSelector((state) => state.editor.ad?.description);
  const [loading, setLoading] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, newDescription_) => {
    try {
      setLoading(true);
      const updateDescription = await createAD({
        ...ad,
        adsId,
        description: newDescription_,
      });
      dispatch(setAd(updateDescription));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // if (isSmallScreen) {
      //   dispatch(setPopUp());
      // }
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    const newDescription_ = newDescription;

    toDB(adsId, newDescription_);
    fetchAds();
  };

  const textLimit = 1500;

  // Redirect to home page if ad is not found
  useEffect(() => {
    if (!ad?.user) {
      router.push(`/`);
    }
  }, []);

  return (
    <div className="h-screen w-full md:pl-2">
      <div className="flex justify-between items-start mb-2 max-w-[1600px]">
        <div className="flex justify-center items-center gap-3">
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
          <div className="text-xl md:text-3xl font-semibold">
            {l?.description}
          </div>
        </div>
        <Button
          className="hidden md:flex"
          radius="full"
          size="lg"
          color="primary"
          isLoading={loading}
          isDisabled={
            newDescription?.length <= textLimit && newDescription?.length > 0
              ? false
              : true
          }
          onPress={handleSave}
        >
          {`${l?.title_save}`}
        </Button>
        <Button
          className="flex md:hidden"
          radius="full"
          size="md"
          color="default"
          variant="flat"
          isDisabled={
            newDescription?.length <= textLimit && newDescription?.length > 0
              ? false
              : true
          }
          isLoading={loading}
          onPress={handleSave}
          isIconOnly
        >
          <SaveIcon />
        </Button>
      </div>
      <ScrollShadow className="h-[92vh]" hideScrollBar={true}>
        <div className="mb-12 mt-2 text-default-400 md:flex hidden">
          {l?.service_description_title}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-2xl flex flex-col justify-center items-center">
            <div className="text-default-400 text-xs mt-5 mb-1 pl-4 select-none self-start">
              {newDescription?.length <= textLimit &&
                `${textLimit - newDescription?.length} ${
                  l?.character_available
                }`}
              {newDescription?.length > textLimit && (
                <div className="flex gap-1 items-center text-red-600">
                  <ErrorIcon sx={{ fontSize: "1rem" }} />
                  <div>
                    {" "}
                    {`${newDescription?.length - textLimit} ${l?.over_limit}`}
                  </div>
                </div>
              )}
            </div>
            <Textarea
              // className="max-w-2xl h-[50vh]"
              classNames={{
                base: "max-w-2xl",
                input: "resize-y min-h-[64vh]",
              }}
              // label="Description"
              placeholder={l?.description_placeholder}
              variant="bordered"
              defaultValue={description}
              onValueChange={(v) => setNewDescription(v)}
            />
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}
