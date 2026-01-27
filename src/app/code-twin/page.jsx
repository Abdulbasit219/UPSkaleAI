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
      className={`h-screen w-screen flex flex-col overflow-hidden relative ${isDark ? "bg-[#020617] text-white dark" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Background Underneath */}
      <BackgroundPattern />
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Nav as first child of flex-col to force visibility */}
      <nav
        className={`w-full shrink-0 h-14 sm:h-16 border-b z-[9999] transition-all duration-500 backdrop-blur-3xl relative top-0 ${isDark ? "bg-slate-950/80 border-white/5 shadow-2xl shadow-black/20" : "bg-white/95 border-slate-200 shadow-sm"}`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Section */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={() => router.push("/")}
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all border ${isDark ? "bg-white/5 border-white/5 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm"}`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-2 sm:gap-4 group cursor-default">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transform group-hover:rotate-6 transition-all duration-500">
                <Code2 className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-[10px] sm:text-sm font-black tracking-tighter uppercase">
                  CodeTwin IDE
                </h1>
                <div className="hidden sm:flex items-center gap-2 text-[8px] sm:text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  Cloud Sync Active
                </div>
              </div>
            </div>
          </div>

          {/* Layout Controls - The "Switcher" */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl sm:rounded-2xl border transition-all duration-500 ${isDark ? "bg-white/5 border-white/10 shadow-2xl shadow-black/20" : "bg-slate-200/50 border-slate-300/50 shadow-inner"}`}
          >
            <button
              onClick={() => setFullscreenComp(null)}
              className={`hidden md:flex px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${
                !fullscreenComp
                  ? isDark
                    ? "bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] text-purple-400"
                    : "bg-white shadow-lg text-purple-600"
                  : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Split</span>
            </button>
            <button
              onClick={() => setFullscreenComp("editor")}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all flex items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${
                fullscreenComp === "editor"
                  ? isDark
                    ? "bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] text-purple-400"
                    : "bg-white shadow-lg text-purple-600"
                  : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <PanelLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Editor</span>
            </button>
            <button
              onClick={() => setFullscreenComp("chat")}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all flex items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${
                fullscreenComp === "chat"
                  ? isDark
                    ? "bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] text-purple-400"
                    : "bg-white shadow-lg text-purple-600"
                  : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <PanelRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Assistant</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all border ${isDark ? "bg-white/5 border-white/5 text-yellow-500" : "bg-white border-slate-200 text-purple-600 shadow-sm"}`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            <div
              className={`w-px h-5 sm:h-6 hidden xs:block ${isDark ? "bg-white/10" : "bg-slate-200"}`}
            />
            {status === "authenticated" ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  ref={userButtonRef}
                  onClick={toggleUserDropdown}
                  className="flex items-center gap-1 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all p-0.5"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 p-[1.5px]">
                    <div className="w-full h-full rounded-[6px] sm:rounded-[14px] bg-slate-950 flex items-center justify-center overflow-hidden">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-[10px] sm:text-sm font-black">
                          {getUserDisplayName().substring(0, 1).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="px-4 sm:px-6 py-1.5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
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
