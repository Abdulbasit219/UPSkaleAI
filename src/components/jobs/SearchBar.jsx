import { Search, Plus, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ isDark, searchQuery, setSearchQuery, setIsPostJobModalOpen }) => (
  <div className={`max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 p-3 rounded-2xl shadow-lg ${
    isDark
      ? "bg-slate-900/70 border border-purple-500/30"
      : "bg-white/90 border border-purple-300/30"
  } backdrop-blur-xl`}>
    <div className="flex-1 relative">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
        isDark ? "text-gray-400" : "text-gray-500"
      }`} />
      <input
        type="text"
        placeholder="Search by title, company, or keywords..."
        className={`w-full py-3 pl-12 pr-4 rounded-xl outline-none text-base ${
          isDark
            ? "bg-slate-800/50 text-white placeholder-gray-400"
            : "bg-gray-100 text-gray-900 placeholder-gray-500"
        }`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <div className="flex gap-2 sm:gap-3">
      <button className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base">
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden xs:inline">Search</span>
      </button>
      <button
        onClick={() => setIsPostJobModalOpen(true)}
        className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden xs:inline">Post Job</span>
      </button>
      <button className={`px-3 sm:px-4 py-3 sm:py-4 border rounded-lg sm:rounded-xl transition-all backdrop-blur-sm ${
        isDark
          ? "bg-slate-800/50 border-purple-500/30 text-white hover:bg-slate-700"
          : "bg-white/80 border-purple-300/30 text-gray-900 hover:bg-gray-100"
      }`}>
        <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  </div>
);

export default SearchBar;