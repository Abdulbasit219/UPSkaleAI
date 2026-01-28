"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bot, Sparkles, X } from "lucide-react";
import { useSelector } from "react-redux";

export default function CodeTwinWidget() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const themeMode = useSelector((state) => state.theme.mode);
  const isDark = themeMode === "dark";

  useEffect(() => {
    if (pathname?.startsWith("/code-twin") || pathname?.startsWith("/admin")) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 group">
      <div
        className={`transition-all duration-500 transform origin-bottom-right ${
          showTooltip || isHovered
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`relative px-4 py-2.5 rounded-2xl shadow-xl mb-2 max-w-[200px] text-xs font-medium leading-relaxed ${
            isDark
              ? "bg-slate-900 border border-purple-500/30 text-white"
              : "bg-white border border-purple-100 text-slate-700"
          }`}
        >
          <span className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent block mb-0.5">
            Need coding help?
          </span>
          I can debug, refactor & explain code instantly!
          {/* Arrow */}
          <div
            className={`absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 border-b border-r ${
              isDark
                ? "bg-slate-900 border-purple-500/30"
                : "bg-white border-purple-100"
            }`}
          ></div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-1.5 -left-1.5 p-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => router.push("/code-twin")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group/btn"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-70 animate-ping duration-[2000ms]"></span>

        {/* Glow Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-md opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500"></div>

        {/* Button Content */}
        <div
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110 group-active/btn:scale-95 shadow-2xl ${
            isDark
              ? "bg-slate-950 border border-white/10"
              : "bg-white border border-white/50"
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>

          <div className="relative">
            <Bot
              className={`w-7 h-7 transition-colors duration-300 ${
                isHovered
                  ? "text-purple-500"
                  : isDark
                    ? "text-white"
                    : "text-slate-800"
              }`}
            />

            {/* Status Dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
