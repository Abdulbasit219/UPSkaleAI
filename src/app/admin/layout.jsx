"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toggleTheme } from "@/store/slices/themeSlice";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  Flag,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Shield,
  Sun,
  Moon,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const pathname = usePathname();

  // Sync theme with document element on mount and change
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark]);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Company Management", href: "/admin/companies", icon: Building2 },
    { name: "Job Posts", href: "/admin/jobs", icon: Briefcase },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Moderation", href: "/admin/moderation", icon: Flag },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none ${
          isDark ? "" : "invert"
        }`}
      />

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col z-50`}
      >
        <div
          className={`flex grow flex-col gap-y-5 overflow-y-auto border-r backdrop-blur-xl px-6 pb-4 ${
            isDark
              ? "bg-slate-900/80 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          {/* Logo */}
          <div className="flex h-20 shrink-0 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Admin Panel
                </h1>
                <p
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  SkillBridge
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-all ${
                            active
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                              : isDark
                                ? "text-gray-400 hover:text-white hover:bg-slate-800"
                                : "text-gray-700 hover:text-gray-900 hover:bg-purple-100"
                          }`}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {/* Admin Profile */}
              <li className="mt-auto">
                <div
                  className={`flex items-center gap-x-4 px-3 py-3 text-sm font-semibold leading-6 rounded-lg border ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50 border-purple-300/20"
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Admin User
                    </p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Super Admin
                    </p>
                  </div>
                  <LogOut
                    className={`h-5 w-5 cursor-pointer ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? "relative z-50" : ""}`}>
        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-72 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className={`flex h-full flex-col gap-y-5 overflow-y-auto border-r backdrop-blur-xl px-6 pb-4 ${
              isDark
                ? "bg-slate-900/95 border-purple-500/20"
                : "bg-white/95 border-purple-300/20"
            }`}
          >
            {/* Logo */}
            <div className="flex h-20 shrink-0 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1
                    className={`text-xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Admin Panel
                  </h1>
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    SkillBridge
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg ${
                  isDark
                    ? "text-gray-400 hover:text-white hover:bg-slate-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-all ${
                              active
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                                : isDark
                                  ? "text-gray-400 hover:text-white hover:bg-slate-800"
                                  : "text-gray-700 hover:text-gray-900 hover:bg-purple-100"
                            }`}
                          >
                            <item.icon className="h-6 w-6 shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div
          className={`sticky top-0 z-30 flex h-20 shrink-0 items-center gap-x-4 border-b backdrop-blur-xl px-4 sm:gap-x-6 sm:px-6 lg:px-8 ${
            isDark
              ? "bg-slate-900/80 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <button
            type="button"
            className={`-m-2.5 p-2.5 lg:hidden ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div
            className={`h-6 w-px lg:hidden ${
              isDark ? "bg-purple-500/20" : "bg-purple-300/20"
            }`}
          />

          {/* Search bar */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <Search
                className={`pointer-events-none absolute inset-y-0 left-0 h-full w-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="search"
                placeholder="Search..."
                className={`block h-full w-full border-0 py-0 pl-8 pr-0 bg-transparent placeholder:text-sm focus:ring-0 sm:text-sm outline-none ${
                  isDark
                    ? "text-white placeholder:text-gray-400"
                    : "text-gray-900 placeholder:text-gray-500"
                }`}
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Theme Toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDark
                    ? "bg-slate-800/50 border border-purple-500/20 text-gray-300 hover:text-white"
                    : "bg-white/50 border border-purple-300/20 text-gray-600 hover:text-gray-900"
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-500" />
                )}
              </button>

              {/* Notifications */}
              <button
                type="button"
                className={`-m-2.5 p-2.5 relative ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
              </button>

              {/* Separator */}
              <div
                className={`hidden lg:block lg:h-6 lg:w-px ${
                  isDark ? "bg-purple-500/20" : "bg-purple-300/20"
                }`}
              />

              {/* Profile dropdown */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-x-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    {/* Menu */}
                    <div
                      className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-2xl z-50 ${
                        isDark
                          ? "bg-slate-900 border-purple-500/20"
                          : "bg-white border-purple-300/20"
                      }`}
                    >
                      <div className="p-3">
                        <div className="flex items-center gap-3 px-3 py-2">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Admin User
                            </p>
                            <p
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Super Admin
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`border-t ${
                          isDark
                            ? "border-purple-500/20"
                            : "border-purple-300/20"
                        }`}
                      >
                        <Link
                          href="/admin/settings"
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                            isDark
                              ? "text-gray-300 hover:bg-slate-800 hover:text-white"
                              : "text-gray-700 hover:bg-purple-50 hover:text-gray-900"
                          }`}
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            // Add logout logic here
                            console.log("Logout clicked");
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                            isDark
                              ? "text-red-400 hover:bg-red-500/10"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
