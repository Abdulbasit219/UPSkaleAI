const FilterPills = ({ filters, activeFilter, setActiveFilter, isDark }) => (
  <div className="mb-6 sm:mb-8 overflow-x-auto">
    <div className="flex gap-2 sm:gap-3 pb-2 min-w-max px-2 sm:px-0">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
            activeFilter === filter.id
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
              : `${
                  isDark
                    ? "bg-slate-900/50 text-gray-400 hover:text-white hover:bg-slate-800 border border-purple-500/20"
                    : "bg-white/80 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-purple-300/20"
                }`
          }`}
        >
          <span className="hidden xs:inline">{filter.icon}</span>
          {filter.name}
          <span
            className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-xs ${
              activeFilter === filter.id
                ? "bg-white/20"
                : isDark
                  ? "bg-purple-500/20"
                  : "bg-purple-100"
            }`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default FilterPills;