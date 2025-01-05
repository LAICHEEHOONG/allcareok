import { Button, Divider, Image } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Overview() {
  const router = useRouter();
  const overview = useSelector((state) => state?.auth?.lang?.overview);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const session = useSelector((state) => state.auth.session);

  useEffect(() => {
    if (!session) {
      router.push(`/`);
    }
  }, []);

  return (
    <>
      <div className="hidden sm:flex flex-col w-full h-screen justify-center  ">
        <div className="fixed top-0 w-full bg-white ">
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
              onPress={() => router.push(`/${currentLocale}`)}
            >
              {overview?.exit}
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-center ">
          <div className="w-1/2 flex items-center justify-center">
            <p className="text-5xl font-medium max-w-2xl m-10 leading-tight">
              {overview?.main}
            </p>
          </div>

          <div className="w-1/2 flex flex-col items-start justify-center">
            <div className="max-w-lg m-7 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>1</div>
                <div          style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 1,
                }}>{overview?.title_1}</div>
              </div>
              <div
                className="text-gray-500 ml-6 mt-2 mb-7 text-lg"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                }}
              >
                {overview?.content_1}
              </div>
              {/* <div className="text-gray-500 ml-6 mt-2 mb-7 text-lg">
                {overview?.content_1}
              </div> */}
              <Divider />
            </div>

            <div className="max-w-lg m-7 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>2</div>
                <div>{overview?.title_2}</div>
              </div>
              <div
                className="text-gray-500 ml-6 mt-2 mb-7"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                }}
              >
                {overview?.content_2}
              </div>
              <Divider />
            </div>

            <div className="max-w-lg m-7 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>3</div>
                <div>{overview?.title_3}</div>
              </div>
              <div
                className="text-gray-500 ml-6 mt-2 mb-7"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                }}
              >
                {overview?.content_3}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full bg-white ">
          <Divider className="h-1" />
          <div className="flex justify-end m-4 mr-14">
            <Button
              color="danger"
              radius="full"
              size="lg"
              onPress={() => {
                router.push(`/${currentLocale}/editor`);
              }}
            >
              {overview?.get_started}
            </Button>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="sm:hidden w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-start m-8">
          <div className="flex w-full justify-start mb-4">
            <Button
              radius="full"
              color="default"
              variant="bordered"
              size="sm"
              onPress={() => router.push(`/${currentLocale}`)}
            >
              {overview?.exit}
            </Button>
          </div>
          <p className="text-3xl font-medium leading-tight">{overview?.main}</p>
          <div className="mt-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>1</div>
              <div>{overview?.title_1}</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 mb-7 text-sm">
              {overview?.content_1}
            </div>
            <Divider />
          </div>
          <div className="mt-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>2</div>
              <div>{overview?.title_2}</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 mb-7 text-sm">
              {overview?.content_2}
            </div>
            <Divider />
          </div>
          <div className="mt-6 mb-24">
            <div className="flex gap-3 text-xl font-medium">
              <div>3</div>
              <div>{overview?.title_3}</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 text-sm">
              {overview?.content_3}
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
                router.push(`/${currentLocale}/editor`);
              }}
            >
              {overview?.get_started}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
