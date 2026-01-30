"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CodeTwinWidget from "./code-twin/CodeTwinWidget";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAdminRoute = pathname?.startsWith("/admin");
  const isCodeTwinRoute = pathname?.startsWith("/code-twin");
  const isLoginRoute = pathname?.startsWith("/sign-in");
  const isSignupRoute = pathname?.startsWith("/signup");
  const isCompanyDashboard = pathname?.startsWith("/company/dashboard");
  const hideLayout =
    isAdminRoute || isCodeTwinRoute || isLoginRoute || isSignupRoute;
  const showCodeTwinWidget =
    !isAdminRoute &&
    !isCodeTwinRoute &&
    !isLoginRoute &&
    !isSignupRoute &&
    !isCompanyDashboard &&
    status === "authenticated" &&
    session?.user?.role === "Job Seeker";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {showCodeTwinWidget && <CodeTwinWidget />}
      {!hideLayout && <Footer />}
    </>
  );
}
