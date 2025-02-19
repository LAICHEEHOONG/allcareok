import {
  Avatar,
  Divider,
  Card,
  CardBody,
  Image,
  Button,
  Skeleton,
} from "@heroui/react";

export default function Verify({ views, views_dic, verify_dic }) {
  return (
    <Card
      className="w-full max-w-[350px] x950l:max-w-[500px]"
      //   isPressable={!blockServiceBtn}
      //   isDisabled={blockServiceBtn}
      //   onPress={changeRouter}
    >
      <CardBody>
        <div className="flex justify-between items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full min-w-[100px]"
            src="/images/verified_logo.jpg"
            width={100}
          />
          <div className="flex flex-col justify-center items-center x950l:p-5 p-3
          ">
            <div className="capitalize x950l:text-base text-sm  font-medium max-w-[330px] tracking-wider  ">
              {/* Ads verified by AllCareOK ensure trust and quality in every
              listing. */}
              {verify_dic}
            </div>
            <div className="block x950l:hidden text-xs font-medium tracking-wider self-end">
              {views} Views
            </div>
          </div>
          <Divider
            orientation="vertical"
            className="h-10 w-[1px] x950l:block hidden"
          />
          <div className="x950l:flex hidden flex-col w-full max-w-[100px] justify-center items-center">
            <div className="text-2xl font-semibold">{views}</div>
            <div className="text-xs">{views_dic}</div>
          </div>
          {/* <div className="flex flex-col justify-center tracking-wider">
            <p className="text-md leading-10">
              {ads.length === 0
                ? bottom_navigation.share
                : bottom_navigation.my_service}
            </p>
            <p className="text-small tracking-wide text-default-400">
              {bottom_navigation.shareContent}
            </p>
          </div> */}
        </div>
      </CardBody>
    </Card>
  );
}
