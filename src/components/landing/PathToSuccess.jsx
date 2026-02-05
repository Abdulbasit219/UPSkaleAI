import React from "react";
import { Target, Brain, Code2, Briefcase, ArrowDown } from "lucide-react";

function PathToSuccess({ isDark }) {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold uppercase tracking-widest mb-6">
            Workflow
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Your path to{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              career mastery.
            </span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"} font-medium`}
          >
            We&apos;ve engineered a four-step cycle designed to take you from a
            curious learner to a high-earning professional.
          </p>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div
            className={`hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] ${isDark ? "bg-white/5" : "bg-gray-100"}`}
          >
            <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
          </div>

          <div className="grid md:grid-cols-4 gap-12 sm:gap-16">
            {[
              {
                num: "01",
                title: "Personalized Assessment",
                desc: "We analyze your current skill level using industry-standard AI benchmarks.",
                icon: <Target className="w-6 h-6" />,
                theme: "from-purple-500 to-indigo-500",
              },
              {
                num: "02",
                title: "Curated Learning",
                desc: "Get a custom roadmap with resources tailored to bridge your specific gaps.",
                icon: <Brain className="w-6 h-6" />,
                theme: "from-pink-500 to-rose-500",
              },
              {
                num: "03",
                title: "Experience Building",
                desc: "Build real projects in our CodeTwin IDE to prove your practical abilities.",
                icon: <Code2 className="w-6 h-6" />,
                theme: "from-emerald-500 to-teal-500",
              },
              {
                num: "04",
                title: "Verified Placement",
                desc: "Your verified portfolio is matched directly with global waiting recruiters.",
                icon: <Briefcase className="w-6 h-6" />,
                theme: "from-blue-500 to-cyan-500",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="relative group text-center md:text-left"
              >
                {/* Step Marker */}
                <div className="mb-8 relative flex justify-center md:justify-start">
                  {/* Number label watermark - Refined Outline Style */}
                  <span
                    className={`absolute -left-2 -top-10 text-[80px] md:text-[120px] font-black pointer-events-none select-none transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-4 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                    style={{
                      WebkitTextStroke: isDark
                        ? "1px rgba(255,255,255,0.1)"
                        : "1px rgba(0,0,0,0.15)",
                      color: "transparent",
                    }}
                  >
                    {step.num}
                  </span>

                  <div
                    className={`relative z-10 w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border shadow-2xl ${
                      isDark
                        ? "bg-slate-900 border-white/10 group-hover:border-purple-500/50"
                        : "bg-white border-gray-100 group-hover:border-purple-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.theme} flex items-center justify-center text-white shadow-lg shadow-purple-500/20`}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-purple-500 transition-colors">
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Hover visual cue */}
                <div
                  className={`mt-6 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full bg-gradient-to-r ${step.theme}`}
                />

                {/* Mobile Indicator */}
                {idx < 3 && (
                  <div className="md:hidden flex justify-center pt-8">
                    <ArrowDown
                      className={`w-5 h-5 text-gray-300 animate-bounce ${isDark ? "opacity-20" : "opacity-40"}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PathToSuccess;
