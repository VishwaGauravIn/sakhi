"use client";

import NavBar from "@/components/NavBar";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <Button onClick={() => toast.success("Hello World! Click me for toast")}>
        Hello World! Click me for toast
      </Button><br/>
      <Link href="/login">Login</Link><br/>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
