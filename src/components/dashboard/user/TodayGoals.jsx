const TodayGoals = ({ isDark, todayTasks = [], onToggleTask }) => {
  const completedCount = todayTasks.filter((t) => t.completed).length;
  const progress = todayTasks.length
    ? Math.round((completedCount / todayTasks.length) * 100)
    : 0;

  return (
    <div
      className={`rounded-xl p-5 ${
        isDark ? "bg-slate-900" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-3">Today's Goals</h3>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>
            {completedCount}/{todayTasks.length}
          </span>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded">
          <div
            className="bg-purple-600 h-2 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {todayTasks.length === 0 && (
          <p className="text-sm opacity-60">No tasks for today</p>
        )}

        {todayTasks.map((task) => (
          <div
            key={task._id}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              isDark ? "bg-slate-800" : "bg-gray-100"
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task._id)}
              className="w-4 h-4"
            />

            <div className="flex-1">
              <p
                className={`font-medium ${
                  task.completed
                    ? "line-through opacity-60"
                    : ""
                }`}
              >
                {task.title}
              </p>

              <div className="text-xs opacity-70 flex gap-2">
                <span>{task.time} min</span>
                <span>{task.priority}</span>
                {task.source === "system" && <span>(auto)</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayGoals;
