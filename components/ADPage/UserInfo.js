// "use client";
// import { useEffect, useState } from "react";
// import { Avatar, Divider } from "@heroui/react";
// import { formatDistanceToNow } from "date-fns";

// export default function UserInfo({ userData }) {
//   const [adUser, setAdUser] = useState(userData || null);
//   const [createdUntilNow, setCreatedUntilNow] = useState("");
//   useEffect(() => {
//     if (!userData) return; // Prevent running if userData is missing
//     setAdUser(userData);
//   }, [userData]);

//   useEffect(() => {
//     // const createdAt = "2024-11-16T13:11:21.209Z"; // Assuming this is passed from props or fetched data
//     const distance = formatDistanceToNow(new Date(adUser.createdAt), {
//       addSuffix: true,
//     });
//     setCreatedUntilNow(distance);
//   }, [adUser]);

//   useEffect(() => {
//     console.log(adUser);
//   }, [adUser]);
//   return (
//     <div>
//       <div className="flex">
//         <Avatar name={adUser?.name} src={adUser?.image} />
//         <div>
//           <div>{`${"Shared by"} ${adUser?.name}`}</div>
//           <div>{`${"Joined"} ${createdUntilNow}`}</div>
//         </div>
//       </div>

//       <Divider />
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Avatar, Divider } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import { Fade } from "react-awesome-reveal";

export default function UserInfo({ userData, shared_by }) {
  const [adUser, setAdUser] = useState(userData || null);
  const [createdUntilNow, setCreatedUntilNow] = useState("");

  useEffect(() => {
    if (userData) {
      setAdUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (adUser && adUser.createdAt) {
      const distance = formatDistanceToNow(new Date(adUser.createdAt), {
        addSuffix: true,
      });
      setCreatedUntilNow(distance);
    }
  }, [adUser]);

  // Removed the useEffect for logging as it's generally not needed in production

  if (!adUser) return null; // Early return if there's no user data

  return (
    <Fade className="flex flex-col items-start space-y-4 py-4 ">
      <div className="flex items-center space-x-4">
        <Avatar name={adUser.name} src={adUser.image} className="w-12 h-12" />
        <div className="text-left">
          <div className="w-full max-w-[300px] x950l:max-w-[500px] tracking-wide">
            <div className="text-lg font-medium truncate">{`${shared_by} ${adUser.name}`}</div>
          </div>
          <div className="text-sm text-gray-600 tracking-wide">{`Joined ${createdUntilNow}`}</div>
        </div>
      </div>
      {/* <Divider className="w-full" /> */}
    </Fade>
  );
}
