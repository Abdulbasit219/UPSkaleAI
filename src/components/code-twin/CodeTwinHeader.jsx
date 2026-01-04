"use client";
import React from "react";
import { Cpu } from "lucide-react";

const CodeTwinHeader = ({ isDark }) => {
  return (
    <div className="text-center mb-12">
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 backdrop-blur-md animate-fade-in ${
          isDark
            ? "bg-purple-500/10 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            : "bg-purple-100/50 border-purple-300/30"
        }`}
      >
        <Cpu
          className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"} animate-pulse`}
        />
        <span
          className={`text-sm font-medium tracking-wide ${isDark ? "text-purple-300" : "text-purple-700"}`}
        >
          Next-Gen AI Coding Mentor
        </span>
      </div>

      <h1
        className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Meet
        <span className="relative inline-block ml-3">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
            CodeTwin
          </span>
          <span
            className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-50`}
          ></span>
        </span>
      </h1>

      <p
        className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        Your elite AI coding partner designed to help you master algorithms,
        architect complex systems, and think like a senior engineer.
      </p>
    </div>
  );
};

export default CodeTwinHeader;
