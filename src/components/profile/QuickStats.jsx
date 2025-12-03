import React from "react";
import { BarChart3, Clock, Award, MessageCircle, Users } from "lucide-react"; // adjust imports
import StatItem from "./StatItem";

const QuickStats = ({ isDark }) => {
  const stats = [
    { label: "Total Learning Hours", value: "247", icon: <Clock className="w-4 h-4" /> },
    { label: "Certificates Earned", value: "8", icon: <Award className="w-4 h-4" /> },
    { label: "Forum Contributions", value: "34", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Peer Reviews", value: "12", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
        <BarChart3 className="w-5 h-5 text-purple-400" />
        Quick Stats
      </h3>
      <div className="space-y-3">
        {stats.map((stat, i) => (
          <StatItem key={i} stat={stat} isDark={isDark} />
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
