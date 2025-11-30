import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';

const CTABanner = ({
  title,
  subtitle,
  badge,
  primaryBtn,
  secondaryBtn,
  isDark = false,
  className = "",
  children
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className={`absolute inset-0 ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"
        }`} />
        
        <div className="relative z-10">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              {badge.icon || <Rocket className="w-4 h-4 text-white" />}
              <span className="text-sm font-medium text-white">
                {badge.text}
              </span>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {title}
          </h2>
          
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryBtn && (
              <button 
                onClick={primaryBtn.onClick}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                {primaryBtn.icon}
                {primaryBtn.text}
              </button>
            )}
            
            {secondaryBtn && (
              <button 
                onClick={secondaryBtn.onClick}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                {secondaryBtn.icon}
                {secondaryBtn.text}
              </button>
            )}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
