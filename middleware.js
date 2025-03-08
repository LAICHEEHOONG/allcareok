// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { i18n } from "./i18n.config";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// const protectedPaths = [
//   "/dashboard",
//   "/editor",
//   "/overview",
//   "/editor/mobile/photo",
//   "/editor/mobile/delete",
//   "/editor/mobile/area",
//   "/editor/mobile/contact",
//   "/editor/mobile/description",
//   "/editor/mobile/verify",
//   "/editor/mobile/boosts",
//   "/one_nine_nine_zero",
//   "/wishlists",
// ];

// function getProtectedRoutes(protectedPaths, locales) {
//   let protectedPathsWithLocale = [...protectedPaths];

//   protectedPaths.forEach((route) => {
//     locales.forEach(
//       (locale) =>
//         (protectedPathsWithLocale = [
//           ...protectedPathsWithLocale,
//           `/${locale}${route}`,
//         ])
//     );
//   });

//   return protectedPathsWithLocale;
// }

// function getLocale(request) {
//   const negotiatorHeaders = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // @ts-ignore locales are readonly
//   const locales = i18n.locales;
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

//   const locale = matchLocale(languages, locales, i18n.defaultLocale);
//   return locale;
// }

// const middleware = withAuth(
//   function middleware(request) {
//     const token = request.nextauth?.token;
//     const pathname = request.nextUrl.pathname;
//     const pathnameIsMissingLocale = i18n.locales.every(
//       (locale) =>
//         !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//     );

//     const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
//       ...i18n.locales,
//     ]);

//     // Add custom header to include the current pathname
//     const response = NextResponse.next();
//     response.headers.set("x-current-path", pathname);

//     // If the user is not authenticated and the path is protected, redirect to login
//     const callbackUrl = pathname || "/";
//     if (!token && protectedPathsWithLocale.includes(pathname)) {
//       return NextResponse.redirect(
//         new URL(
//           `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
//           request.url
//         )
//       );
//     }

//     // Redirect if there is no locale
//     if (pathnameIsMissingLocale) {
//       const locale = getLocale(request);
//       return NextResponse.redirect(
//         new URL(
//           `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
//           request.url
//         )
//       );
//     }

//     return response; // Ensure the updated response is returned
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => true,
//     },
//   }
// );

// export default middleware;

// // Exclude specific paths from middleware
// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|images|.well-known).*)",
//   ],
// };


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
  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const matchedLocale = matchLocale(languages, locales, i18n.defaultLocale);
  // Ensure the matched locale is in our supported list
  return i18n.locales.includes(matchedLocale) ? matchedLocale : i18n.defaultLocale;
}

const isBot = (request) => {
  const userAgent = request.headers.get("user-agent") || "";
  return /Googlebot|bingbot|yahoobot/i.test(userAgent);
};

export default withAuth(
  function middleware(request) {
    const pathname = request.nextUrl.pathname;

    if (pathname === "/sitemap.xml" || pathname === "/robots.txt" || pathname === "/ads.txt") {
      return NextResponse.next();
    }

    const token = request.nextauth?.token;
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ]);

    const response = NextResponse.next();
    response.headers.set("x-current-path", pathname);

    if (isBot(request)) {
      if (protectedPathsWithLocale.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return response;
    }

    const callbackUrl = pathname || "/";
    if (!token && protectedPathsWithLocale.includes(pathname)) {
      return NextResponse.redirect(
        new URL(
          `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          request.url
        )
      );
    }

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      console.log(`Resolved locale: ${locale}`); // Debug log
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url
        )
      );
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.well-known).*)",
  ],
};