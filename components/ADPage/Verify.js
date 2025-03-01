"use client";
import { Divider, Card, CardBody, Image } from "@heroui/react";
import { Fade } from "react-awesome-reveal";

export default function Verify({ views, views_dic, verify_dic }) {
  return (
    <Fade triggerOnce>
      <Card className="w-full md:max-w-[394px] x950l:max-w-[650px] sm:max-w-[650px] max-w-[394px] mt-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full min-w-[100px]"
              src="/images/verified_logo.jpg"
              width={100}
            />
            <div className="flex flex-col justify-center items-center x950l:p-5 md:p-3 p-5">
              <div className="capitalize x950l:text-base md:text-sm sm:text-base text-sm font-medium max-w-[330px] tracking-wider  ">
                {verify_dic}
              </div>
              <div className="md:block x950l:hidden sm:hidden block text-xs font-medium tracking-wider self-end absolute bottom-2 right-2 ">
                {`${views} ${views_dic}`}
              </div>
            </div>
            <Divider
              orientation="vertical"
              className="h-10 w-[1px] x950l:block md:hidden sm:block hidden"
            />
            <div className="x950l:flex md:hidden sm:flex hidden flex-col w-full max-w-[100px] justify-center items-center ">
              <div className="text-2xl font-semibold">{views}</div>
              <div className="text-xs">{views_dic}</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fade>
  );
}

// export default function Verify({ views, views_dic, verify_dic }) {
//   return (
//     <Card className="w-full max-w-[394px] x950l:max-w-[650px] mt-2 relative">
//       <CardBody>
//         <div className="flex justify-between items-center">
//           <Image
//             alt="Card background"
//             className="object-cover rounded-xl w-full min-w-[100px]"
//             src="/images/verified_logo.jpg"
//             width={100}
//           />
//           <div className="flex flex-col justify-center items-center p-3 w-full">
//             <div className="capitalize text-base font-medium tracking-wider">
//               {verify_dic}
//             </div>
//           </div>
//         </div>
//         {/* Positioning the views count at the bottom right */}
//         <div className="absolute bottom-2 right-2 text-xs font-medium tracking-wider">
//           {`${views} ${views_dic}`}
//         </div>
//       </CardBody>
//     </Card>
//   );
// }
