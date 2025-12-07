"use client";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function UnauthorizedPage() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-purple-600/20" : "bg-purple-400/20"
          }`}
          style={{ top: "10%", right: "10%" }}
        ></div>
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-pink-600/20" : "bg-pink-400/20"
          }`}
          style={{ bottom: "10%", left: "10%" }}
        ></div>
      </div>

      <div className="text-center space-y-6 max-w-lg relative z-10">
        <div className="flex justify-center">
          <div
            className={`p-4 rounded-full backdrop-blur-sm border ${
              isDark
                ? "bg-red-500/10 border-red-500/30"
                : "bg-red-100 border-red-200"
            }`}
          >
            <ShieldAlert
              className={`w-16 h-16 ${
                isDark ? "text-red-400" : "text-red-500"
              }`}
            />
          </div>
        </div>

        <h1
          className={`text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Access Denied
        </h1>

        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          You don't have permission to access this page. This area is restricted
          to authorized users only.
        </p>

        <div
          className={`p-4 rounded-lg border ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/50 border-purple-300/20"
          }`}
        >
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            If you believe this is an error, please contact support or sign in
            with an authorized account.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            Go to Home
          </Link>
          <Link
            href="/sign-in"
            className={`px-6 py-3 rounded-lg font-semibold border transition-all hover:scale-105 ${
              isDark
                ? "bg-slate-800/50 border-purple-500/30 text-white hover:bg-slate-700"
                : "bg-white border-purple-300/30 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
