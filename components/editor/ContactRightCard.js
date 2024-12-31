import { Button } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

export default function ContactRightCard() {
  const l = useSelector((state) => state.auth?.lang?.listing_editor_card);
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || "en";

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
          <div className="text-3xl font-semibold">{l?.contact}</div>
        </div>
        <Button
          radius="full"
          size="lg"
          color="primary"
          // isDisabled={title_?.length <= 50 && title_?.length > 0 ? false : true}
          // isLoading={loading}
          // onPress={handleSave}
        >
          {`${l?.title_save}`}
        </Button>
      </div>
    </div>
  );
}
