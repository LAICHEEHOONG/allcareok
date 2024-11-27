import { Button, Divider, Spacer } from "@nextui-org/react";

export default function Overview() {
  return (
    // <div className="flex flex-col w-full">
    //   <div className=" flex flex-col items-center justify-center px-4 min-h-screen -m-20 ">
    //     <div className="p-8">
    //       <h1 className="text-5xl max-w-lg font-semibold text-gray-800 mb-8 flex justify-center items-center">
    //         {"It's easy to get started on Allcareok"}
    //       </h1>

    //       <div className="space-y-8 max-w-xl">
    //         {/* Step 1 */}
    //         <div className="flex items-start">
    //           <div className="text-lg font-bold text-gray-800 mr-4">1</div>
    //           <div>
    //             <h2 className="text-xl font-semibold text-gray-800">
    //               Tell us about your services
    //             </h2>
    //             <p className="text-gray-600">
    //               Provide basic information, such as the types of services
    //               offered and the service areas covered.
    //             </p>
    //           </div>
    //         </div>

    //         {/* Step 2 */}
    //         <div className="flex items-start">
    //           <div className="text-lg font-bold text-gray-800 mr-4">2</div>
    //           <div>
    //             <h2 className="text-xl font-semibold text-gray-800">
    //               Make it stand out
    //             </h2>
    //             <p className="text-gray-600">
    //               Upload at least one photo, along with a title and
    //               description—we’ll assist you with the rest.
    //             </p>
    //           </div>
    //         </div>

    //         {/* Step 3 */}
    //         <div className="flex items-start">
    //           <div className="text-lg font-bold text-gray-800 mr-4">3</div>
    //           <div>
    //             <h2 className="text-xl font-semibold text-gray-800">
    //               Finish up and publish
    //             </h2>
    //             <p className="text-gray-600">
    //               Verify a few details, then share your service listing with the
    //               world.
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex flex-col items-end gap-4">
    //     <Divider className="h-1" />
    //     <Button className="mr-10" color="danger" radius="full">
    //       Get Started
    //     </Button>
    //   </div>
    // </div>
    <div className="flex flex-col w-full">
      {/* exit */}
      <div className="flex justify-end mr-14">
        <Button radius="full" color="default" variant="bordered">Exit</Button>
      </div>
      {/* content */}
      <div className="flex h-[75vh] ">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center ">
        <p className="text-6xl font-medium max-w-xl m-10 leading-tight">It’s easy to get started on Allcareok</p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center ">
        <p>This is the right side</p>
      </div>
    </div>
      {/* bottom */}
      <div className="absolute bottom-0 w-full">
        <Divider className="h-1" />
        <div className="flex justify-end m-4 mr-14" >
          <Button color="danger" radius="full" size="lg">Get started</Button>
        </div>
      </div>

    </div>

  );
}
