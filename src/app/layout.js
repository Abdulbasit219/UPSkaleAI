import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/providers/ReduxProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import ThemeToaster from "@/components/ThemeToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UpSkaleAI - Connect, Learn, and Grow Your Skills",
  description:
    "An AI-powered platform to upscale your skills and bridge the gap between learning and earning",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <AuthProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            suppressHydrationWarning
          >
            <ConditionalLayout>{children}</ConditionalLayout>
            <ThemeToaster />
          </body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
