"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "@/components/company/DashboardHeader";
import StatsGrid from "@/components/company/StatsGrid";
import TabNavigation from "@/components/company/TabNavigation";
import OverviewTab from "@/components/company/OverviewTab";
import JobsTab from "@/components/company/JobsTab";
import ApplicationsTab from "@/components/company/ApplicationsTab";
import PostJobModal from "@/components/company/PostJobModal";

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-all duration-500 pt-18 ${
        isDark 
          ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-gray-200" 
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-800"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 ${
            isDark 
              ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20" 
              : "bg-gradient-to-br from-purple-400/15 to-blue-400/15"
          }`}
          style={{
            top: "10%",
            right: "10%",
          }}
        />
        <div
          className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] transition-all duration-1000 ${
            isDark 
              ? "bg-gradient-to-br from-pink-600/15 to-rose-600/15" 
              : "bg-gradient-to-br from-pink-400/10 to-rose-400/10"
          }`}
          style={{
            bottom: "10%",
            left: "10%",
          }}
        />
      </div>

      <div className="container mx-auto py-8 px-4 relative">
        <DashboardHeader 
          title="Company Dashboard"
          subtitle="Manage your job postings and applications"
          isDark={isDark}
        />

        <StatsGrid isDark={isDark} />

        <TabNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
        />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <OverviewTab 
              isDark={isDark}
              onPostJob={() => setIsPostJobModalOpen(true)}
              onViewApplications={() => setActiveTab("applications")}
            />
          )}

          {activeTab === "jobs" && (
            <JobsTab 
              isDark={isDark}
              onPostJob={() => setIsPostJobModalOpen(true)}
            />
          )}

          {activeTab === "applications" && (
            <ApplicationsTab isDark={isDark} />
          )}
        </div>
      </div>

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}
