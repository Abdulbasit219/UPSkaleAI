"use client";

import React from "react";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";

export default function WelcomeHeader({ userData, isDark }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section */}
        <div>
          <h1
            className={`text-3xl lg:text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome back,
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {userData.name}
            </span>
            ! 👋
          </h1>

          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Link
            href="learning"
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            New Course
          </Link>
        </div>
      </div>
    </div>
  );
}
