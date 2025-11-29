import React from "react";
import {
  Briefcase,
  Users,
  FileText,
  Calendar,
  ArrowUp,
} from "lucide-react";

const StatsGrid = ({ isDark, isMobile }) => {
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      change: "+2 this week",
      icon: Briefcase,
      color: "purple",
      trend: "up",
    },
    {
      title: "Total Applications",
      value: "248",
      change: "+45 this week",
      icon: FileText,
      color: "blue",
      trend: "up",
    },
    {
      title: "Interviews Scheduled",
      value: "18",
      change: "+5 this week",
      icon: Calendar,
      color: "green",
      trend: "up",
    },
    {
      title: "Hired This Month",
      value: "6",
      change: "+2 from last month",
      icon: Users,
      color: "pink",
      trend: "up",
    },
  ];

  const getGradient = (color) => {
    const gradients = {
      purple: "from-purple-500 to-pink-500",
      blue: "from-blue-500 to-cyan-500",
      green: "from-green-500 to-emerald-500",
      pink: "from-pink-500 to-rose-500",
    };
    return gradients[color] || gradients.purple;
  };

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const gradient = getGradient(stat.color);
        
        return (
          <div
            key={index}
            className={`group p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
              isDark
                ? "bg-slate-900/80 border-purple-500/20 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20"
                : "bg-white/80 border-purple-200/30 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
            }`}
          >
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div
                className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                <Icon className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs md:text-sm font-bold">
                <ArrowUp className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                <span>{stat.change.split(' ')[0]}</span>
              </div>
            </div>
            
            <h3
              className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold mb-1 md:mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {stat.value}
            </h3>
            <p
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold ${
                isDark ? "text-gray-400" : "text-gray-600"
              } mb-1`}
            >
              {stat.title}
            </p>
            <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-green-500 font-medium`}>
              {stat.change}
            </p>

            {/* Animated background element */}
            <div
              className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;