import { Sparkles, Crown, Bookmark, Send, Target } from "lucide-react";

const Sidebar = ({ isDark, featuredCompanies, savedJobs }) => (
  <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-1">
    {/* AI Match Profile */}
    <div
      className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-500/50 transition-all ${
        isDark
          ? "bg-slate-900/50 border-purple-500/30"
          : "bg-white/80 border-purple-300/30"
      }`}
    >
      <h3
        className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
        Your AI Match
      </h3>
      <div className="space-y-3 sm:space-y-4">
        <div className="text-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={isDark ? "#1e293b" : "#e5e7eb"}
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#matchGradient)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset="50.24"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <defs>
                <linearGradient
                  id="matchGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                80%
              </span>
            </div>
          </div>
          <div
            className={`font-semibold mb-1 text-sm sm:text-base ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Career Ready
          </div>
          <div
            className={`text-xs sm:text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Based on your profile
          </div>
        </div>
        <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
          <Target className="w-3 h-3 sm:w-4 sm:h-4" />
          Boost Score
        </button>
      </div>
    </div>

    {/* Featured Companies */}
    <div
      className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-500/50 transition-all ${
        isDark
          ? "bg-slate-900/50 border-purple-500/30"
          : "bg-white/80 border-purple-300/30"
      }`}
    >
      <h3
        className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
        Top Hiring
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {featuredCompanies.map((company, index) => (
          <div
            key={index}
            className={`group flex items-center justify-between p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30 hover:bg-slate-800"
                : "bg-gray-50/80 border-purple-300/10 hover:border-purple-300/30 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                {company.logo}
              </div>
              <div>
                <div
                  className={`font-medium text-xs sm:text-sm ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {company.name}
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {company.jobs} open roles
                </div>
              </div>
            </div>
            {company.hiring && (
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 font-medium">
                Hiring
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className={`w-full mt-3 sm:mt-4 py-2 sm:py-2.5 border text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all ${
          isDark
            ? "bg-slate-800/50 border-purple-500/20 text-white hover:bg-slate-800 hover:border-purple-500/40"
            : "bg-gray-50/80 border-purple-300/20 text-gray-900 hover:bg-gray-100 hover:border-purple-300/40"
        }`}
      >
        View All Companies
      </button>
    </div>

    {/* Quick Actions */}
    <div
      className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
        isDark ? "border-purple-500/30" : "border-purple-300/30"
      }`}
    >
      <h3
        className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Quick Actions
      </h3>
      <div className="space-y-2">
        <button
          className={`w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
            isDark
              ? "bg-slate-800/50 text-white hover:bg-slate-700"
              : "bg-white/80 text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
          Saved Jobs ({savedJobs.size})
        </button>
        <button
          className={`w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
            isDark
              ? "bg-slate-800/50 text-white hover:bg-slate-700"
              : "bg-white/80 text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
          Applications
        </button>
      </div>
    </div>
  </div>
);

export default Sidebar;