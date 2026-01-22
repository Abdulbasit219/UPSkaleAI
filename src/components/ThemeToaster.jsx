"use client";

import { Toaster } from "@/components/ui/sonner";
import { useSelector } from "react-redux";

export default function ThemeToaster() {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <Toaster
      theme={theme === "dark" ? "dark" : "light"}
      richColors
      position="top-right"
      toastOptions={{
        style: {
          fontSize: "14px",
        },
      }}
    />
  );
}
