import React from "react";
import { User, Camera, Upload, MapPin, Globe } from "lucide-react";
import SettingsCard from "../SettingsCard";
import InputField from "../InputField";
import Button from "../Button";

/**
 * Profile tab component
 */
export default function ProfileTab({ isDark, userData, connectedAccounts }) {
  return (
    <>
      {/* Profile Picture */}
      <SettingsCard title="Profile Picture" isDark={isDark}>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button
              className={`absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                isDark ? "bg-slate-900/80" : "bg-white/90"
              }`}
            >
              <Camera
                className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-700"}`}
              />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" icon={Upload}>
                Upload New
              </Button>
              <Button variant="secondary" isDark={isDark}>
                Remove
              </Button>
            </div>
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Recommended: Square image, at least 400x400px
            </p>
          </div>
        </div>
      </SettingsCard>

      {/* Personal Information */}
      <SettingsCard title="Personal Information" isDark={isDark}>
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            defaultValue={userData.name}
            isDark={isDark}
          />
          <InputField
            label="Username"
            defaultValue={userData.username}
            isDark={isDark}
          />
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Bio
            </label>
            <textarea
              defaultValue={userData.bio}
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <InputField
            label="Location"
            icon={MapPin}
            defaultValue={userData.location}
            isDark={isDark}
          />
          <InputField
            label="Website"
            type="url"
            icon={Globe}
            defaultValue={userData.website}
            isDark={isDark}
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" isDark={isDark}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </SettingsCard>

      {/* Social Links */}
      <SettingsCard title="Social Links" isDark={isDark}>
        <div className="space-y-4">
          {connectedAccounts.map((account, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                isDark
                  ? "bg-slate-800/50 border-purple-500/10"
                  : "bg-gray-50/50 border-purple-300/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {account.icon}
                </div>
                <div>
                  <div
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {account.platform}
                  </div>
                  {account.connected ? (
                    <div
                      className={
                        isDark
                          ? "text-gray-400 text-sm"
                          : "text-gray-500 text-sm"
                      }
                    >
                      {account.username}
                    </div>
                  ) : (
                    <div
                      className={
                        isDark
                          ? "text-gray-500 text-sm"
                          : "text-gray-400 text-sm"
                      }
                    >
                      Not connected
                    </div>
                  )}
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-all border ${
                  account.connected
                    ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                    : "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                }`}
              >
                {account.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </SettingsCard>
    </>
  );
}
