import { Button, Divider } from "@nextui-org/react";

export default function Overview() {
  return (
    <>
      <div className="hidden sm:flex flex-col w-full">
        <div className="flex justify-end mr-14">
          <Button radius="full" color="default" variant="bordered">
            Exit
          </Button>
        </div>
        <div className="flex h-[75vh]">
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

        <div className="absolute bottom-0 w-full ">
          <Divider className="h-1" />
          <div className="flex justify-end m-4 mr-14">
            <Button color="danger" radius="full" size="lg">
              Get started
            </Button>
          </div>
        </div>
      </div>

      <div className="sm:hidden w-full h-[100vh]">
        <div className="flex flex-col items-start  ml-8 mr-8">
          <div className="flex w-full justify-start mb-6">
            <Button radius="full" color="default" variant="bordered" size="sm">
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
          <div className="mt-6">
            <div className="flex gap-3 text-xl font-medium">
              <div>3</div>
              <div>Finish up and publish</div>
            </div>
            <div className="text-gray-500 ml-6 mt-2 mb-7 text-sm">
              Verify a few details, then share your service listing with the
              world.
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-10 w-full"> */}
          <div className="flex flex-col justify-center items-center  mt-5">
            <Divider className="h-1" />
            <div className="w-full p-6">
              <Button color="danger" radius="full" size="lg" fullWidth={true}>
                Get started
              </Button>
            </div>
          </div>
        {/* </div> */}

        {/* <div className="absolute w-full ">
          <Divider className="h-1" />
          <div className="flex justify-evenly gap-5 m-2">
            <Button color="danger" radius="full" size="sm">
              Get started
            </Button>
            <Button color="danger" radius="full" size="sm">
              Get started
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
}

// sm:hidden
