"use client";
import React from "react";
import { Home, Search, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
export default function Error404() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  return (
    <div
      className={`min-h-screen pt-18 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      {/* Floating Elements */}
      <div
        className={`absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-pulse ${
          isDark ? "bg-purple-500/10" : "bg-purple-500/5"
        }`}
      />
      <div
        className={`absolute bottom-20 right-10 w-32 h-32 rounded-full blur-xl animate-pulse delay-300 ${
          isDark ? "bg-pink-500/10" : "bg-pink-500/5"
        }`}
      />
      <div
        className={`absolute top-1/3 right-1/4 w-16 h-16 rounded-full blur-xl animate-pulse delay-700 ${
          isDark ? "bg-purple-500/10" : "bg-purple-500/5"
        }`}
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              UpSkaleAI
            </span>
          </div>
        </div>

        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              404
            </span>
          </h1>

          {/* Alert Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`w-24 h-24 backdrop-blur-sm border-2 rounded-full flex items-center justify-center ${
                isDark
                  ? "bg-slate-900/80 border-purple-500/30"
                  : "bg-white/80 border-purple-300/30"
              }`}
            >
              <AlertCircle
                className={`w-12 h-12 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Page Not Found
        </h2>
        <p
          className={`text-lg mb-8 max-w-md mx-auto ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Oops! The page you're looking for seems to have wandered off the
          learning path. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/"
            className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </a>

          <button
            className={`px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 hover:scale-105 ${
              isDark
                ? "bg-slate-800/50 border border-purple-500/30 text-white hover:bg-slate-800 hover:border-purple-500/50"
                : "bg-white/80 border border-purple-300/30 text-gray-700 hover:bg-white hover:border-purple-300/50"
            }`}
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>

        {/* Quick Links */}
        <div
          className={`backdrop-blur-xl border rounded-2xl p-8 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`font-semibold mb-4 text-lg ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/dashboard"
              className={`px-4 py-3 border rounded-xl transition-all text-sm font-medium ${
                isDark
                  ? "bg-slate-800/50 border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-500/40"
                  : "bg-gray-50/50 border-purple-300/20 text-gray-600 hover:text-gray-900 hover:border-purple-300/40"
              }`}
            >
              Dashboard
            </a>
            <a
              href="/career-path"
              className={`px-4 py-3 border rounded-xl transition-all text-sm font-medium ${
                isDark
                  ? "bg-slate-800/50 border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-500/40"
                  : "bg-gray-50/50 border-purple-300/20 text-gray-600 hover:text-gray-900 hover:border-purple-300/40"
              }`}
            >
              Career Paths
            </a>
            <a
              href="/opportunities"
              className={`px-4 py-3 border rounded-xl transition-all text-sm font-medium ${
                isDark
                  ? "bg-slate-800/50 border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-500/40"
                  : "bg-gray-50/50 border-purple-300/20 text-gray-600 hover:text-gray-900 hover:border-purple-300/40"
              }`}
            >
              Opportunities
            </a>
            <a
              href="/portfolio"
              className={`px-4 py-3 border rounded-xl transition-all text-sm font-medium ${
                isDark
                  ? "bg-slate-800/50 border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-500/40"
                  : "bg-gray-50/50 border-purple-300/20 text-gray-600 hover:text-gray-900 hover:border-purple-300/40"
              }`}
            >
              Portfolio
            </a>
          </div>
        </div>

        {/* Help Text */}
        <p
          className={`text-sm mt-8 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Need help?{" "}
          <a
            href="/contact"
            className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
