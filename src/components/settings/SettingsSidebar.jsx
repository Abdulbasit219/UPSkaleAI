import React from "react";
import { ChevronRight } from "lucide-react";

export default function SettingsSidebar({
  tabs,
  activeTab,
  onTabChange,
  isDark,
  onLogout,
}) {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-2 sticky top-24 ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}
    >
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                : `${
                    isDark
                      ? "text-gray-400 hover:text-white hover:bg-slate-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                  }`
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <ChevronRight className="w-4 h-4 ml-auto" />
            )}
          </button>
        ))}
      </nav>

      {/* {onLogout && (
        <div
          className={`mt-4 pt-4 border-t ${
            isDark ? "border-purple-500/20" : "border-purple-300/20"
          }`}
        >
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              isDark
                ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                : "text-red-500 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            {onLogout.icon}
            <span>Log Out</span>
          </button>
        </div>
      )} */}
    </div>
  );
}
