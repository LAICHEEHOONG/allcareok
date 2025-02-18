import {
  Avatar,
  Divider,
  Card,
  CardBody,
  Image,
  Button,
  Skeleton,
} from "@heroui/react";

export default function Verify({ views }) {
  return (
    <Card
      className="w-full max-w-[600px]"
      //   isPressable={!blockServiceBtn}
      //   isDisabled={blockServiceBtn}
      //   onPress={changeRouter}
    >
      <CardBody>
        <div className="flex justify-between">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="/images/verified_logo.jpg"
            width={100}
          />
          <div className="flex justify-center items-center ">
            <div className="capitalize text-base font-medium max-w-[350px] p-5">
              Ads verified by AllCareOK ensure trust and quality in every
              listing.
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col w-full max-w-[100px] justify-center items-center">
            <div className="text-2xl font-semibold">{views}</div>
            <div className="text-xs">Views</div>
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
