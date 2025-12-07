"use client";
import React, { useState, useMemo } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Eye,
  Settings as SettingsIcon,
  LogOut,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  SettingsSidebar,
  ProfileTab,
  AccountTab,
  SecurityTab,
  NotificationsTab,
  PreferencesTab,
  BillingTab,
  PrivacyTab,
} from "@/components/settings";

/**
 * Settings Page
 */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  // Memoized user data
  const userData = useMemo(
    () => ({
      name: "Ali",
      email: "ali@example.com",
      username: "ali",
      bio: "Full-stack developer passionate about building scalable applications",
      location: "Karachi, Pakistan",
      website: "https://ali.dev",
      phone: "+1 (555) 123-4567",
      timezone: "Pakistan Standard Time (PKT)",
      language: "English (US)",
    }),
    []
  );

  // Memoized tabs configuration
  const tabs = useMemo(
    () => [
      { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
      {
        id: "account",
        icon: <SettingsIcon className="w-5 h-5" />,
        label: "Account",
      },
      {
        id: "security",
        icon: <Shield className="w-5 h-5" />,
        label: "Security",
      },
      {
        id: "notifications",
        icon: <Bell className="w-5 h-5" />,
        label: "Notifications",
      },
      {
        id: "preferences",
        icon: <Palette className="w-5 h-5" />,
        label: "Preferences",
      },
      {
        id: "billing",
        icon: <CreditCard className="w-5 h-5" />,
        label: "Billing",
      },
      { id: "privacy", icon: <Eye className="w-5 h-5" />, label: "Privacy" },
    ],
    []
  );

  // Memoized notification settings
  const notificationSettings = useMemo(
    () => [
      {
        category: "Learning Updates",
        items: [
          {
            id: "course-updates",
            label: "Course updates and announcements",
            enabled: true,
          },
          { id: "new-content", label: "New content available", enabled: true },
          {
            id: "assignment-reminders",
            label: "Assignment reminders",
            enabled: true,
          },
        ],
      },
      {
        category: "Community",
        items: [
          { id: "messages", label: "Direct messages", enabled: true },
          { id: "comments", label: "Comments on your posts", enabled: true },
          { id: "mentions", label: "Mentions and tags", enabled: false },
        ],
      },
      {
        category: "Account Activity",
        items: [
          { id: "security-alerts", label: "Security alerts", enabled: true },
          { id: "login-attempts", label: "Login attempts", enabled: true },
          { id: "account-changes", label: "Account changes", enabled: true },
        ],
      },
    ],
    []
  );

  // Memoized connected accounts
  const connectedAccounts = useMemo(
    () => [
      {
        platform: "GitHub",
        icon: <Github className="w-5 h-5" />,
        connected: true,
        username: "@ali",
      },
      {
        platform: "LinkedIn",
        icon: <Linkedin className="w-5 h-5" />,
        connected: true,
        username: "Ali",
      },
      {
        platform: "Twitter",
        icon: <Twitter className="w-5 h-5" />,
        connected: false,
        username: null,
      },
    ],
    []
  );

  // Memoized sessions
  const sessions = useMemo(
    () => [
      {
        device: "MacBook Pro",
        location: "Karachi, Pakistan",
        lastActive: "Active now",
        current: true,
      },
      {
        device: "iPhone 14",
        location: "Karachi, Pakistan",
        lastActive: "2 hours ago",
        current: false,
      },
      {
        device: "Chrome on Windows",
        location: "Karachi, Pakistan",
        lastActive: "3 days ago",
        current: false,
      },
    ],
    []
  );

  // Handle logout
  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout logic here
  };

  // Render active tab content
  const renderTabContent = () => {
    const tabProps = { isDark };

    switch (activeTab) {
      case "profile":
        return (
          <ProfileTab
            {...tabProps}
            userData={userData}
            connectedAccounts={connectedAccounts}
          />
        );
      case "account":
        return <AccountTab {...tabProps} userData={userData} />;
      case "security":
        return <SecurityTab {...tabProps} sessions={sessions} />;
      case "notifications":
        return (
          <NotificationsTab
            {...tabProps}
            notificationSettings={notificationSettings}
          />
        );
      case "preferences":
        return <PreferencesTab {...tabProps} />;
      case "billing":
        return <BillingTab {...tabProps} />;
      case "privacy":
        return <PrivacyTab {...tabProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 pb-12 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="mb-8">
          <h1
            className={`text-3xl lg:text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Settings
          </h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Manage your account settings and preferences
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <SettingsSidebar
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isDark={isDark}
              onLogout={{
                icon: <LogOut className="w-5 h-5" />,
                action: handleLogout,
              }}
            />
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-3 space-y-6">{renderTabContent()}</main>
        </div>
      </div>
    </div>
  );
}
