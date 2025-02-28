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
import { Divider, Snippet } from "@heroui/react";

export default function Contact_({ contact }) {
  // Filter contact services based on provided contact object and non-empty values
  const filteredServices = contactServices.filter(
    (item) => contact[item.name] && contact[item.name].trim() !== ""
  );

  return (
    <Fade triggerOnce className="flex flex-col py-4">
      <Divider />
      <div className="flex flex-col">
        {filteredServices.map((item) => {
          const Icon = item.icon; // Get the icon component
          const contactValue = contact[item.name]; // Get the actual value from props

          return (
   
            <Snippet
              key={item.name}
              symbol={""}
              className="m-2  "
              color="default"
              size="sm"
              radius="lg"
            >
              <div className="flex justify-center items-center gap-3">
                <Icon className="!w-5 !h-5 ml-1 " />
                <div className="truncate w-full md:max-w-[400px] max-w-[200px]">{contactValue}</div>
              </div>
            </Snippet>
          );
        })}
      </div>
    </Fade>
  );
}
