import { useState, useEffect, useRef } from "react";
import { Button, ScrollShadow, Input } from "@heroui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import Masonry from "react-masonry-css";
import { createAD, findUserAds } from "@/lib/action/adAction";
import SaveIcon from "@mui/icons-material/Save";
import { contactServices } from "@/components/contactServices";

export default function ContactRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";
  const contact = useSelector((state) => state.editor.ad?.contact);
  const [loading, setLoading] = useState(false);

  const contactRef = useRef({ ...contact });

  const handleInputChange = (key, value) => {
    contactRef.current[key] = value;
  };

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user });
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, newContact) => {
    try {
      setLoading(true);
      const updateContact = await createAD({
        ...ad,
        adsId,
        contact: newContact,
      });
      dispatch(setAd(updateContact));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    const newContact = contactRef.current;
    toDB(adsId, newContact);
    fetchAds();
  };

  const M = () => {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid !w-full"
        columnClassName="my-masonry-grid_column flex flex-col items-center justify-center"
      >
        {contactServices.map((item) => (
          <Input
            key={item.name}
            isClearable
            className="w-full p-5"
            placeholder={item.label}
            variant="bordered"
            size="lg"
            radius="full"
            defaultValue={contactRef.current[item.name]}
            onValueChange={(v) => handleInputChange(item.name, v)}
            onClear={() => handleInputChange(item.name, "")}
            startContent={<item.icon className="text-xl text-default-400" />}
          />
        ))}
      </Masonry>
    );
  };

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
          <div className="text-xl md:text-3xl font-semibold">{l?.contact}</div>
        </div>
        <Button
          className="hidden md:flex"
          radius="full"
          size="lg"
          color="primary"
          isLoading={loading}
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
          isLoading={loading}
          onPress={handleSave}
          isIconOnly
        >
          <SaveIcon />
        </Button>
      </div>
      <ScrollShadow className="h-[92vh]" hideScrollBar={true}>
        <div className="mb-12 mt-2 text-default-400 md:flex hidden">
          {l?.service_contact_title}
        </div>
        <div className="w-full flex flex-col justify-center items-center 2xl:py-32">
          <M />
        </div>
      </ScrollShadow>
    </div>
  );
}

const breakpointColumnsObj = {
  default: 4,
  1760: 3,
  1443: 2,
  1024: 1,
};