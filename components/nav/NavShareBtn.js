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
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavShareBtn({ share }) {
  const router = useRouter();
  const language = useSelector(state => state.auth.language)
  // const pathname = usePathname(); // Get the current path
  // const searchParams = useSearchParams(); // Get current query parameters

  // // Extract the current locale from the pathname
  // const currentLocale = pathname.split("/")[1] || "en"; // Default to 'en' if locale is missing

  return (
    <Button
      className="hidden lg:flex"
      color="default"
      variant="light"
      radius="full"
      size="lg"
      onPress={() => router.push(`${language}/dashboard`)
        // router.push(
        //   `/${currentLocale}/dashboard${searchParams ? `?${searchParams}` : ""}`
        // )
      }
    >
      {share}
    </Button>
  );
}