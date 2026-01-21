"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Eye,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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

import { fetchProfile } from "@/store/slices/profileSlice";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useSelector((state) => state.theme.mode);
  const profile = useSelector((state) => state.profile.data);

  const { data: session } = useSession();
  const user = session?.user;

  const isDark = theme === "dark";

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    if (user && !profile) {
      dispatch(fetchProfile());
    }
  }, [user, profile, dispatch]);

  /* ---------------- SIDEBAR TABS ---------------- */
  const tabs = [
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    {
      id: "account",
      icon: <SettingsIcon className="w-5 h-5" />,
      label: "Account",
    },
    { id: "security", icon: <Shield className="w-5 h-5" />, label: "Security" },
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
  ];

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  /* ---------------- TAB RENDER ---------------- */
  const renderTabContent = () => {
    const commonProps = { isDark };

    switch (activeTab) {
      case "profile":
        return <ProfileTab {...commonProps} userData={profile} />;

      case "account":
        return <AccountTab {...commonProps} userData={profile} />;

      case "security":
        return <SecurityTab {...commonProps} />;

      case "notifications":
        return <NotificationsTab {...commonProps} />;

      case "preferences":
        return <PreferencesTab {...commonProps} />;

      case "billing":
        return <BillingTab {...commonProps} />;

      case "privacy":
        return <PrivacyTab {...commonProps} />;

      default:
        return null;
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`min-h-screen pt-20 pb-12 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Settings</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Manage your account settings and preferences
          </p>
        </header>

        {/* Layout */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
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

          {/* Content */}
          <main className="lg:col-span-3 space-y-6">{renderTabContent()}</main>
        </div>
      </div>
    </div>
  );
}
