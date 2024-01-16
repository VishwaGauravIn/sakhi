"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
