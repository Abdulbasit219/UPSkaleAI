const AchievementItem = ({ badgeName, badge, isDark }) => {
  return (
    <div className="text-center group cursor-pointer">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg`}
      >
        <div className="text-white">{badge.icon}</div>
      </div>

      <div
        className={`text-xs font-semibold mb-0.5 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {badgeName}
      </div>

      <div
        className={`text-xs ${
          isDark ? "text-gray-500" : "text-gray-500"
        }`}
      >
        {badge.earned}
      </div>
    </div>
  );
};

export default AchievementItem;
