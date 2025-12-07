"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PricingHeader from '@/components/pricing/PricingHeader';
import PricingCards from '@/components/pricing/PricingCards';
import ComparisonTable from '@/components/pricing/ComparisonTable';
import FAQSection from '@/components/pricing/FAQSection';
import CTASection from '@/components/pricing/CTASection';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white" 
        : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
    }`}>
      {/* Background Pattern */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark 
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PricingHeader 
          isDark={isDark} 
          billingCycle={billingCycle} 
          setBillingCycle={setBillingCycle} 
        />
        
        <PricingCards 
          isDark={isDark} 
          billingCycle={billingCycle} 
        />
        
        <ComparisonTable isDark={isDark} />
        
        <FAQSection isDark={isDark} />
        
        <CTASection isDark={isDark} />
      </div>
    </div>
  );
}