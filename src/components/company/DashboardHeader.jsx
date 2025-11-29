import React from "react";

const DashboardHeader = ({ title, subtitle, isDark, isMobile }) => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-3 md:gap-4 mb-4">
        <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg`}>
          <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-white rounded-lg flex items-center justify-center`}>
            <div className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} bg-gradient-to-r from-purple-500 to-pink-500 rounded-md`}></div>
          </div>
        </div>
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-extrabold mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500`}>
            {title}
          </h1>
          <p className={`${isMobile ? 'text-sm' : 'text-lg'} ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Welcome Card */}
      <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] ${
        isDark
          ? "bg-slate-900/80 border-purple-500/20"
          : "bg-white/80 border-purple-200/30"
      }`}>
        <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
          <div className="text-center sm:text-left">
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-1 md:mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              Welcome back, TechCorp! 👋
            </h2>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              You have 12 active jobs and 248 new applications this week.
            </p>
          </div>
          <div className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold ${
            isDark 
              ? "bg-green-500/20 text-green-300" 
              : "bg-green-500/10 text-green-700"
          }`}>
            Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;