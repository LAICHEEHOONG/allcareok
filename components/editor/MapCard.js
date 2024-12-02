// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { useSelector, useDispatch } from "react-redux";
// import { setFocus } from "@/redux/features/editor/editorSlice";
// import { GoogleMapsEmbed } from "@next/third-parties/google";

// export default function MapCard() {
//   const dispatch = useDispatch();
//   const cardFocus = useSelector((state) => state.editor?.cardFocus);

//   return (
//     <Card
//       className={` m-5 p-1 w-[300px] ${
//         cardFocus === "map" ? "border-solid border-2 border-black" : ""
//       } `}
//       isPressable
//       onPress={() => {
//         dispatch(setFocus("map"));
//       }}
//     >
//       <CardBody className="">
//         <div className="flex flex-col justify-center items-center">
//           <div className="font-medium self-start">Location</div>
//           <GoogleMapsEmbed
//             apiKey="AIzaSyBvSmftem94fcOEtNH9qUDn9ESrw-8AtHk"
//             height={200}
//             width="100%"
//             mode="place"
//             q="Brooklyn+Bridge,New+York,NY"
//           />
//           {/* <div className="text-small tracking-tight text-default-400 self-start">
//             8 photos
//           </div> */}
//           {/* 
//           <Image
//             // className="min-w-[37px] "

//             className="flex justify-center items-center mt-4"
//             width={350}
//             // radius="none"
//             alt="photos upload poster"
//             src="/images/poster_sample.png"
//           /> */}
//         </div>
//       </CardBody>
//     </Card>
//   );
// }


import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "@/redux/features/editor/editorSlice";
import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function MapCard() {
  const dispatch = useDispatch();
  const cardFocus = useSelector((state) => state.editor?.cardFocus);

  return (
    <Card
      className={`m-5 p-1 w-[300px] ${
        cardFocus === "map" ? "border-solid border-2 border-black" : ""
      } `}
      isPressable
      onPress={() => {
        dispatch(setFocus("map"));
      }}
    >
      <CardBody>
        <div className="flex flex-col justify-center items-center">
          <div className="font-medium self-start">Location</div>
          <GoogleMapsEmbed
            apiKey="YOUR_API_KEY"
            height={200}
            width={268}
            mode="place"
            q="Brooklyn+Bridge,New+York,NY"
            style={{ borderRadius: "10px" }}
          />
        </div>
      </CardBody>
    </Card>
  );
}