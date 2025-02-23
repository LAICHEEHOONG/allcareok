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
    <Fade className="flex flex-col py-4">
      <Divider />
      <div className="flex flex-col">
        {filteredServices.map((item) => {
          const Icon = item.icon; // Get the icon component
          const contactValue = contact[item.name]; // Get the actual value from props

          return (
            <div key={item.name} className="flex items-center space-x-3 ">
              <Icon className="!w-6 !h-6 m-4 text-gray-600" />

              <div className="text-gray-800 break-all truncate">
                {contactValue}
              </div>
            </div>
          );
        })}
      </div>
    </Fade>
  );
}
