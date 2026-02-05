import React from "react";

function Features({ isDark, features }) {
  return (
    <section
      id="features"
      className={`py-24 px-4 sm:px-6 lg:px-8 relative z-10 ${isDark ? "bg-slate-900/20" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-purple-500">succeed</span>
          </h2>
          <p
            className={`${isDark ? "text-gray-400" : "text-gray-600"} font-medium`}
          >
            Powered by cutting-edge AI to personalize your learning journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border group transition-all hover:border-purple-500/50 ${isDark ? "bg-slate-900/50 border-white/5 hover:bg-slate-900" : "bg-slate-50 border-gray-100 hover:bg-white hover:shadow-xl"}`}
            >
              <div
                className="shine-effect absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none opacity-0 group-hover:opacity-100"
                style={{ left: "-100%" }}
              />
              <div
                className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
