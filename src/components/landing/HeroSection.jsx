"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Play, Sparkles } from "lucide-react";
import Spotlight from "@/components/ui/Spotlight";
import { useSelector } from "react-redux";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? themeMode : "dark";
  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full  overflow-hidden min-h-[90vh] flex flex-col items-center justify-center ${
        isDark ? "bg-slate-950" : "bg-white"
      }`}
    >
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={isDark ? "white" : "#a855f7"}
      />

      {/* Grid Background Pattern */}
      <div
        className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none`}
      ></div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${isDark ? "#333" : "#e5e7eb"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />

      {/* Radial Gradient Mask for Grid */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
            : "bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
        }`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">
        {/* Floating Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 hover:scale-105 transition-transform cursor-default shadow-lg"
          style={{
            borderColor: isDark
              ? "rgba(168, 85, 247, 0.3)"
              : "rgba(168, 85, 247, 0.2)",
            backgroundColor: isDark
              ? "rgba(168, 85, 247, 0.1)"
              : "rgba(168, 85, 247, 0.05)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-purple-300" : "text-purple-600"}`}
          >
            AI-Powered Career Ecosystem
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          <span
            className={`block mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Master Your Career
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x bg-[length:200%_auto]">
            In The Age of AI
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Stop guessing your next move. Let our{" "}
          <span className="text-purple-500 font-semibold">AI Digital Twin</span>{" "}
          map your skills, build your portfolio, and connect you directly with
          top-tier recruiters.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <Link
            href="/signup"
            className={`group ${!isDark ? "border border-black" : ""} relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] flex items-center gap-2 overflow-hidden"
          `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Start Free Assessment</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#how-it-works"
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-sm ${
              isDark
                ? "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                : "bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Watch Demo</span>
          </Link>
        </div>

        {/* Stats / Social Proof - Minimalist */}
        {/* <div className="mt-20 pt-10 border-t border-white/5 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Active Learners", value: "10K+" },
              { label: "Career Paths", value: "500+" },
              { label: "Success Rate", value: "95%" },
              { label: "Hiring Partners", value: "200+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {stat.value}
                </span>
                <span
                  className={`text-xs uppercase tracking-widest font-medium mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Bottom Fade */}
      <div
        className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t z-20 ${
          isDark
            ? "from-slate-950 to-transparent"
            : "from-gray-50 to-transparent"
        }`}
      ></div>
    </div>
  );
}
