"use client";

import { Lock } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function PrivateProfileUI() {
  const isDark = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDark ? "bg-[#0f0520] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-lg w-full p-8 rounded-2xl text-center ${
          isDark
            ? "bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent border border-purple-500/30"
            : "bg-white shadow-xl"
        }`}
      >
        <div className="flex justify-center mb-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
              isDark
                ? "bg-purple-600/20 border border-purple-500/30"
                : "bg-purple-100"
            }`}
          >
            <Lock/>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3">This Profile Is Private</h1>

        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          The owner of this profile has chosen to keep their information
          private. You dont have permission to view this profile at the moment.
        </p>
      </div>
    </div>
  );
}
