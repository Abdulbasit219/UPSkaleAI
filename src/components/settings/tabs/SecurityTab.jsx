import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Key,
  Check,
  Smartphone,
  Monitor,
} from "lucide-react";
import SettingsCard from "../SettingsCard";
import Button from "../Button";
import ToggleSwitch from "../ToggleSwitch";

/**
 * Security tab component
 */
export default function SecurityTab({ isDark, sessions }) {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <>
      {/* Change Password */}
      <SettingsCard title="Change Password" isDark={isDark}>
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Current Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              New Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>
        <Button variant="primary" className="mt-6">
          Update Password
        </Button>
      </SettingsCard>

      {/* Two-Factor Authentication */}
      <SettingsCard title="Two-Factor Authentication" isDark={isDark}>
        <div
          className={`flex items-start justify-between p-4 rounded-lg border ${
            isDark
              ? "bg-slate-800/50 border-purple-500/10"
              : "bg-gray-50/50 border-purple-300/10"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isDark
                  ? "bg-purple-500/10 text-purple-400"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div
                className={`font-semibold mb-1 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Authenticator App
              </div>
              <div
                className={
                  isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                }
              >
                Use an authenticator app to generate codes
              </div>
              {twoFactorEnabled && (
                <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                  <Check className="w-4 h-4" />
                  Enabled
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all border ${
              twoFactorEnabled
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
            }`}
          >
            {twoFactorEnabled ? "Enabled" : "Enable"}
          </button>
        </div>
      </SettingsCard>

      {/* Active Sessions */}
      <SettingsCard title="Active Sessions" isDark={isDark}>
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <div
              key={index}
              className={`flex items-start justify-between p-4 rounded-lg border ${
                isDark
                  ? "bg-slate-800/50 border-purple-500/10"
                  : "bg-gray-50/50 border-purple-300/10"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0 ${
                    isDark ? "bg-purple-500/10" : "bg-purple-100"
                  }`}
                >
                  {session.device.includes("iPhone") ||
                  session.device.includes("iPad") ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <Monitor className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {session.device}
                    </div>
                    {session.current && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full border ${
                          isDark
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-green-100 text-green-700 border-green-200"
                        }`}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <div
                    className={
                      isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                    }
                  >
                    {session.location}
                  </div>
                  <div
                    className={
                      isDark
                        ? "text-gray-500 text-xs mt-1"
                        : "text-gray-400 text-xs mt-1"
                    }
                  >
                    {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.current && (
                <button
                  className={`text-sm font-semibold ${
                    isDark
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-500 hover:text-red-600"
                  }`}
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </SettingsCard>
    </>
  );
}
