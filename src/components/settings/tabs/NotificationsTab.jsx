import React, { useState } from "react";
import { Mail, Bell } from "lucide-react";
import SettingsCard from "../SettingsCard";
import ToggleSwitch from "../ToggleSwitch";

/**
 * Notifications tab component
 */
export default function NotificationsTab({ isDark, notificationSettings }) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <>
      {/* Notification Channels */}
      <SettingsCard title="Notification Channels" isDark={isDark}>
        <div className="space-y-4">
          <div
            className={`flex items-center justify-between p-4 rounded-lg border ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10"
                : "bg-gray-50/50 border-purple-300/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail
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
                  Email Notifications
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  Receive notifications via email
                </div>
              </div>
            </div>
            <ToggleSwitch
              enabled={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
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
              <Bell
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
                  Push Notifications
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  Receive push notifications on your devices
                </div>
              </div>
            </div>
            <ToggleSwitch
              enabled={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
              isDark={isDark}
            />
          </div>
        </div>
      </SettingsCard>

      {/* Notification Preferences */}
      <SettingsCard title="Notification Preferences" isDark={isDark}>
        <div className="space-y-6">
          {notificationSettings.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-gray-50/50 border-purple-300/10"
                    }`}
                  >
                    <div>
                      <div
                        className={`font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={item.enabled}
                      onChange={() => console.log("Toggle", item.id)}
                      isDark={isDark}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>
    </>
  );
}
