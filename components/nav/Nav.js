import { Poppins } from "next/font/google";
import { getDictionary } from "@/lib/dictionary.js";

import NavChild from "./NavChild.js";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function Nav({ lang }) {
  // const { navigation, service_type } = await getDictionary(lang);
  const dic = await getDictionary(lang);

  return (
    <NavChild
      navigation={dic.navigation}
      service_type={dic.service_type}
      poppins={poppins}
      dic={dic}

    />
  );
}
