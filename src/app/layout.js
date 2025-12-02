import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/providers/ReduxProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillBridge - Connect, Learn, and Grow Your Skills",
  description: "A platform to bridge the gap between learning and earning",
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
            <Toaster />
          </body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
