import React from "react";
import { Brain, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesGrid({ isDark }) {
  const features = [
    {
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms scan your resume like real ATS systems",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Secure & Private",
      description: "Your resume is never stored or shared with third parties",
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Instant Results",
      description: "Get detailed feedback in seconds with actionable insights",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-6 transition-all ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
              : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
          }`}
        >
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${
              isDark
                ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                : "bg-gradient-to-br from-purple-100 to-pink-100"
            }`}
          >
            <div className={isDark ? "text-purple-400" : "text-purple-600"}>
              {feature.icon}
            </div>
          </div>
          <h3
            className={`text-base sm:text-lg font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {feature.title}
          </h3>
          <p
            className={`text-sm sm:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
