"use client";

import NavBar from "@/components/NavBar";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <div>
      <Button onClick={() => toast.success("Hello World! Click me for toast")}>
        Hello World! Click me for toast
      </Button>
      <NavBar />
    </div>
  );
}
