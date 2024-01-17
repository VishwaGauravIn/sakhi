import { Inter } from "next/font/google";
import "./globals.css";
import ToastWrapper from "@/wrapper/ToastWrapper";
import HeaderNav from "@/components/HeaderNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sakhi: Wellness Friend",
  description:
    "Sakhi, a mobile-first app tailored for women, encompasses daily journals, safety features, community, and holistic health tools. Elevate your well-being with Sakhi, your dedicated companion for empowerment, connection, and growth.",
  lang: "en",
  manifest: "/manifest.json",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
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
      </head>
      <body className={inter.className}>
        <HeaderNav />
        {children}
      </body>
      <ToastWrapper />
    </html>
  );
}
