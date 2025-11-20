"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Menu,
  X,
  Zap,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Home,
  HelpCircle,
  BookOpen,
  DollarSign,
  Bot,
  Briefcase,
  FileCheck,
  Layers,
  GraduationCap,
  Trophy,
  BarChart3,
  Moon,
  FileUser,
  Building2,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/themeSlice";
import { useSession, signOut } from "next-auth/react";
// import { User } from 'next-auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [closingTimeout, setClosingTimeout] = useState(null);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Refs for detecting outside clicks
  const userDropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  const { data, status } = useSession();
  const user = data?.user;

  // Redux theme
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsResourcesDropdownOpen(false);
    }, 200);
    setClosingTimeout(timeout);
  };

  const handleMouseEnter = () => {
    if (closingTimeout) {
      clearTimeout(closingTimeout);
      setClosingTimeout(null);
    }
    setIsResourcesDropdownOpen(true);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const isActiveLink = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isResourcesActive = () => {
    const mainNavHrefs = mainNavItems.map((item) => item.href);
    return resourcesItems.some(
      (item) =>
        pathname.startsWith(item.href) && !mainNavHrefs.includes(item.href)
    );
  };

  const mainNavItems = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "Find Jobs",
      href: "/jobsearch",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      name: "Resume Checker",
      href: "/resume-checker",
      icon: <FileCheck className="w-4 h-4" />,
    },
  ];

  const resourcesItems = [
    {
      name: "Find Jobs",
      href: "/jobsearch",
      icon: <Briefcase className="w-4 h-4" />,
      description: "AI-matched opportunities",
    },
    {
      name: "Resume Checker",
      href: "/resume-checker",
      icon: <FileCheck className="w-4 h-4" />,
      description: "ATS optimization",
    },
    {
      name: "Code Twin AI",
      href: "/code-twin",
      icon: <Bot className="w-4 h-4" />,
      description: "AI coding assistant",
    },
    {
      name: "Career Path",
      href: "/career-path",
      icon: <GraduationCap className="w-4 h-4" />,
      description: "AI roadmap builder",
    },
    {
      name: "Skill Assessment",
      href: "/assessment",
      icon: <Trophy className="w-4 h-4" />,
      description: "Test your skills",
    },
    {
      name: "Resume Builder",
      href: "/resume-builder",
      icon: <FileUser className="w-4 h-4" />,
      description: "Build resume with AI",
    },
    // {
    //   name: "Analytics",
    //   href: "/analytics",
    //   icon: <BarChart3 className="w-4 h-4" />,
    //   description: "Track your progress",
    // },
  ];

  const userMenuItems = [
    {
      name: "Dashboard",
      href: "/dashboardd",
      icon: <Sparkles className="w-4 h-4" />,
    },
    { name: "Profile", href: "/profile", icon: <User className="w-4 h-4" /> },
    {
      name: "Pricing",
      href: "/pricing",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      name: "How it works",
      href: "/how-it-works",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      name: "Sign Out",
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => signOut({ callbackUrl: "/" }),
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown when route changes
  useEffect(() => {
    setIsUserDropdownOpen(false);
  }, [pathname]); // This will run every time the pathname changes

  // Close user dropdown when clicking outsidFe
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the dropdown and the button
      if (
        isUserDropdownOpen &&
        userDropdownRef.current &&
        userButtonRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20"
              : "bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-300/20"
            : "bg-transparent"
        }`}
      >
        {/* Gradient Border Bottom */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent ${
            scrolled ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SkillBridge
                </span>
                <span
                  className={`text-xs -mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Learn • Earn • Grow
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl font-medium transition-all duration-300 group ${
                    isActiveLink(item.href)
                      ? isDark
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/10"
                        : "text-gray-900 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg shadow-purple-300/10"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 ${
                      isActiveLink(item.href)
                        ? "text-purple-400"
                        : isDark
                          ? "text-gray-400 group-hover:text-purple-300"
                          : "text-gray-500 group-hover:text-purple-500"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {item.name}

                  {isActiveLink(item.href) && (
                    <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-x-1/2"></div>
                  )}
                </Link>
              ))}

              {/* Resources Dropdown */}
              <div className="relative">
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <button
                    className={`relative flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl font-medium transition-all duration-300 group ${
                      isResourcesActive()
                        ? isDark
                          ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/10"
                          : "text-gray-900 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg shadow-purple-300/10"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Layers
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isResourcesActive()
                          ? "text-purple-400"
                          : isDark
                            ? "text-gray-400 group-hover:text-purple-300"
                            : "text-gray-500 group-hover:text-purple-500"
                      }`}
                    />
                    Tools
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isResourcesDropdownOpen ? "rotate-180" : ""}`}
                    />
                    {isResourcesActive() && (
                      <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-x-1/2"></div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isResourcesDropdownOpen && (
                    <div
                      className={`absolute left-0 mt-2 w-80 backdrop-blur-xl border rounded-2xl shadow-2xl py-3 animate-in fade-in-0 zoom-in-95 ${
                        isDark
                          ? "bg-slate-900/98 border-purple-500/30 shadow-purple-500/20"
                          : "bg-white/98 border-purple-300/30 shadow-purple-300/20"
                      }`}
                    >
                      <div
                        className={`px-3 py-2 border-b mb-2 ${isDark ? "border-purple-500/10" : "border-purple-300/10"}`}
                      >
                        <p
                          className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-purple-300" : "text-purple-600"}`}
                        >
                          SkillBridge Tools
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-1 px-2">
                        {resourcesItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 border ${
                              isDark
                                ? "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border-transparent hover:border-purple-500/20"
                                : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-transparent hover:border-purple-300/20"
                            }`}
                            onClick={() => setIsResourcesDropdownOpen(false)}
                          >
                            <div
                              className={`mt-0.5 w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center border group-hover:scale-110 transition-transform ${
                                isDark
                                  ? "from-purple-500/20 to-pink-500/20 border-purple-500/20"
                                  : "from-purple-100 to-pink-100 border-purple-300/20"
                              }`}
                            >
                              <div className="text-purple-400">{item.icon}</div>
                            </div>
                            <div className="flex-1">
                              <div
                                className={`font-medium text-sm group-hover:text-purple-400 transition-colors ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {item.name}
                              </div>
                              <div
                                className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                              >
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Auth Buttons & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20 text-gray-300 hover:text-white hover:bg-slate-700/50 hover:border-purple-500/40"
                    : "bg-white/50 border-purple-300/20 text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-purple-300/40"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-500" />
                )}
              </button>

              {/* sign in button for desktop  */}
              {status === "unauthenticated" && (
                <Link
                  href="/sign-in"
                  className={`px-6 py-2.5 transition-colors duration-300 font-medium rounded-xl border ${
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-purple-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-purple-300/20"
                  }`}
                >
                  Sign In
                </Link>
              )}

              {/* User Dropdown */}
              {status === "authenticated" && (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    ref={userButtonRef}
                    onClick={toggleUserDropdown}
                    className={`flex items-center gap-2 px-3 py-2 transition-colors duration-300 rounded-xl border ${
                      isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-purple-500/20"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-purple-300/20"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 bg-gradient-to-br rounded-xl flex items-center justify-center border ${
                        isDark
                          ? "from-purple-500/20 to-pink-500/20 border-purple-500/30"
                          : "from-purple-100 to-pink-100 border-purple-300/30"
                      }`}
                    >
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isUserDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-56 backdrop-blur-xl border rounded-xl shadow-2xl py-2 animate-in fade-in-0 zoom-in-95 ${
                        isDark
                          ? "bg-slate-900/98 border-purple-500/30 shadow-purple-500/20"
                          : "bg-white/98 border-purple-300/30 shadow-purple-300/20"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 border-b ${isDark ? "border-purple-500/10" : "border-purple-300/10"}`}
                      >
                        <p
                          className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          Welcome Back!
                        </p>
                        <p
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Ready to learn?
                        </p>
                      </div>
                      <div className="py-2">
                        {userMenuItems.map((item) =>
                          item.onClick ? (
                            <button
                              key={item.name}
                              onClick={() => {
                                item.onClick();
                                setIsUserDropdownOpen(false);
                              }}
                              className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 mx-2 rounded-lg ${
                                isDark
                                  ? "text-gray-300 hover:text-white hover:bg-purple-500/10"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-50"
                              }`}
                            >
                              <div className="text-purple-400">{item.icon}</div>
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 mx-2 rounded-lg ${
                                isDark
                                  ? "text-gray-300 hover:text-white hover:bg-purple-500/10"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-50"
                              }`}
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              <div className="text-purple-400">{item.icon}</div>
                              {item.name}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20 text-gray-300 hover:text-white hover:bg-slate-700/50"
                    : "bg-white/50 border-purple-300/20 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-500" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20 text-gray-300 hover:text-white hover:bg-slate-700/50 hover:border-purple-500/40"
                    : "bg-white/50 border-purple-300/20 text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-purple-300/40"
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full backdrop-blur-xl shadow-2xl border-t transition-all duration-500 overflow-hidden ${
            isDark
              ? "bg-slate-900/98 border-purple-500/20"
              : "bg-white/98 border-purple-300/20"
          } ${isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 py-6 space-y-3 max-h-[500px] overflow-y-auto">
            {/* Main Navigation Links */}
            <div className="space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsUserDropdownOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? isDark
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                        : "bg-gradient-to-r from-purple-100 to-pink-100 text-gray-900 border border-purple-300/30"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`${isActiveLink(item.href) ? "text-purple-400" : isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Resources Section */}
            <div
              className={`pt-3 border-t ${isDark ? "border-purple-500/20" : "border-purple-300/20"}`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2 px-2 ${isDark ? "text-purple-300" : "text-purple-600"}`}
              >
                Tools & Resources
              </p>
              <div className="space-y-2">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsUserDropdownOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActiveLink(item.href)
                        ? isDark
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                          : "bg-gradient-to-r from-purple-100 to-pink-100 text-gray-900 border border-purple-300/30"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`${isActiveLink(item.href) ? "text-purple-400" : isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div>{item.name}</div>
                      <div
                        className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Buttons for mobiles */}
            {status === "unauthenticated" ? (
              <div
                className={`pt-4 border-t space-y-3 ${isDark ? "border-purple-500/20" : "border-purple-300/20"}`}
              >
                <Link
                  href="/sign-in"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsUserDropdownOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium transition-colors duration-300 border ${
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-purple-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-purple-300/20"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsUserDropdownOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                >
                  <Zap className="w-4 h-4" />
                  Get Started Free
                </Link>
              </div>
            ) : (
              <button
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium transition-colors duration-300 border ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-purple-500/20"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-purple-300/20"
                }`}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                sign out
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden animate-in fade-in-0"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
