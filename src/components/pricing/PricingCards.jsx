import React from 'react';
import { Check, Sparkles, Zap, Crown, X } from 'lucide-react';

const PricingCards = ({ isDark, billingCycle }) => {
  const plans = [
    {
      name: 'Free',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Access to basic career paths',
        '3 skill assessments per month',
        'Basic learning roadmap',
        'Community forum access',
        'Email support',
        'Portfolio builder (basic)',
      ],
      limitations: [
        'No AI recommendations',
        'Limited job matches',
        'No priority support',
      ],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'from-slate-600 to-slate-700',
      borderColor: 'border-slate-600/30',
    },
    {
      name: 'Pro',
      icon: <Zap className="w-6 h-6" />,
      description: 'For serious learners',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Everything in Free',
        'Unlimited skill assessments',
        'AI-powered career recommendations',
        'Advanced learning roadmap',
        'Unlimited job matches',
        'Priority email support',
        'Advanced portfolio builder',
        'Resume AI enhancement',
        'Interview preparation tools',
        'Progress analytics dashboard',
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-500/50',
    },
    {
      name: 'Enterprise',
      icon: <Crown className="w-6 h-6" />,
      description: 'For teams and organizations',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Custom career paths',
        'Dedicated account manager',
        '24/7 priority support',
        'API access',
        'Custom integrations',
        'Advanced analytics & reporting',
        'Bulk assessments',
        'White-label options',
        'Custom training programs',
        'Recruiter dashboard access',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-yellow-600 to-orange-600',
      borderColor: 'border-yellow-500/30',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-20">
      {plans.map((plan, idx) => (
        <div
          key={idx}
          className={`relative backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
            isDark
              ? "bg-slate-900/50"
              : "bg-white/80"
          } ${plan.borderColor} ${
            plan.popular ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/20' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-semibold">
                Most Popular
              </div>
            </div>
          )}

          {/* Icon & Name */}
          <div className={`w-14 h-14 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mb-4`}>
            <div className="text-white">
              {plan.icon}
            </div>
          </div>

          <h3 className={`text-2xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>{plan.name}</h3>
          <p className={`text-sm mb-6 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>{plan.description}</p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)}
              </span>
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>/month</span>
            </div>
            {billingCycle === 'yearly' && plan.yearlyPrice > 0 && (
              <p className={`text-sm mt-1 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}>
                Billed ${plan.yearlyPrice} yearly
              </p>
            )}
          </div>

          {/* CTA Button */}
          <button className={`w-full py-3 rounded-xl font-semibold transition-all mb-6 ${
            plan.popular
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
              : `${
                  isDark 
                    ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`
          }`}>
            {plan.cta}
          </button>

          {/* Features */}
          <div className="space-y-3">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}>{feature}</span>
              </div>
            ))}
            {plan.limitations.map((limitation, i) => (
              <div key={i} className="flex items-start gap-3">
                <X className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isDark ? "text-gray-600" : "text-gray-400"
                }`} />
                <span className={`text-sm ${
                  isDark ? "text-gray-600" : "text-gray-500"
                }`}>{limitation}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
