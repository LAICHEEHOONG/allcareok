import { getDictionary } from "@/lib/dictionary";
import NavBottom from "./NavBottom";

export default async function NavBottomWrap({ lang }) {
  const { bottom_navigation } = await getDictionary(lang);
  return <NavBottom bottom_navigation={bottom_navigation} />;
}
