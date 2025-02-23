// "use client";
// import { Divider, Button } from "@heroui/react";
// import { Fade } from "react-awesome-reveal";

// export default function Description_({ description }) {
//   return (
//     <Fade className="flex flex-col gap-4 space-y-4 py-4 ">
//       <div className="whitespace-pre-wrap text-lg text-gray-800">
//         {description}
//       </div>
//       <Divider />
//     </Fade>
//   );
// }

"use client";
import { Divider, Button } from "@heroui/react";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Description_({ description, show_more, show_less }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 200; // Number of characters to show in the preview

  // Determine if the description is long enough to need truncation
  const isLongDescription = description.length > previewLength;
  const previewText = isLongDescription
    ? description.slice(0, previewLength) + "..."
    : description;

  return (
    <Fade className="flex flex-col space-y-4 py-4">
      <Divider />
      <div className="whitespace-pre-wrap text-lg text-gray-800">
        {isExpanded ? description : previewText}
      </div>
      {isLongDescription && (
        <div>
          <Button
            onPress={() => setIsExpanded(!isExpanded)}
            endContent={<ArrowForwardIosIcon />}
            variant="light"
            radius="full"
          >
            {isExpanded ? show_less : show_more}
          </Button>
        </div>
      )}
      {/* <Divider /> */}
    </Fade>
  );
}
