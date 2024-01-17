"use client";

import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function ProtectedContainer({ children }) {
  const pathname = usePathname();
  const [active, setActive] = useState(getActive());

  function getActive() {
    switch (pathname) {
      case "/dashboard":
        return 0;
      case "/tracker":
        return 1;
      case "/journal":
        return 2;
      case "/social":
        return 3;
      default:
        return 0;
    }
  }
  return (
    <div className="flex flex-col min-h-screen w-full relative pb-20">
      {children} <NavBar active={active} setActive={setActive} />
    </div>
  );
}
