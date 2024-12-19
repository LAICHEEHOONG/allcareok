import { Input, Divider, Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";

export default function TitleRightCard() {
  const ad = useSelector((state) => state.editor?.ad);
  const [title_, setTitle_] = useState(ad?.title);

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setTitle_(inputValue);
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
        {/* 20 characters available */}

        {title_.length <= 50 && `${50 - title_.length} characters available`}
        {title_.length > 50 && (
          <div className="flex gap-1 items-center text-red-600">
            <IoIosAlert />
            <div> {`${title_.length - 50} character over limit`} </div>
          </div>
        )}
      </div>
      <div className="text-5xl font-semibold p-4 max-w-2xl text-center ">
        {title_}
      </div>

      {/* <Divider className="mt-20" /> */}
      <div className=" w-full flex p-10 justify-center items-center">
        <Button
          radius="full"
          size="lg"
          color="primary"
          isDisabled={title_.length <= 50 ? false : true}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
