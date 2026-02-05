import React from "react";
import {
  Bot,
  Code2,
  Search,
  Brain,
  MessageSquare,
  ClipboardCheck,
  Layout,
  ArrowRight,
} from "lucide-react";
import Proof from "./Proof";

function AiTools({ isDark, stats }) {
  return (
    <section
      className={`py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden ${isDark ? "bg-slate-950" : "bg-white"}`}
    >
      {/* Subtle Section Grid Background */}
      <div
        className={`absolute inset-0 opacity-[0.03] ${isDark ? "invert" : ""}`}
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold uppercase tracking-widest mb-6">
            AI Powerhouse
          </div>
          <h2 className="text-3xl sm:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
            One Platform. <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Infinite Career Possibilities.
            </span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"} font-medium`}
          >
            The first truly integrated AI career ecosystem. Each tool is
            designed to talk to the others, creating a seamless path from your
            first line of code to your dream office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[160px]">
          {[
            {
              icon: <Code2 />,
              title: "CodeTwin IDE",
              desc: "Real-time AI pair programming with zero latency logic sync.",
              color: "from-emerald-500 to-teal-500",
              span: "md:col-span-8 md:row-span-2",
              featured: true,
            },
            {
              icon: <Bot />,
              title: "Career Bot",
              desc: "24/7 strategic guidance.",
              color: "from-purple-500 to-indigo-500",
              span: "md:col-span-4 md:row-span-2",
            },
            {
              icon: <Search />,
              title: "Neural Job Search",
              desc: "AI-matched roles only.",
              color: "from-blue-500 to-cyan-500",
              span: "md:col-span-4 md:row-span-2",
            },
            {
              icon: <Brain />,
              title: "Roadmap Engine",
              desc: "Personalized learning paths evolved from your skill gaps.",
              color: "from-rose-500 to-pink-500",
              span: "md:col-span-8 md:row-span-2",
              featured: true,
            },
            {
              icon: <MessageSquare />,
              title: "Interview Pro",
              desc: "Video AI sessions.",
              color: "from-orange-500 to-amber-500",
              span: "md:col-span-4 md:row-span-1",
            },
            {
              icon: <ClipboardCheck />,
              title: "ATS Optimizer",
              desc: "Perfect your resume.",
              color: "from-cyan-500 to-blue-500",
              span: "md:col-span-4 md:row-span-1",
            },
            {
              icon: <Layout />,
              title: "Portfolio Gen",
              desc: "Auto-stunning sites.",
              color: "from-indigo-500 to-purple-500",
              span: "md:col-span-4 md:row-span-1",
            },
          ].map((tool, idx) => (
            <div
              key={idx}
              className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 hover:scale-[1.01] ${tool.span} ${
                isDark
                  ? "bg-slate-900/50 border-white/5 hover:border-purple-500/30"
                  : "bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-2xl"
              } flex flex-col justify-between overflow-hidden`}
            >
              <div
                className="shine-effect absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none opacity-0 group-hover:opacity-100"
                style={{ left: "-100%" }}
              />
              {/* Spotlight background effect */}
              <div
                className={`absolute -inset-24 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-[0.03] blur-3xl transition-opacity duration-700`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {React.cloneElement(tool.icon, { className: "w-7 h-7" })}
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${tool.featured ? "md:text-3xl" : ""}`}
                >
                  {tool.title}
                </h3>
                <p
                  className={`leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"} ${tool.featured ? "text-lg max-w-md" : "text-sm"}`}
                >
                  {tool.desc}
                </p>
              </div>

              <div className="relative z-10 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  Launch Module <ArrowRight className="w-3 h-3" />
                </div>
                {tool.featured && (
                  <div className="hidden md:block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-tighter opacity-40">
                    High Efficiency AI
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Footer - Scrolling Marquee */}
        <Proof isDark={isDark} />
      </div>
    </section>
  );
}

export default AiTools;
