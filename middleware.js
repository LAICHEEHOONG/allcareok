import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { i18n } from "./i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const protectedPaths = [
  "/dashboard",
  "/editor",
  "/overview",
  "/editor/mobile/photo",
  "/editor/mobile/delete",
  "/editor/mobile/area",
  "/editor/mobile/contact",
  "/editor/mobile/description",
  "/editor/mobile/verify",
  "/editor/mobile/boosts",
  "/one_nine_nine_zero",
  "/wishlists",
];

function getProtectedRoutes(protectedPaths, locales) {
  let protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ])
    );
  });

  return protectedPathsWithLocale;
}

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

const middleware = withAuth(
  function middleware(request) {
    const token = request.nextauth?.token;
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );



    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ]);

    console.log("🔍 Checking middleware execution:");
    console.log("📌 Current Path:", pathname);
    console.log("🔑 Auth Token:", token ? "✅ Exists" : "❌ Not Found");
    console.log("🛡️ Protected Paths With Locale:", protectedPathsWithLocale);
    console.log(
      "🔄 Redirect Condition:",
      !token && protectedPathsWithLocale.includes(pathname)
    );

    // Add custom header to include the current pathname
    const response = NextResponse.next();
    response.headers.set("x-current-path", pathname);

    // If the user is not authenticated and the path is protected, redirect to login
    const callbackUrl = pathname || "/";
    if (!token && protectedPathsWithLocale.includes(pathname)) {
      return NextResponse.redirect(
        new URL(
          `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          request.url
        )
      );
    }

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url
        )
      );
    }

    return response; // Ensure the updated response is returned
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

// const middleware = withAuth(
//   function middleware(request) {
//     const token = request.nextauth?.token;
//     const pathname = request.nextUrl.pathname;
//     const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, i18n.locales);

//     console.log("🔍 Checking middleware execution:");
//     console.log("📌 Current Path:", pathname);
//     console.log("🔑 Auth Token:", token ? "✅ Exists" : "❌ Not Found");
//     console.log("🛡️ Protected Paths With Locale:", protectedPathsWithLocale);
//     console.log("🔄 Redirect Condition:", !token && protectedPathsWithLocale.includes(pathname));

//     if (!token && protectedPathsWithLocale.includes(pathname)) {
//       return NextResponse.redirect(
//         new URL(
//           `/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`,
//           request.url
//         )
//       );
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Only allow access if a token exists
//     },
//   }
// );

export default middleware;

// Exclude specific paths from middleware
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.well-known).*)",
  ],
};
