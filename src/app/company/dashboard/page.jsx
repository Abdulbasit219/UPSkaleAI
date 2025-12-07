"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    applicationsThisWeek: 0,
    interviewsScheduled: 0,
    hiredThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/company/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect if not authenticated or not a company user
    if (status === "unauthenticated") {
      router.push("/sign-in");
    } else if (
      status === "authenticated" &&
      session?.user?.role !== "Company"
    ) {
      router.push("/unauthorized");
    } else if (
      status === "authenticated" &&
      session?.user?.role === "Company"
    ) {
      // Fetch stats when authenticated as company
      fetchStats();
    }
  }, [status, session, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-950" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

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
          title={
            session?.user?.role === "Company"
              ? `${session?.user?.name || "Company"} Dashboard`
              : "Company Dashboard"
          }
          subtitle="Manage your job postings and applications"
          isDark={isDark}
          session={session}
          stats={stats}
        />

        <StatsGrid isDark={isDark} stats={stats} />

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

          {activeTab === "applications" && <ApplicationsTab isDark={isDark} />}
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
