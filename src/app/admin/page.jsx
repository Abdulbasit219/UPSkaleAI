"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
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

// Mock Data
const stats = [
  {
    name: "Total Users",
    value: "12,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "purple",
  },
  {
    name: "Active Companies",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Building2,
    color: "pink",
  },
  {
    name: "Total Jobs",
    value: "3,456",
    change: "+15.3%",
    trend: "up",
    icon: Briefcase,
    color: "blue",
  },
  {
    name: "Pending Approvals",
    value: "23",
    change: "-5.1%",
    trend: "down",
    icon: Clock,
    color: "yellow",
  },
];

const userGrowthData = [
  { month: "Jan", users: 8500, companies: 850 },
  { month: "Feb", users: 9200, companies: 920 },
  { month: "Mar", users: 9800, companies: 980 },
  { month: "Apr", users: 10500, companies: 1050 },
  { month: "May", users: 11200, companies: 1120 },
  { month: "Jun", users: 12543, companies: 1234 },
];

const jobPostingData = [
  { month: "Jan", jobs: 2100 },
  { month: "Feb", jobs: 2350 },
  { month: "Mar", jobs: 2600 },
  { month: "Apr", jobs: 2900 },
  { month: "May", jobs: 3200 },
  { month: "Jun", jobs: 3456 },
];

const categoryData = [
  { name: "Technology", value: 1234, color: "#a855f7" },
  { name: "Marketing", value: 856, color: "#ec4899" },
  { name: "Design", value: 634, color: "#3b82f6" },
  { name: "Sales", value: 432, color: "#22c55e" },
  { name: "Other", value: 300, color: "#eab308" },
];

const recentActivities = [
  {
    id: 1,
    type: "user",
    action: "New user registered",
    user: "John Doe",
    time: "2 minutes ago",
    icon: Users,
    color: "purple",
  },
  {
    id: 2,
    type: "company",
    action: "Company pending approval",
    user: "TechCorp Inc.",
    time: "15 minutes ago",
    icon: Building2,
    color: "pink",
  },
  {
    id: 3,
    type: "job",
    action: "New job posted",
    user: "Senior Developer at Google",
    time: "1 hour ago",
    icon: Briefcase,
    color: "blue",
  },
  {
    id: 4,
    type: "report",
    action: "User reported",
    user: "Spam account flagged",
    time: "2 hours ago",
    icon: AlertCircle,
    color: "red",
  },
];

const pendingApprovals = [
  {
    id: 1,
    type: "Company",
    name: "TechVision Solutions",
    submittedBy: "Sarah Johnson",
    date: "2024-12-02",
    status: "pending",
  },
  {
    id: 2,
    type: "Job Post",
    name: "Senior React Developer",
    submittedBy: "Microsoft",
    date: "2024-12-02",
    status: "pending",
  },
  {
    id: 3,
    type: "Company",
    name: "Digital Innovations Ltd",
    submittedBy: "Mike Chen",
    date: "2024-12-01",
    status: "pending",
  },
];

export default function AdminDashboard() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        bg: isDark ? "bg-purple-500/20" : "bg-purple-100",
        text: "text-purple-500",
        border: isDark ? "border-purple-500/30" : "border-purple-300",
      },
      pink: {
        bg: isDark ? "bg-pink-500/20" : "bg-pink-100",
        text: "text-pink-500",
        border: isDark ? "border-pink-500/30" : "border-pink-300",
      },
      blue: {
        bg: isDark ? "bg-blue-500/20" : "bg-blue-100",
        text: "text-blue-500",
        border: isDark ? "border-blue-500/30" : "border-blue-300",
      },
      yellow: {
        bg: isDark ? "bg-yellow-500/20" : "bg-yellow-100",
        text: "text-yellow-500",
        border: isDark ? "border-yellow-500/30" : "border-yellow-300",
      },
      red: {
        bg: isDark ? "bg-red-500/20" : "bg-red-100",
        text: "text-red-500",
        border: isDark ? "border-red-500/30" : "border-red-300",
      },
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1
          className={`text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Dashboard Overview
        </h1>
        <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const colors = getColorClasses(stat.color);
          return (
            <div
              key={stat.name}
              className={`relative overflow-hidden rounded-xl border backdrop-blur-xl p-6 transition-all hover:scale-105 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.name}
                  </p>
                  <p
                    className={`mt-2 text-3xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      vs last month
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}
                >
                  <stat.icon className={`w-8 h-8 ${colors.text}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
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
            User & Company Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
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
              <Line
                type="monotone"
                dataKey="companies"
                stroke="#ec4899"
                strokeWidth={2}
                name="Companies"
              />
            </LineChart>
          </ResponsiveContainer>
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
            Job Posting Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobPostingData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                  borderRadius: "8px",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
              <Bar dataKey="jobs" fill="#3b82f6" name="Job Posts" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row - Category Distribution & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
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
            Jobs by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                  borderRadius: "8px",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div
          className={`lg:col-span-2 rounded-xl border backdrop-blur-xl p-6 ${
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
            {recentActivities.map((activity) => {
              const colors = getColorClasses(activity.color);
              return (
                <div
                  key={activity.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10"
                      : "bg-gray-50 border-purple-300/10"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}
                  >
                    <activity.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {activity.action}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {activity.user}
                    </p>
                  </div>
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pending Approvals Table */}
      <div
        className={`rounded-xl border backdrop-blur-xl p-6 ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Pending Approvals
          </h3>
          <button className="text-sm font-medium text-purple-500 hover:text-purple-600">
            View All
          </button>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? "border-purple-500/20" : "border-purple-300/20"
                }`}
              >
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Type
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Name
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Submitted By
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Date
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    isDark ? "border-purple-500/10" : "border-purple-300/10"
                  }`}
                >
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === "Company"
                          ? isDark
                            ? "bg-pink-500/20 text-pink-400"
                            : "bg-pink-100 text-pink-700"
                          : isDark
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-4 font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`py-4 px-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.submittedBy}
                  </td>
                  <td
                    className={`py-4 px-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.date}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
