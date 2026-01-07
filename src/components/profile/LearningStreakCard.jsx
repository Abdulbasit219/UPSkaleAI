import { Flame } from "lucide-react";
import StreakDays from "./StreakDays";

const LearningStreakCard = ({ isDark, profile, streak }) => {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      {/* Title */}
      <h3
        className={`text-xl font-bold mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Flame className="w-5 h-5 text-orange-400" />
        Learning Streak
      </h3>

      {/* Streak Number */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-1">
          {profile?.streak || 0} Days
        </div>
        <div
          className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Keep it going! 
        </div>
      </div>

      {/* Streak Days */}
      <StreakDays streak={streak} isDark={isDark} />
    </div>
  );
};

export default LearningStreakCard;
