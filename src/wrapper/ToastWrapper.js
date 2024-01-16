"use client";
import { SnackbarProvider } from "notistack";
import React from "react";

export default function ToastWrapper() {
  return (
    <SnackbarProvider
      maxSnack={3}
      dense
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    />
  );
}

// Sample

{
  /* <Button onClick={() => enqueueSnackbar("That was easy!")}>
  Hello World! Click me for toast
</Button>; */
}
