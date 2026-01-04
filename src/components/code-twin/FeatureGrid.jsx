"use client";
import React from "react";

const FeatureGrid = ({ isDark, features }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`group relative backdrop-blur-xl border rounded-[2rem] p-8 text-center transition-all duration-500 overflow-hidden ${
            isDark
              ? "bg-slate-900/40 border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)]"
              : "bg-white/60 border-purple-200/50 hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(168,85,247,0.1)]"
          }`}
        >
          {/* Animated Background Blob */}
          <div
            className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${feature.gradient}`}
          ></div>

          <div
            className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}
          >
            <div className="text-white transform group-hover:scale-110 transition-transform">
              {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
            </div>
          </div>

          <h3
            className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {feature.title}
          </h3>

          <p
            className={`text-sm leading-relaxed font-medium ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-500 group-hover:text-gray-700"} transition-colors`}
          >
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
