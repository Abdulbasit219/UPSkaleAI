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
  Users,
  Building2,
  DollarSign,
  HelpCircle,
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
  const [isSpeaking, setIsSpeaking] = useState(false);

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
      className={`min-h-screen transition-colors duration-700 font-sans ${isDark ? "bg-[#09090b] text-white" : "bg-[#fcfaff] text-gray-900"}`}
    >
      <BackgroundPattern />

      {/* Professional AI Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 backdrop-blur-2xl ${isDark ? "bg-slate-950/60 border-white/10" : "bg-white/60 border-slate-200"}`}
      >
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left Section: Back + Branding */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push("/dashboardd")}
              className={`p-2 rounded-xl transition-all border ${isDark ? "hover:bg-white/5 border-white/10 text-gray-400 hover:text-white" : "hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900"}`}
              title="Return to Dashboard"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 transform hover:rotate-6 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold tracking-tight">CodeTwin</h1>
                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                  <span className="text-purple-500 font-bold">Workspace</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span className="flex items-center gap-1 font-bold">
                    <Cloud className="w-3 h-3 text-emerald-500" /> Cloud Synced
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section: Layout Toggles */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
            <button
              onClick={() => setFullscreenComp(null)}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${!fullscreenComp ? "bg-white dark:bg-white/10 shadow-sm text-purple-600 dark:text-purple-400" : "text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"}`}
            >
              <Layout className="w-4 h-4" />
              <span className="hidden lg:inline">Split</span>
            </button>
            <button
              onClick={() => setFullscreenComp("editor")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${fullscreenComp === "editor" ? "bg-white dark:bg-white/10 shadow-sm text-purple-600 dark:text-purple-400" : "text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"}`}
            >
              <PanelLeft className="w-4 h-4" />
              <span className="hidden lg:inline">Editor</span>
            </button>
            <button
              onClick={() => setFullscreenComp("chat")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${fullscreenComp === "chat" ? "bg-white dark:bg-white/10 shadow-sm text-purple-600 dark:text-purple-400" : "text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"}`}
            >
              <PanelRight className="w-4 h-4" />
              <span className="hidden lg:inline">Assistant</span>
            </button>
          </div>

          {/* Right Section: Actions + Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 mr-2 px-3 py-1.5 rounded-full bg-purple-500/5 border border-purple-500/10">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">
                AI Agent Online
              </span>
            </div>

            <div className="flex items-center gap-2 border-r border-slate-200 dark:border-white/10 pr-4 mr-2">
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`p-2.5 rounded-xl transition-all border ${isDark ? "bg-white/5 border-white/10 text-yellow-500 hover:bg-white/10" : "bg-white border-slate-200 text-purple-600 hover:bg-slate-50 shadow-sm"}`}
                title="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                className={`p-2.5 rounded-xl transition-all border ${isDark ? "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm"}`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Authentication / Profile Dropdown */}
            {status === "loading" ? (
              <div className="w-10 h-10 rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse" />
            ) : status === "authenticated" ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  ref={userButtonRef}
                  onClick={toggleUserDropdown}
                  className={`flex items-center gap-3 p-1 rounded-2xl transition-all border ${
                    isDark
                      ? "border-transparent hover:bg-white/5 hover:border-white/10"
                      : "border-transparent hover:bg-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="relative group">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 p-[2px] shadow-lg shadow-purple-500/10">
                      <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center overflow-hidden border border-white/10">
                        {session.user?.image ? (
                          <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-white text-xs font-bold">
                            {getUserDisplayName().substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-slate-950 rounded-full shadow-sm" />
                  </div>
                  <div className="hidden xl:block text-left">
                    <p
                      className={`text-xs font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {getUserDisplayName()}
                    </p>
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">
                      {session.user.role}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-3 w-64 backdrop-blur-2xl border rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200 z-[100] ${
                      isDark
                        ? "bg-slate-950/95 border-white/10 shadow-purple-500/10"
                        : "bg-white/95 border-slate-200 shadow-purple-500/5"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 border-b ${isDark ? "border-white/5" : "border-slate-100"}`}
                    >
                      <p
                        className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-950"}`}
                      >
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                      <div
                        className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadgeColor()}`}
                      >
                        {session.user.role}
                      </div>
                    </div>

                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all mx-2 rounded-xl ${
                            isDark
                              ? "text-gray-400 hover:text-white hover:bg-white/5"
                              : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                          }`}
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <div className="text-purple-500">{item.icon}</div>
                          {item.name}
                        </Link>
                      ))}

                      <div
                        className={`mx-4 my-2 border-t ${isDark ? "border-white/5" : "border-slate-100"}`}
                      />

                      <button
                        onClick={handleSignOut}
                        className={`w-[calc(100%-1rem)] flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-all mx-2 rounded-xl ${
                          isDark
                            ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            : "text-red-600 hover:text-red-700 hover:bg-red-50"
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-[4.5rem] pb-4 px-6 h-screen flex gap-6 overflow-hidden relative">
        {/* Editor Side */}
        <div
          className={`transition-all duration-500 flex flex-col min-w-0 ${fullscreenComp === "chat" ? "w-0 opacity-0 pointer-events-none -translate-x-full" : "flex-1"}`}
        >
          <div className="flex-1 min-h-0 bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl">
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
        </div>

        {/* Chat Side */}
        <div
          className={`transition-all duration-500 flex flex-col min-w-0 ${fullscreenComp === "editor" ? "w-0 opacity-0 pointer-events-none translate-x-full" : fullscreenComp === "chat" ? "flex-1" : "w-[450px]"}`}
        >
          <div className="flex-1 min-h-0">
            <CodeTwinChat
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              isLoading={isLoading}
              isDark={isDark}
              isSpeaking={isSpeaking}
              setIsSpeaking={setIsSpeaking}
              onToggleFullscreen={() =>
                setFullscreenComp(fullscreenComp === "chat" ? null : "chat")
              }
              isFullscreen={fullscreenComp === "chat"}
              className="h-full rounded-2xl shadow-xl border dark:border-white/10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
