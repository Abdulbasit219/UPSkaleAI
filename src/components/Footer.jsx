"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
const Footer = () => {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <footer
      className={`py-12 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 border-purple-500/20"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 border-purple-300/20"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                SkillBridge
              </span>
            </div>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Bridge the gap between learning and earning with AI-powered career
              growth.
            </p>
          </div>
          <div>
            <h4
              className={`font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Product
            </h4>
            <ul
              className={`space-y-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <li>
                <a
                  href="/features"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Roadmaps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Opportunities
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className={`font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Company
            </h4>
            <ul
              className={`space-y-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <li>
                <a
                  href="/features"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                How it Works
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className={`font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Legal
            </h4>
            <ul
              className={`space-y-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <li>
                <a
                  href="#"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`pt-8 border-t text-center text-sm ${
            isDark
              ? "border-purple-500/20 text-gray-400"
              : "border-purple-300/20 text-gray-600"
          }`}
        >
          <p>&copy; 2025 SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
