// "use client";
// import { Button } from "@nextui-org/react";
// import { useRouter } from "next/navigation";

// export default function NavShareBtn({share}) {
//     const router = useRouter()
//   return (
//     <Button
//       className="hidden lg:flex"
//       color="default"
//       variant="light"
//       radius="full"
//       size="lg"
//       onPress={() => router.push('/dashboard')}
//       // isDisabled={true}
//     >
//       {share}
//     </Button>
//   );
// }

"use client";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavShareBtn({ share }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const currentLocale = pathname.split("/")[1] || "en";

  return (
    <Button
      className="hidden lg:flex"
      color="default"
      variant="light"
      radius="full"
      size="lg"
      onPress={() => router.push(`/${currentLocale}/dashboard`)}
    >
      {share}
    </Button>
  );
}
