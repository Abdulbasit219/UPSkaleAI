const FilterPills = ({ filters, activeFilter, setActiveFilter, isDark }) => (
  <div className="overflow-x-auto pb-4 custom-scrollbar">
    <div className="flex gap-3 min-w-max px-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border ${
            activeFilter === filter.id
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30"
              : `${
                  isDark
                    ? "bg-slate-900 border-white/5 text-gray-400 hover:text-white hover:bg-slate-800"
                    : "bg-white border-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm"
                }`
          }`}
        >
          <span className="opacity-70">{filter.icon}</span>
          {filter.name}
          <span
            className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors ${
              activeFilter === filter.id
                ? "bg-white/20 text-white"
                : isDark
                  ? "bg-white/5 text-gray-500"
                  : "bg-gray-100 text-gray-500"
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
