"use client";

import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import { enqueueSnackbar } from "notistack";
import React from "react";

export default function Home() {
  return (
    <div>
      <Button onClick={() => toast.success("Hello World! Click me for toast")}>
        Hello World! Click me for toast
      </Button>
    </div>
  );
}
