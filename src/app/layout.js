import { Exo_2, Open_Sans } from "next/font/google";
import "./globals.css";
import ToastWrapper from "@/wrapper/ToastWrapper";
import HeaderNav from "@/components/HeaderNav";
import NextTopLoader from "nextjs-toploader";

export const open_sans = Open_Sans({ subsets: ["latin"] });
const exo2 = Exo_2({ subsets: ["latin"] });

export const metadata = {
  title: "Sakhi: Wellness Friend",
  description:
    "Sakhi, a mobile-first app tailored for women, encompasses daily journals, safety features, community, and holistic health tools. Elevate your well-being with Sakhi, your dedicated companion for empowerment, connection, and growth.",
  lang: "en",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={exo2.className + " sm:overflow-hidden"}>
        <NextTopLoader />
        <HeaderNav />
        {children}

        {/* TODO: TEMP */}
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[99999] bg-white hidden sm:flex justify-center items-center">
          Display Size not allowed, Please switch to mobile view.
        </div>
      </body>
      <ToastWrapper />
    </html>
  );
}
