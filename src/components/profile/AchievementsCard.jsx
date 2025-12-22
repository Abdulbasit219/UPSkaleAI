import { Award } from "lucide-react";
import AchievementsGrid from "./AchievementsGrid";

const AchievementsCard = ({ isDark, profile, badgeStyles }) => {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-xl font-bold flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <Award className="w-5 h-5 text-purple-400" />
          Achievements
        </h3>

        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full border ${
            isDark
              ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
              : "bg-purple-100 text-purple-700 border-purple-200"
          }`}
        >
          {profile?.badges?.length}
        </span>
      </div>

      {/* Badge Grid */}
      <AchievementsGrid
        badges={profile?.badges}
        badgeStyles={badgeStyles}
        isDark={isDark}
      />
    </div>
  );
};

export default AchievementsCard;
