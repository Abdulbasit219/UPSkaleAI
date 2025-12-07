import React from 'react';
import { Rocket } from 'lucide-react';

const PricingHeader = ({ isDark, billingCycle, setBillingCycle }) => {
  return (
    <div className="text-center mb-16">
      <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 backdrop-blur-sm ${
        isDark
          ? "bg-purple-500/20 border-purple-500/30"
          : "bg-purple-100/80 border-purple-300/30"
      }`}>
        <Rocket className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
        <span className={`text-sm font-medium ${isDark ? "text-purple-300" : "text-purple-700"}`}>
          Simple, Transparent Pricing
        </span>
      </div>

      <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
        isDark ? "text-white" : "text-gray-900"
      }`}>
        Choose Your
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Learning Path</span>
      </h1>
      
      <p className={`text-xl max-w-3xl mx-auto mb-8 ${
        isDark ? "text-gray-400" : "text-gray-600"
      }`}>
        Start free and scale as you grow. All plans include our core features to help you bridge learning and earning.
      </p>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className={`text-sm font-medium transition-colors ${
          billingCycle === 'monthly' 
            ? (isDark ? 'text-white' : 'text-gray-900') 
            : (isDark ? 'text-gray-400' : 'text-gray-500')
        }`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative w-14 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            isDark 
              ? "bg-slate-700 focus:ring-offset-slate-950" 
              : "bg-gray-300 focus:ring-offset-gray-50"
          }`}
        >
          <div className={`absolute top-1 left-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-transform ${
            billingCycle === 'yearly' ? 'translate-x-7' : ''
          }`} />
        </button>
        <span className={`text-sm font-medium transition-colors ${
          billingCycle === 'yearly' 
            ? (isDark ? 'text-white' : 'text-gray-900') 
            : (isDark ? 'text-gray-400' : 'text-gray-500')
        }`}>
          Yearly
        </span>
      </div>
      
      {billingCycle === 'yearly' && (
        <p className="text-sm text-green-400 font-semibold">
          🎉 Save up to 17% with yearly billing
        </p>
      )}
    </div>
  );
};

export default PricingHeader;
