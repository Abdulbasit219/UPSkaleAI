"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Check if current path is admin dashboard or code-twin
  const isAdminRoute = pathname?.startsWith("/admin");
  const isCodeTwinRoute = pathname?.startsWith("/code-twin");
  const isLoginRoute = pathname?.startsWith("/sign-in");
  const isSignupRoute = pathname?.startsWith("/signup");
  const hideLayout =
    isAdminRoute || isCodeTwinRoute || isLoginRoute || isSignupRoute;

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
