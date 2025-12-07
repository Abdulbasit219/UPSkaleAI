import React from "react";

const TabNavigation = ({ activeTab, setActiveTab, isDark, isMobile }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊", mobileIcon: "📊" },
    { id: "jobs", label: "My Jobs", icon: "💼", mobileIcon: "💼" },
    { id: "applications", label: "Applications", icon: "📝", mobileIcon: "📝" },
  ];

  return (
    <div className={`rounded-xl md:rounded-2xl backdrop-blur-xl border p-1 md:p-2 ${
      isDark
        ? "bg-slate-900/80 border-purple-500/20"
        : "bg-white/80 border-purple-200/30"
    }`}>
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex-1 text-center ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : isDark
                ? "text-gray-400 hover:text-white hover:bg-white/10"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isMobile ? tab.mobileIcon : tab.icon}
            </span>
            {!isMobile && <span>{tab.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;