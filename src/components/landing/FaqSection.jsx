import React from "react";
import { HelpCircle } from "lucide-react";

function FaqSection({ isDark }) {
  return (
    <section
      id="faq"
      className={`py-24 px-4 sm:px-6 lg:px-8 relative z-10 ${isDark ? "bg-slate-950/30" : "bg-gray-50/50"}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Common Questions
          </h2>
          <p
            className={`${isDark ? "text-gray-400" : "text-gray-600"} font-medium`}
          >
            Everything you need to know about the platform
          </p>
        </div>

        <div className="grid gap-4">
          {[
            {
              q: "How does the CodeTwin AI work?",
              a: "CodeTwin uses advanced neural models to learn your coding style and logic patterns in real-time, providing contextual assistance that goes beyond simple autocomplete.",
            },
            {
              q: "Is my data and code secure?",
              a: "Absolutely. We use enterprise-grade encryption and do not store your code on our servers unless you explicitly choose to cloud-sync your workspace.",
            },
            {
              q: "How accurate is the job matching?",
              a: "Our AI analyzes 50+ data points from your CodeTwin projects, assessment scores, and roadmap progress to ensure a 90%+ compatibility rate with job roles.",
            },
            {
              q: "Can I use it for free?",
              a: "Yes, our core features including the basic Roadmap Engine and Community IDE are completely free for individual learners.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl border transition-all ${isDark ? "bg-slate-900 border-white/5 hover:border-purple-500/30 hover:bg-slate-900/80" : "bg-white border-gray-100 hover:shadow-xl hover:bg-gray-50/50"}`}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                {faq.q}
                <HelpCircle className="w-5 h-5 text-purple-500 opacity-30" />
              </h3>
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
