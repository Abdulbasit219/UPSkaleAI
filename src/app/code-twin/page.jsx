"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Code2,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  Layout,
  PanelLeft,
  PanelRight,
  ChevronLeft,
  Cloud,
  Cpu,
  Settings,
  Zap,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  Shield,
  Building2,
  DollarSign,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/themeSlice";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import Spotlight from "@/components/ui/Spotlight";

// Components
import CodeEditor from "@/components/code-twin/CodeEditor";
import CodeTwinChat from "@/components/code-twin/CodeTwinChat";

export default function CodeTwinPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [code, setCode] = useState(`// Welcome to CodeTwin
// Write your code here and chat with the AI for help!

function welcome() {
  console.log("Hello, CodeTwin!");
}

welcome();`);

  // Layout State
  const [fullscreenComp, setFullscreenComp] = useState(null); // 'editor', 'chat', or null
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Refs for detecting outside clicks
  const userDropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsLoadingSpeaking] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  // Initialize conversation
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "ai",
          content:
            "Hello! I'm your AI coding assistant. How can I help you with your code today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  // Handle mobile layout: auto-switch away from split screen on small screens
  useEffect(() => {
    const checkMobileSplit = () => {
      if (window.innerWidth < 1024 && fullscreenComp === null) {
        setFullscreenComp("editor");
      }
    };

    checkMobileSplit();
    window.addEventListener("resize", checkMobileSplit);
    return () => window.removeEventListener("resize", checkMobileSplit);
  }, [fullscreenComp]);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const getUserDisplayName = () => {
    if (!session) return "Guest";
    return (
      session.user?.name ||
      session.user?.username ||
      session.user?.email?.split("@")[0] ||
      "User"
    );
  };

  const getRoleBadgeColor = () => {
    if (!session) return "";
    const role = session.user.role;

    switch (role) {
      case "Admin":
        return isDark
          ? "bg-red-500/20 text-red-300 border-red-500/40"
          : "bg-red-100 text-red-700 border-red-300";
      case "Company":
        return isDark
          ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
          : "bg-blue-100 text-blue-700 border-blue-300";
      case "Job Seeker":
      default:
        return isDark
          ? "bg-green-500/20 text-green-300 border-green-500/40"
          : "bg-green-100 text-green-700 border-green-300";
    }
  };

  const getRoleBasedMenuItems = () => {
    if (!session) return [];
    const role = session.user.role;

    switch (role) {
      case "Admin":
        return [
          {
            name: "Admin Dashboard",
            href: "/admin",
            icon: <Shield className="w-4 h-4" />,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: <Settings className="w-4 h-4" />,
          },
        ];
      case "Company":
        return [
          {
            name: "Company Dashboard",
            href: "/company/dashboard",
            icon: <Building2 className="w-4 h-4" />,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: <Settings className="w-4 h-4" />,
          },
        ];
      case "Job Seeker":
      default:
        return [
          {
            name: "Dashboard",
            href: "/dashboardd",
            icon: <Sparkles className="w-4 h-4" />,
          },
          {
            name: "Profile",
            href: "/profile",
            icon: <User className="w-4 h-4" />,
          },
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
        ];
    }
  };

  const userMenuItems = getRoleBasedMenuItems();

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const contextPayload = {
        messages: [...messages, userMsg],
        context: "Coding assistant mentorship.",
        currentCode: code,
      };

      const response = await fetch("/api/code-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contextPayload),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "ai",
            content: data.content,
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          content: "Connection interrupted. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden relative ${isDark ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <BackgroundPattern />
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-30 ${isDark ? "bg-purple-900/20" : "bg-purple-500/10"} blur-[100px]`}
        />
      </div>

      {/* IDE Navbar */}
      <nav
        className={`w-full shrink-0 h-16 border-b z-50 transition-all duration-300 backdrop-blur-xl ${
          isDark
            ? "bg-slate-950/80 border-white/5"
            : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand & Back */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`p-2 rounded-xl transition-all ${
                isDark
                  ? "hover:bg-white/10 text-slate-400 hover:text-white"
                  : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold tracking-tight">
                  CodeTwin IDE
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: View Controls */}
          <div
            className={`flex items-center p-1 rounded-xl border ${
              isDark
                ? "bg-slate-900/50 border-white/5"
                : "bg-slate-100/50 border-slate-200"
            }`}
          >
            {[
              { id: "editor", icon: PanelLeft, label: "Editor" },
              { id: null, icon: Layout, label: "Split", mobileHide: true },
              { id: "chat", icon: PanelRight, label: "Chat" },
            ].map((view) => (
              <button
                key={view.id || "split"}
                onClick={() => setFullscreenComp(view.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  fullscreenComp === view.id
                    ? isDark
                      ? "bg-white/10 text-white shadow-sm"
                      : "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                } ${view.mobileHide ? "hidden md:flex" : "flex"}`}
              >
                <view.icon className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">{view.label}</span>
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? "hover:bg-white/10 text-slate-400"
                  : "hover:bg-slate-100 text-slate-500"
              }`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <div
              className={`h-6 w-px ${isDark ? "bg-white/10" : "bg-slate-200"}`}
            />

            {status === "authenticated" ? (
              <button
                onClick={toggleUserDropdown}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-transparent hover:border-purple-500/20 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                        {getUserDisplayName().charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Workspace occupying the remaining space */}
      <main className="flex-1 w-full flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 overflow-hidden relative z-10 transition-all duration-1000 min-h-0">
        <div
          className={`transition-all duration-500 flex flex-col min-w-0 h-full ${fullscreenComp === "chat" ? "hidden" : "flex-1"}`}
        >
          <CodeEditor
            isDark={isDark}
            code={code}
            setCode={setCode}
            onToggleFullscreen={() =>
              setFullscreenComp(fullscreenComp === "editor" ? null : "editor")
            }
            isFullscreen={fullscreenComp === "editor"}
          />
        </div>

        <div
          className={`transition-all duration-500 flex flex-col min-w-0 h-full ${fullscreenComp === "editor" ? "hidden" : fullscreenComp === "chat" ? "flex-1" : "hidden lg:flex lg:w-[480px]"}`}
        >
          <CodeTwinChat
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            isDark={isDark}
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsLoadingSpeaking}
            onToggleFullscreen={() =>
              setFullscreenComp(fullscreenComp === "chat" ? null : "chat")
            }
            isFullscreen={fullscreenComp === "chat"}
          />
        </div>
      </main>

      {/* Profile Dropdown */}
      {isUserDropdownOpen && (
        <div
          ref={userDropdownRef}
          className={`fixed top-[3.75rem] sm:top-[4.25rem] right-4 sm:right-6 w-56 sm:w-64 backdrop-blur-3xl border rounded-2xl sm:rounded-[2rem] shadow-2xl py-2 sm:py-3 z-[10000] animate-in fade-in zoom-in-95 duration-200 ${isDark ? "bg-slate-950/90 border-white/10" : "bg-white/95 border-slate-200"}`}
        >
          <div
            className={`px-5 sm:px-6 py-3 sm:py-4 border-b border-slate-100 ${isDark ? "border-white/5" : "border-slate-100"}`}
          >
            <p className="text-xs sm:text-sm font-black tracking-tight dark:text-white text-slate-900">
              {getUserDisplayName()}
            </p>
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 truncate mt-0.5">
              {session?.user?.email}
            </p>
          </div>
          <div className="py-2 sm:py-3 px-1.5 sm:px-2">
            {userMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider mx-1.5 sm:mx-2 rounded-xl sm:rounded-2xl transition-all ${isDark ? "text-slate-400 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
              >
                <span className="text-purple-500">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <div
              className={`mx-4 sm:mx-6 my-2 sm:my-3 border-t ${isDark ? "border-white/5" : "border-slate-100"}`}
            />
            <button
              onClick={handleSignOut}
              className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider mx-3 sm:mx-4 rounded-xl sm:rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
