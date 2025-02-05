import localFont from "next/font/local";
import "./globals.css";
import AllProvider from "@/components/AllProvider";
import Nav from "@/components/nav/Nav";
import { i18n } from "@/i18n.config";
import NavBottomWrap from "@/components/navBottom/NavBottomWrap";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AllCareOK - Your Service Ad Platform",
  description:
    "AllCareOK lets you post and find services effortlessly. A platform for everyone to share and discover services for free.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams?.lang || "en"; // Fallback to 'en' if lang is undefined

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  w-full flex justify-center !sm:p-2 !sm:pr-6 !sm:pl-6 `}
      >
        <div className="w-full x1880l:max-w-[2140px] x1640l:max-w-[1780px] x1128l:max-w-[1420px] x950l:max-w-[1090px] max-w-[710px]">
          <AllProvider>
            <Nav lang={lang} />
            {children}
            <NavBottomWrap lang={lang} />
          </AllProvider>
        </div>
      </body>
    </html>
  );
}
