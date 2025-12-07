import React, { useState } from "react";
import { Moon, Volume2 } from "lucide-react";
import SettingsCard from "../SettingsCard";
import ToggleSwitch from "../ToggleSwitch";

/**
 * Preferences tab component
 */
export default function PreferencesTab({ isDark }) {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <>
      {/* Appearance */}
      <SettingsCard title="Appearance" isDark={isDark}>
        <div className="space-y-4">
          <div
            className={`flex items-center justify-between p-4 rounded-lg border ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10"
                : "bg-gray-50/50 border-purple-300/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <Moon
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
                  Dark Mode
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  Use dark theme across the platform
                </div>
              </div>
            </div>
            <ToggleSwitch
              enabled={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              isDark={isDark}
            />
          </div>

          <div
            className={`flex items-center justify-between p-4 rounded-lg border ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10"
                : "bg-gray-50/50 border-purple-300/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <Volume2
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
                  Sound Effects
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  Play sounds for interactions
                </div>
              </div>
            </div>
            <ToggleSwitch
              enabled={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
              isDark={isDark}
            />
          </div>
        </div>
      </SettingsCard>

      {/* Learning Preferences */}
      <SettingsCard title="Learning Preferences" isDark={isDark}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Daily Goal
            </label>
            <select
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
            </select>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Difficulty Level
            </label>
            <select
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}
