"use client";
import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown, Rocket, ArrowRight, X } from 'lucide-react';
import { useSelector } from 'react-redux';
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";


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

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and PayPal. Enterprise customers can also pay via invoice.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Pro and Enterprise plans come with a 14-day free trial. No credit card required.',
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Absolutely! Students get 50% off on Pro plans. Just verify your student status during signup.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export it anytime before permanent deletion.',
    },
  ];

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
        {/* Header */}
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

        {/* Pricing Cards */}
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

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Compare Plans
          </h2>
          <div className={`backdrop-blur-xl border rounded-2xl overflow-hidden ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${
                    isDark ? "border-purple-500/20" : "border-purple-300/20"
                  }`}>
                    <th className={`text-left py-4 px-6 font-medium ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>Features</th>
                    <th className={`text-center py-4 px-6 font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>Free</th>
                    <th className={`text-center py-4 px-6 font-semibold ${
                      isDark ? "text-white bg-purple-500/10" : "text-gray-900 bg-purple-100/50"
                    }`}>Pro</th>
                    <th className={`text-center py-4 px-6 font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ['Career Paths', '10', 'Unlimited', 'Unlimited + Custom'],
                    ['Skill Assessments', '3/month', 'Unlimited', 'Unlimited'],
                    ['AI Recommendations', '—', '✓', '✓'],
                    ['Job Matches', 'Basic', 'Advanced', 'Premium + API'],
                    ['Portfolio Builder', 'Basic', 'Advanced', 'Custom'],
                    ['Support', 'Email', 'Priority', '24/7 Dedicated'],
                    ['Analytics', '—', 'Standard', 'Advanced'],
                    ['Team Management', '—', '—', '✓'],
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-b ${
                      isDark 
                        ? "border-purple-500/10 hover:bg-purple-500/5" 
                        : "border-purple-300/10 hover:bg-purple-100/30"
                    }`}>
                      <td className={`py-4 px-6 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>{row[0]}</td>
                      <td className={`py-4 px-6 text-center ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>{row[1]}</td>
                      <td className={`py-4 px-6 text-center ${
                        isDark ? "text-white bg-purple-500/5" : "text-gray-900 bg-purple-50/50"
                      }`}>{row[2]}</td>
                      <td className={`py-4 px-6 text-center ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`backdrop-blur-xl border rounded-xl p-6 transition-all ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {faq.question}
                </h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
            <div className={`absolute inset-0 ${
              isDark
                ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
                : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"
            }`} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Our team is here to help you choose the perfect plan for your career growth journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                  Contact Sales
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}