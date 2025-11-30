import React from 'react';

const FAQSection = ({ isDark }) => {
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
  );
};

export default FAQSection;
