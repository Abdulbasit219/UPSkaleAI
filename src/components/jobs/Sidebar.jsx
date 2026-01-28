import {
  Sparkles,
  Crown,
  Bookmark,
  Send,
  Target,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ isDark, featuredCompanies, savedJobs }) => (
  <div className="space-y-6">
    {/* AI Progress Card */}
    <div
      className={`backdrop-blur-xl border rounded-3xl p-6 transition-all duration-300 ${
        isDark
          ? "bg-slate-900/50 border-white/5 shadow-2xl shadow-purple-950/20"
          : "bg-white border-gray-100 shadow-xl shadow-purple-500/5"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-gray-400">Your AI Match</h3>
        <Sparkles className="w-4 h-4 text-purple-500" />
      </div>

      <div className="text-center">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#sidebarGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="276.46"
              strokeDashoffset="55.29"
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient
                id="sidebarGradient"
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">80%</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Match
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="font-bold text-gray-900 dark:text-white">
            Profile Strength
          </div>
          <p className="text-xs text-gray-400">Complete assessments to boost</p>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all">
          Improve Score
        </button>
      </div>
    </div>

    {/* Featured Companies */}
    <div
      className={`backdrop-blur-xl border rounded-3xl p-6 transition-all duration-300 ${
        isDark
          ? "bg-slate-900/50 border-white/5"
          : "bg-white border-gray-100 shadow-xl shadow-purple-500/5"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-gray-400">Top Hiring</h3>
        <Crown className="w-4 h-4 text-amber-500" />
      </div>

      <div className="space-y-4">
        {featuredCompanies.map((company, index) => (
          <div
            key={index}
            className={`group flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer ${
              isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl group-hover:scale-110 transition-transform">
                {company.logo}
              </div>
              <div>
                <div
                  className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {company.name}
                </div>
                <div className="text-xs text-gray-400">
                  {company.jobs} open roles
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-6 py-3 border rounded-xl text-sm font-bold transition-all ${
          isDark
            ? "border-white/10 hover:bg-white/5 text-gray-400"
            : "border-gray-200 hover:bg-gray-50 text-gray-600 shadow-sm"
        }`}
      >
        View All
      </button>
    </div>

    {/* My Actions */}
    <div
      className={`p-6 rounded-3xl border ${
        isDark
          ? "bg-slate-900/50 border-white/5"
          : "bg-purple-50 border-purple-100 text-purple-900 shadow-sm"
      }`}
    >
      <h3 className="text-sm font-bold mb-4 opacity-60 uppercase tracking-widest">
        My Tools
      </h3>
      <div className="space-y-2">
        <button
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            isDark
              ? "bg-white/5 hover:bg-white/10 text-white"
              : "bg-white hover:bg-gray-50 shadow-sm"
          }`}
        >
          <Bookmark className="w-4 h-4 text-purple-500" />
          Saved Jobs ({savedJobs.size})
        </button>
        <button
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            isDark
              ? "bg-white/5 hover:bg-white/10 text-white"
              : "bg-white hover:bg-gray-50 shadow-sm"
          }`}
        >
          <Send className="w-4 h-4 text-pink-500" />
          Applications
        </button>
      </div>
    </div>
  </div>
);

export default Sidebar;
