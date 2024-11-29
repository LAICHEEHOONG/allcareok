import { Button, Divider, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Overview() {
  const router = useRouter();
  const overview = useSelector((state) => state.auth.lang.overview);
  return (
    <>
      <div className="hidden sm:flex flex-col w-full h-[766px] justify-center">
        {/* <div className="flex justify-between m-8">
          <Image
            className="min-w-[37px]"
            width={37}
            radius="none"
            alt="Allcareok logo"
            src="/images/allcareok_logo.png"
          />
          <Button
            radius="full"
            color="default"
            variant="bordered"
            onPress={() => router.push("/")}
          >
    
            {overview.exit}
          </Button>
        </div> */}
        <div className="fixed top-0 w-full bg-white">
          <div className="flex justify-between m-8">
            <Image
              className="min-w-[37px]"
              width={37}
              radius="none"
              alt="Allcareok logo"
              src="/images/allcareok_logo.png"
            />
            <Button
              radius="full"
              color="default"
              variant="bordered"
              onPress={() => router.push("/")}
            >
              {overview.exit}
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-1/2 flex items-center justify-center">
            <p className="text-5xl font-medium max-w-xl m-10 leading-tight">
              {/* It’s easy to get started on Allcareok */}
              {overview?.main}
            </p>
          </div>

          <div className="w-1/2 flex flex-col items-start justify-center">
            <div className="max-w-lg m-7 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>1</div>
                <div>{overview.title_1}</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2 mb-7 text-lg">
                {overview.content_1}
              </div>
              <Divider />
            </div>

            <div className="max-w-lg m-7 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>2</div>
                <div>{overview.title_2}</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2 mb-7">
                {/* Upload at least one photo, along with a title and
                description—we’ll assist you with the rest. */}
                {overview.content_2}
              </div>
              <Divider />
            </div>

            <div className="max-w-lg m-7 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>3</div>
                <div>{overview.title_3}</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2 mb-7">
                {overview.content_3}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full bg-white">
          <Divider className="h-1" />
          <div className="flex justify-end m-4 mr-14">
            <Button
              color="danger"
              radius="full"
              size="lg"
              onPress={() => {
                router.push("/editor");
              }}
            >
              {overview.get_started}
              {/* Get started */}
            </Button>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="sm:hidden w-full h-full relative">
        <div className="flex flex-col items-start m-8">
          <div className="flex w-full justify-start mb-4">
            <Button
              radius="full"
              color="default"
              variant="bordered"
              size="sm"
              onPress={() => router.push("/")}
            >
              {overview.exit}
            </Button>
          </div>
          <p className="text-3xl font-medium leading-tight">{overview?.main}</p>
          <div className="mt-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>1</div>
              <div>{overview.title_1}</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 mb-7 text-sm">
              {overview.content_1}
            </div>
            <Divider />
          </div>
          <div className="mt-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>2</div>
              <div>{overview.title_2}</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 mb-7 text-sm">
              {overview.content_2}
            </div>
            <Divider />
          </div>
          <div className="mt-6 mb-24">
            <div className="flex gap-3 text-xl font-medium">
              <div>3</div>
              <div>{overview.title_3}</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 text-sm">
              {overview.content_3}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full bg-white">
          <Divider className="h-1" />
          <div className="w-full p-5">
            <Button
              color="danger"
              radius="full"
              size="lg"
              fullWidth={true}
              onPress={() => {
                router.push("/editor");
              }}
            >
              {overview.get_started}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
