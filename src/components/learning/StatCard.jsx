"use client";
import React from "react";

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500",
    yellow: "from-yellow-500 to-orange-500",
    pink: "from-pink-500 to-rose-500",
  };

  return (
    <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
      <div
        className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colors[color]} bg-opacity-10 mb-3`}
      >
        {icon}
      </div>

      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
};

export default StatCard;
