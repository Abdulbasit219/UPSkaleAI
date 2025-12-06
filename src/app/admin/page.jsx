"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "@/components/admin/StatsCard";
import PageHeader from "@/components/admin/PageHeader";
import AdminTable from "@/components/admin/AdminTable";

export default function AdminDashboard() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    activeCompanies: 0,
    totalJobs: 0,
    pendingApprovals: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [jobTrendsData, setJobTrendsData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (response.ok) {
          const data = await response.json();
          setStatsData(data.stats);
          setUserGrowthData(data.userGrowthData || []);
          setJobTrendsData(data.jobTrendsData || []);
          setRecentActivity(data.recentActivity || []);
          setPendingApprovals(data.pendingApprovals || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: statsData.totalUsers.toLocaleString(),
      change: "+12%", // Keeping static for now as we don't have historical data for change yet
      trend: "up",
      icon: Users,
      color: "purple",
    },
    {
      label: "Active Companies",
      value: statsData.activeCompanies.toLocaleString(),
      change: "+5%",
      trend: "up",
      icon: Building2,
      color: "pink",
    },
    {
      label: "Total Jobs",
      value: statsData.totalJobs.toLocaleString(),
      change: "+18%",
      trend: "up",
      icon: Briefcase,
      color: "blue",
    },
    {
      label: "Pending Approvals",
      value: statsData.pendingApprovals.toLocaleString(),
      change: "-2%",
      trend: "down",
      icon: Clock,
      color: "yellow",
    },
  ];

  const pendingColumns = [
    { header: "Name/Title", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "Date", accessor: "date" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isDark
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const pendingActions = (row) => (
    <div className="flex items-center justify-end gap-2">
      <button
        className={`p-1.5 rounded-lg transition-colors ${
          isDark
            ? "hover:bg-green-500/20 text-green-400"
            : "hover:bg-green-100 text-green-600"
        }`}
      >
        <CheckCircle className="w-4 h-4" />
      </button>
      <button
        className={`p-1.5 rounded-lg transition-colors ${
          isDark
            ? "hover:bg-red-500/20 text-red-400"
            : "hover:bg-red-100 text-red-600"
        }`}
      >
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back, Admin! Here's what's happening today."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User & Company Growth */}
        <div
          className={`rounded-xl border backdrop-blur-xl p-6 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Growth Trends
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#e5e7eb"}
                />
                <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                    borderRadius: "8px",
                    color: isDark ? "#ffffff" : "#000000",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#a855f7"
                  strokeWidth={2}
                  name="Users"
                />
                {/* Companies line suppressed as we just have users for now in API */}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Posting Trends */}
        <div
          className={`rounded-xl border backdrop-blur-xl p-6 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Job Postings
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobTrendsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#e5e7eb"}
                />
                <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                    borderRadius: "8px",
                    color: isDark ? "#ffffff" : "#000000",
                  }}
                />
                <Bar dataKey="jobs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div
          className={`lg:col-span-1 rounded-xl border backdrop-blur-xl p-6 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {activity.user}
                    </p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {activity.action}
                    </p>
                    <p
                      className={`text-[10px] mt-1 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                No recent activity.
              </p>
            )}
          </div>
        </div>

        {/* Pending Approvals Table */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Pending Approvals
            </h3>
            <button className="text-sm text-purple-500 hover:text-purple-400 font-medium">
              View All
            </button>
          </div>
          <AdminTable
            columns={pendingColumns}
            data={pendingApprovals}
            actions={pendingActions}
          />
        </div>
      </div>
    </div>
  );
}
