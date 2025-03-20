"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import LanguageIcon from "@mui/icons-material/Language";
import { i18n } from "@/i18n.config";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateUserLanguage } from "@/lib/action/userAction";
import { useEffect } from "react";
import { updateLanguage } from "@/redux/features/auth/authSlice";

export default function LanguageMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const id = useSelector((state) => state.auth._id);
  const dispatch = useDispatch();
  const area = useSelector((state) => state.search?.area);
  const serviceType = useSelector((state) => state.search?.serviceType);

  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const changeLanguage = async (locale) => {
    try {
      // router.push(
      //   `${redirectedPathName(locale)}?area=${area ? area : ""}&serviceType=${
      //     serviceType ? serviceType : ""
      //   }`,
      //   { scroll: false }
      // );
      window.open(
        `${redirectedPathName(locale)}?area=${area ? area : ""}&serviceType=${
          serviceType ? serviceType : ""
        }`,
        "_blank"
      );

      if (id) {
        await updateUserLanguage({ id, locale }); // Update the user's language preference
      }
    } catch (error) {
      console.error("Failed to update language:", error);
    }
  };

  useEffect(() => {
    // dispatch(updateLanguage(pathname));
    const language = pathname.split("/")[1]; // Extract first segment
    dispatch(updateLanguage(language)); // Dispatch only the language
  }, []);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          color="default"
          variant="light"
          aria-label="Like"
          radius="full"
          size="lg"
        >
          <LanguageIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {i18n.locales.map((locale) => {
          return (
            <DropdownItem
              key={locale}
              onPress={() => changeLanguage(locale)}
              textValue={locale}
            >
              {locale === "en" && "English"}
              {locale === "zh" && "中文"}
              {locale === "ms" && "Malay"}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
