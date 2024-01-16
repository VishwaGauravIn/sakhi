"use client";

import { Button } from "@/components/ui/button";
import { enqueueSnackbar } from "notistack";
import React from "react";

export default function Home() {
  return (
    <div>
      <Button onClick={() => enqueueSnackbar("That was easy!")}>
        Hello World! Click me for toast
      </Button>
    </div>
  );
}
