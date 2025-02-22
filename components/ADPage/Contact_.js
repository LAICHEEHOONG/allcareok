// import { Fade } from "react-awesome-reveal";
// import { contactServices } from "../contactServices";

// export default function Contact_({ contact }) {
//   return (
//     <Fade>
//       {contactServices.map((item, i) => {
//         return <div key={item.name}>
//             <div>{"icon"}</div>
//             <div>{"contact value"}</div>
//         </div>;
//       })}
//     </Fade>
//   );
// }

"use client";
// Contact_.js
import { Fade } from "react-awesome-reveal";
import { contactServices } from "../contactServices";
import { Divider } from "@heroui/react";

export default function Contact_({ contact }) {
  // Filter contact services based on provided contact object and non-empty values
  const filteredServices = contactServices.filter(
    (item) => contact[item.name] && contact[item.name].trim() !== ""
  );

  return (
    <Fade>
      <div className="flex flex-col mb-4">
        {filteredServices.map((item) => {
          const Icon = item.icon; // Get the icon component
          const contactValue = contact[item.name]; // Get the actual value from props

          return (
            <div
              key={item.name}
              className="flex items-center space-x-3"
            >
              <Icon className="!w-6 !h-6 m-4 text-gray-600" />
              {/* <div className="flex-shrink-0 text-gray-600 !w-6 !h-6 m-4 border-1 justify-center items-center">
                <Icon /> 
              </div> */}
              <div className="text-gray-800 break-all">{contactValue}</div>
            </div>
          );
        })}
      </div>
      <Divider />
    </Fade>
  );
}
