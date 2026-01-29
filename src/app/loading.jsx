"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
export default function Loading() {
  const [progress, setProgress] = React.useState(0);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}
    >
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            UpSkaleAI
          </h1>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-80 rounded-full h-2 ${
            isDark ? "bg-slate-800" : "bg-gray-300"
          }`}
        >
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Preparing your career journey... {Math.min(progress, 100).toFixed(0)}%
        </p>
      </div>
    </div>
  );
}
