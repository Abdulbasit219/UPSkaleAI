"use client";

import React from "react";
import { Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import SettingsCard from "../SettingsCard";
import ToggleSwitch from "../ToggleSwitch";
import { toggleTheme } from "@/store/slices/themeSlice";

export default function PreferencesTab({ isDark }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const isDarkMode = theme === "dark";

  return (
    <>
      {/* APPEARANCE */}
      <SettingsCard title="Appearance" isDark={isDark}>
        <PreferenceRow
          icon={<Moon />}
          title="Dark Mode"
          description="Use dark theme across the platform"
          enabled={isDarkMode}
          onToggle={() => dispatch(toggleTheme())}
          isDark={isDark}
        />
      </SettingsCard>

      {/* LEARNING */}
      <SettingsCard title="Learning Preferences" isDark={isDark}>
        <div className="grid md:grid-cols-2 gap-6">
          <SelectField
            label="Daily Goal"
            options={["30 minutes", "1 hour", "2 hours", "4 hours"]}
            isDark={isDark}
          />

          <SelectField
            label="Difficulty Level"
            options={["Beginner", "Intermediate", "Advanced"]}
            isDark={isDark}
          />
        </div>
      </SettingsCard>
    </>
  );
}

/* ---------- REUSABLE UI ---------- */

function PreferenceRow({
  icon,
  title,
  description,
  enabled,
  onToggle,
  isDark,
}) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border ${
        isDark
          ? "bg-slate-800/50 border-purple-500/10"
          : "bg-gray-50/50 border-purple-300/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={isDark ? "text-purple-400" : "text-purple-600"}>
          {icon}
        </span>
        <div>
          <div
            className={`font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </div>
          <div
            className={
              isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
            }
          >
            {description}
          </div>
        </div>
      </div>

      <ToggleSwitch enabled={enabled} onChange={onToggle} isDark={isDark} />
    </div>
  );
}

function SelectField({ label, options, isDark }) {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      <select
        className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:border-purple-500 transition ${
          isDark
            ? "bg-slate-800 border-slate-700 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
