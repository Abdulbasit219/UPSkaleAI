import React from "react";
import { Download, FileText, HelpCircle, ChevronRight } from "lucide-react";
import SettingsCard from "../SettingsCard";
import ToggleSwitch from "../ToggleSwitch";

export default function PrivacyTab({ isDark }) {
  const privacySettings = [
    { label: "Show learning progress to others", enabled: true },
    { label: "Show skills on public profile", enabled: true },
    { label: "Show projects portfolio", enabled: false },
    { label: "Show email to connections", enabled: false },
  ];

  return (
    <>
      {/* Profile Visibility */}
      <SettingsCard title="Profile Visibility" isDark={isDark}>
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg border ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10"
                : "bg-gray-50/50 border-purple-300/10"
            }`}
          >
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Who can see your profile?
            </label>
            <select
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>Public - Anyone can view</option>
              <option>Connections Only</option>
              <option>Private - Only Me</option>
            </select>
          </div>

          <div className="space-y-3">
            {privacySettings.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/10"
                    : "bg-gray-50/50 border-purple-300/10"
                }`}
              >
                <div
                  className={`font-medium ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.label}
                </div>
                <ToggleSwitch
                  enabled={item.enabled}
                  onChange={() => console.log("Toggle privacy setting", index)}
                  isDark={isDark}
                />
              </div>
            ))}
          </div>
        </div>
      </SettingsCard>

    </>
  );
}







      {/* Data & Privacy */}
      {/* <SettingsCard title="Data & Privacy" isDark={isDark}>
        <div className="space-y-4">
          <button
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <Download
                className={`w-5 h-5 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <div>
                <div
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Download Your Data
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  Get a copy of your SkillBridge data
                </div>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </button>

          <button
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText
                className={`w-5 h-5 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <div>
                <div
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Privacy Policy
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  Learn how we protect your data
                </div>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </button>

          <button
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <HelpCircle
                className={`w-5 h-5 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <div>
                <div
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Help & Support
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  Get help with privacy settings
                </div>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </SettingsCard> */}