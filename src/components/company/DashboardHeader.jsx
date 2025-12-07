import React from "react";
import { Sparkles, TrendingUp, Briefcase, Users } from "lucide-react";

const DashboardHeader = ({
  title,
  subtitle,
  isDark,
  isMobile,
  session,
  stats,
}) => {
  return (
    <div className="mb-6 md:mb-8">
      {/* Main Header with Icon */}
      <div className="flex items-center gap-3 md:gap-4 mb-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <div
              className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} bg-white rounded-lg flex items-center justify-center`}
            >
              <Sparkles
                className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-purple-500`}
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1
            className={`${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} font-extrabold mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient`}
          >
            {title}
          </h1>
          <p
            className={`${isMobile ? "text-sm" : "text-base md:text-lg"} ${isDark ? "text-gray-400" : "text-gray-600"} flex items-center gap-2`}
          >
            <span>{subtitle}</span>
          </p>
        </div>
      </div>

      {/* Enhanced Welcome Card with Stats Preview */}
      <div
        className={`relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.01] ${
          isDark
            ? "bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 border-purple-500/30 hover:border-purple-500/50 shadow-xl shadow-purple-500/10"
            : "bg-gradient-to-br from-white/90 via-white/80 to-purple-50/90 border-purple-300/40 hover:border-purple-400/60 shadow-xl shadow-purple-300/20"
        }`}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${
              isDark ? "bg-purple-600/20" : "bg-purple-400/20"
            } animate-pulse`}
          ></div>
          <div
            className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl ${
              isDark ? "bg-pink-600/20" : "bg-pink-400/20"
            } animate-pulse delay-1000`}
          ></div>
        </div>

        <div className="relative p-5 md:p-6">
          {/* Top Section - Welcome Message */}
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4 mb-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 mb-2">
                <h2
                  className={`${isMobile ? "text-xl" : "text-2xl md:text-3xl"} font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Welcome back, {session?.user?.name || "Company"}!
                </h2>
                <span className="text-2xl animate-wave">👋</span>
              </div>
              <p
                className={`${isMobile ? "text-xs" : "text-sm md:text-base"} ${isDark ? "text-gray-400" : "text-gray-600"} flex items-center gap-2 justify-center sm:justify-start`}
              >
                <TrendingUp className="w-4 h-4 text-green-500" />
                You have {stats?.activeJobs || 0} active jobs and{" "}
                {stats?.applicationsThisWeek || 0} new applications this week.
              </p>
            </div>
            <div
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-bold border-2 backdrop-blur-sm ${
                isDark
                  ? "bg-green-500/20 text-green-300 border-green-500/40 shadow-lg shadow-green-500/20"
                  : "bg-green-500/10 text-green-700 border-green-400/50 shadow-lg shadow-green-300/20"
              } animate-pulse-slow`}
            >
              ✓ Active
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              {
                label: "Total Jobs",
                value: stats?.totalJobs || 0,
                icon: Briefcase,
                color: "purple",
                gradient: "from-purple-500 to-purple-600",
              },
              {
                label: "Active Jobs",
                value: stats?.activeJobs || 0,
                icon: Sparkles,
                color: "blue",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                label: "Applications",
                value: stats?.totalApplications || 0,
                icon: Users,
                color: "pink",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                label: "This Week",
                value: stats?.applicationsThisWeek || 0,
                icon: TrendingUp,
                color: "green",
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-3 md:p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/20"
                      : "bg-white/60 border-purple-300/30 hover:border-purple-400/50 hover:shadow-purple-300/30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-1.5 md:p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <span
                      className={`text-xs md:text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <div
                    className={`text-xl md:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardHeader;
