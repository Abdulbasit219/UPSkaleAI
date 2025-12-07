import React from "react";
import {
  Mail,
  Check,
  Languages,
  Clock,
  AlertCircle,
  Trash2,
} from "lucide-react";
import SettingsCard from "../SettingsCard";
import InputField from "../InputField";
import Button from "../Button";

/**
 * Account tab component
 */
export default function AccountTab({ isDark, userData }) {
  return (
    <>
      {/* Email Address */}
      <SettingsCard title="Email Address" isDark={isDark}>
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Current Email
            </label>
            <div className="flex gap-3">
              <InputField
                type="email"
                icon={Mail}
                defaultValue={userData.email}
                isDark={isDark}
                className="flex-1"
              />
              <Button variant="primary">Update</Button>
            </div>
            <p
              className={`text-sm mt-2 flex items-center gap-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <Check className="w-4 h-4 text-green-400" />
              Email verified
            </p>
          </div>
        </div>
      </SettingsCard>

      {/* Language & Region */}
      <SettingsCard title="Language & Region" isDark={isDark}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Language
            </label>
            <div className="relative">
              <Languages
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <select
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors appearance-none ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Timezone
            </label>
            <div className="relative">
              <Clock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <select
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors appearance-none ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option>Pacific Time (PT)</option>
                <option>Eastern Time (ET)</option>
                <option>Central Time (CT)</option>
                <option>Mountain Time (MT)</option>
              </select>
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* Danger Zone */}
      <SettingsCard
        title={
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            Danger Zone
          </div>
        }
        isDark={isDark}
        variant="danger"
      >
        <div className="space-y-4">
          <div
            className={`flex items-start justify-between p-4 rounded-lg border ${
              isDark
                ? "bg-red-500/5 border-red-500/20"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div>
              <div
                className={`font-semibold mb-1 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Delete Account
              </div>
              <div
                className={
                  isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                }
              >
                Permanently delete your account and all data
              </div>
            </div>
            <Button variant="danger" icon={Trash2}>
              Delete
            </Button>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}
