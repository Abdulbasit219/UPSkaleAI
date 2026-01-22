import React, { useEffect, useState } from "react";
import { Mail, Bell, BookOpen, Shield } from "lucide-react";
import SettingsCard from "../SettingsCard";
import ToggleSwitch from "../ToggleSwitch";
import axios from "axios";

export default function NotificationsTab({ isDark }) {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    channels: {
      email: true,
      push: true,
    },
    learning: {
      courseUpdates: true,
      newContent: true,
    },
    account: {
      securityAlerts: true,
      loginAttempts: true,
    },
  });

  const fetchSettings = async () => {
    try {
      const res = await axios.get("/api/user/notifications");
      if (res.data) {
        setSettings({
          channels: {
            email: res.data.channels?.email ?? true,
            push: res.data.channels?.push ?? true,
          },
          learning: {
            courseUpdates: res.data.learning?.courseUpdates ?? true,
            newContent: res.data.learning?.newContent ?? true,
          },
          account: {
            securityAlerts: res.data.account?.securityAlerts ?? true,
            loginAttempts: res.data.account?.loginAttempts ?? true,
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (path) => {
    const updated = structuredClone(settings);

    const keys = path.split(".");
    updated[keys[0]][keys[1]] = !updated[keys[0]][keys[1]];

    setSettings(updated);

    try {
      await axios.put("/api/user/notifications", updated);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) {
    return <div className="p-6">Loading notification settings...</div>;
  }

  return (
    <>
      {/* CHANNELS */}
      <SettingsCard title="Notification Channels" isDark={isDark}>
        <ToggleRow
          icon={<Mail />}
          title="Email Notifications"
          enabled={settings.channels.email}
          onToggle={() => updateSetting("channels.email")}
          isDark={isDark}
        />

        <ToggleRow
          icon={<Bell />}
          title="Push Notifications"
          enabled={settings.channels.push}
          onToggle={() => updateSetting("channels.push")}
          isDark={isDark}
        />
      </SettingsCard>

      {/* LEARNING */}
      <SettingsCard title="Learning Notifications" isDark={isDark}>
        <ToggleRow
          icon={<BookOpen />}
          title="Course Updates"
          enabled={settings.learning.courseUpdates}
          onToggle={() => updateSetting("learning.courseUpdates")}
          isDark={isDark}
        />

        <ToggleRow
          icon={<BookOpen />}
          title="New Content"
          enabled={settings.learning.newContent}
          onToggle={() => updateSetting("learning.newContent")}
          isDark={isDark}
        />
      </SettingsCard>

      {/* ACCOUNT */}
      <SettingsCard title="Account Activity" isDark={isDark}>
        <ToggleRow
          icon={<Shield />}
          title="Security Alerts"
          enabled={settings.account.securityAlerts}
          onToggle={() => updateSetting("account.securityAlerts")}
          isDark={isDark}
        />

        <ToggleRow
          icon={<Shield />}
          title="Login Attempts"
          enabled={settings.account.loginAttempts}
          onToggle={() => updateSetting("account.loginAttempts")}
          isDark={isDark}
        />
      </SettingsCard>
    </>
  );
}

function ToggleRow({ icon, title, enabled, onToggle, isDark }) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border mb-3 ${
        isDark
          ? "bg-slate-800/50 border-purple-500/10"
          : "bg-gray-50/50 border-purple-300/10"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span
          className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </span>
      </div>
      <ToggleSwitch enabled={enabled} onChange={onToggle} isDark={isDark} />
    </div>
  );
}
