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
