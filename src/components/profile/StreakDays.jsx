const StreakDays = ({ streak, isDark }) => {
  return (
    <div className="flex justify-between gap-2">
      {streak.map((day, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
              day.active
                ? "bg-gradient-to-br from-orange-500 to-red-500 text-white"
                : isDark
                ? "bg-slate-800 text-gray-500"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {day.day}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreakDays;
