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
        className={`${geistSans.variable} ${geistMono.variable} antialiased  w-full flex justify-center`}
      >
        <div className="w-full max-w-[2300px] x1470l:pl-4 x1470l:pr-4 x950l:pr-16 x950l:pl-16 sm:pr-10 sm:pl-10  x550l:p-3 pl-2 pr-2">
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
