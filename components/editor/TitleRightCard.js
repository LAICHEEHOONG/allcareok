import { Input, Button, ScrollShadow } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { setAd, setAds } from "@/redux/features/editor/editorSlice";
import { createAD, findUserAds } from "@/lib/action/adAction";

export default function TitleRightCard() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.editor?.ad);
  const [title_, setTitle_] = useState(ad?.title);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setTitle_(inputValue);
  };

  const fetchAds = async () => {
    try {
      const ads = await findUserAds({ user: ad.user }); // Pass only the userId
      dispatch(setAds(ads));
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const toDB = async (adsId, newTitle) => {
    try {
      setLoading(true);
      const updateTitle = await createAD({ ...ad, adsId, title: newTitle });
      dispatch(setAd(updateTitle));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const adsId = ad._id;
    toDB(adsId, title_);
    fetchAds();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <Input
        isRequired
        labelPlacement="outside"
        className="max-w-xs"
        defaultValue={title_}
        label="Title"
        type="text"
        radius="full"
        fullWidth
        onChange={handleChange}
      />
      <div className="text-default-400 text-xs mt-5 mb-5">
        {title_.length <= 50 && `${50 - title_.length} characters available`}
        {title_.length > 50 && (
          <div className="flex gap-1 items-center text-red-600">
            <ErrorIcon sx={{ fontSize: "1rem" }} />
            <div> {`${title_.length - 50} character over limit`} </div>
          </div>
        )}
      </div>
      <div className="hidden md:flex text-5xl font-semibold p-4 max-w-2xl text-center text-ellipsis overflow-hidden">
        {title_}
      </div>

      <ScrollShadow className="h-[25vh] md:hidden max-w-80"  hideScrollBar={true}>
        <div className="  text-4xl font-semibold p-4  text-center text-ellipsis overflow-hidden">
          {title_}
        </div>
      </ScrollShadow>

      <div className=" w-full flex p-10 justify-center items-center">
        <Button
          radius="full"
          size="lg"
          color="primary"
          isDisabled={title_.length <= 50 && title_.length > 0 ? false : true}
          isLoading={loading}
          onPress={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
