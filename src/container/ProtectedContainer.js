"use client";

import NavBar from "@/components/NavBar";
import React from "react";

export default function ProtectedContainer({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full relative pb-20">
      {children} <NavBar />
    </div>
  );
}
