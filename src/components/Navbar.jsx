"use client";
import React, { useState, useEffect } from "react";
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
  BookOpen,
  DollarSign,
  Bot,
  Briefcase,
  FileCheck,
  Layers,
  GraduationCap,
  Trophy,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [closingTimeout, setClosingTimeout] = useState(null);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Resources/Tools Dropdown Items
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
      name: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      description: "Track your progress",
    },
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
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      name: "Sign Out",
      href: "/sign-out",
      icon: <LogOut className="w-4 h-4" />,
    },
  ];

  const isActiveLink = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isResourcesActive = () => {
    return resourcesItems.some((item) => pathname.startsWith(item.href));
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20"
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
                <span className="text-xs text-gray-400 -mt-1">
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
                      ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 ${
                      isActiveLink(item.href)
                        ? "text-purple-300"
                        : "text-gray-400 group-hover:text-purple-300"
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

              {/* Resources Dropdown  */}
              <div className="relative">
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <button
                    className={`relative flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl font-medium transition-all duration-300 group ${
                      isResourcesActive()
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Layers
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isResourcesActive()
                          ? "text-purple-300"
                          : "text-gray-400 group-hover:text-purple-300"
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
                    <div className="absolute left-0 mt-2 w-80 bg-slate-900/98 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 py-3 animate-in fade-in-0 zoom-in-95">
                      <div className="px-3 py-2 border-b border-purple-500/10 mb-2">
                        <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                          SkillBridge Tools
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-1 px-2">
                        {resourcesItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-200 border border-transparent hover:border-purple-500/20"
                            onClick={() => setIsResourcesDropdownOpen(false)}
                          >
                            <div className="mt-0.5 w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                              <div className="text-purple-400">{item.icon}</div>
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-gray-400 text-xs mt-0.5">
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

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/sign-in"
                className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors duration-300 font-medium hover:bg-white/5 rounded-xl border border-transparent hover:border-purple-500/20"
              >
                Sign In
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 rounded-xl hover:bg-white/5 border border-transparent hover:border-purple-500/20"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <User className="w-4 h-4 text-purple-400" />
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900/98 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 py-2 animate-in fade-in-0 zoom-in-95">
                    <div className="px-4 py-3 border-b border-purple-500/10">
                      <p className="text-sm font-semibold text-white">
                        Welcome Back!
                      </p>
                      <p className="text-sm text-gray-400">Ready to learn?</p>
                    </div>
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-200 mx-2 rounded-lg"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <div className="text-purple-400">{item.icon}</div>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-slate-800/50 border border-purple-500/20 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 hover:border-purple-500/40"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-slate-900/98 backdrop-blur-xl shadow-2xl border-t border-purple-500/20 transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-3 max-h-[500px] overflow-y-auto">
            {/* Main Navigation Links */}
            <div className="space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`${isActiveLink(item.href) ? "text-purple-300" : "text-gray-400"}`}
                  >
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Resources Section */}
            <div className="pt-3 border-t border-purple-500/20">
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2 px-2">
                Tools & Resources
              </p>
              <div className="space-y-2">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActiveLink(item.href)
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`${isActiveLink(item.href) ? "text-purple-300" : "text-gray-400"}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="pt-4 border-t border-purple-500/20 space-y-3">
              <Link
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors duration-300 border border-transparent hover:border-purple-500/20"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Zap className="w-4 h-4" />
                Get Started Free
              </Link>
            </div>
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
