// "use client";
// import Link from "next/link";
// import { Button } from "@heroui/react";

// export default function NotFound() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">
//           Oops Not Found!
//         </h1>
//         <p className="text-xl text-gray-700 mb-6">Something went wrong.</p>
//         <Link href="/">
//           <Button
//             color="danger"
//             radius="full"
//             size="lg"
//             className="font-semibold px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Return Home
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }


"use client";
import { LogoSpinner } from "@/components/LogoSpinner";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <LogoSpinner text={true} />
    </div>
  );
};

export default NotFound;


