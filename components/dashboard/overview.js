import { Button, Divider, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Overview() {
  const router = useRouter();
  return (
    <>
      {/* <div className="hidden sm:flex flex-col w-full h-full">
        <div className="flex justify-between m-8">
          <Image
            className="min-w-[37px] "
            width={37}
            radius="none"
            alt="Allcareok logo"
            src="/images/allcareok_logo.png"
          />
          <Button
            radius="full"
            color="default"
            variant="bordered"
            onPress={() => rounter.push("/")}
          >
            Exit
          </Button>
        </div>
        <div className="flex ">
          <div className="w-1/2 flex items-center justify-center ">
            <p className="text-5xl font-medium max-w-xl m-10 leading-tight">
              It’s easy to get started on Allcareok
            </p>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center ">
            <div className="max-w-lg m-10 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>1</div>
                <div>Tell us about your services</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2 mb-7 text-lg">
                Provide basic information, such as the types of services offered
                and the service areas covered.
              </div>
              <Divider />
            </div>

            <div className="max-w-lg m-10 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>2</div>
                <div>Make it stand out</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2 mb-7">
                Upload at least one photo, along with a title and
                description—we’ll assist you with the rest.
              </div>
              <Divider />
            </div>

            <div className="max-w-lg m-10 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>3</div>
                <div>Finish up and publish</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2">
                Verify a few details, then share your service listing with the
                world.
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full bg-white">
          <Divider className="h-1" />
          <div className="flex justify-end m-4 mr-14">
            <Button color="danger" radius="full" size="lg">
              Get started
            </Button>
          </div>
        </div>
      </div> */}

      <div className="hidden sm:flex flex-col w-full h-full relative">
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
            Exit
          </Button>
        </div>

        <div className="flex">
          <div className="w-1/2 flex items-center justify-center">
            <p className="text-5xl font-medium max-w-xl m-10 leading-tight">
              It’s easy to get started on Allcareok
            </p>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center mb-14">
            <div className="max-w-lg m-10 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>1</div>
                <div>Tell us about your services</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2 mb-7 text-lg">
                Provide basic information, such as the types of services offered
                and the service areas covered.
              </div>
              <Divider />
            </div>

            <div className="max-w-lg m-10 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>2</div>
                <div>Make it stand out</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2 mb-7">
                Upload at least one photo, along with a title and
                description—we’ll assist you with the rest.
              </div>
              <Divider />
            </div>

            <div className="max-w-lg m-10 mr-12">
              <div className="flex gap-3 text-2xl font-medium">
                <div>3</div>
                <div>Finish up and publish</div>
              </div>
              <div className="text-gray-500 ml-6 mt-2">
                Verify a few details, then share your service listing with the
                world.
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full bg-white">
          <Divider className="h-1" />
          <div className="flex justify-end m-4 mr-14">
            <Button color="danger" radius="full" size="lg">
              Get started
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="sm:hidden w-full h-full relative">
        <div className="flex flex-col items-start m-8">
          <div className="flex w-full justify-start mb-4">
            <Button radius="full" color="default" variant="bordered" size="sm" onPress={() => router.push('/')}>
              Exit
            </Button>
          </div>
          <p className="text-3xl font-medium leading-tight">
            It’s easy to get started on Allcareok
          </p>
          <div className="mt-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>1</div>
              <div>Tell us about your services</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 mb-7 text-sm">
              Provide basic information, such as the types of services offered
              and the service areas covered.
            </div>
            <Divider />
          </div>
          <div className="mt-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>2</div>
              <div>Make it stand out</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 mb-7 text-sm">
              Upload at least one photo, along with a title and
              description—we’ll assist you with the rest.
            </div>
            <Divider />
          </div>
          <div className="mt-6 mb-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>3</div>
              <div>Finish up and publish</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 text-sm">
              Verify a few details, then share your service listing with the
              world.
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full bg-white">
          <Divider className="h-1" />
          <div className="w-full p-6">
            <Button color="danger" radius="full" size="lg" fullWidth={true}>
              Get started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
