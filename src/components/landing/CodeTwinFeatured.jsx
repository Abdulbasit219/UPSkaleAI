import React from "react";
import { Bot, Code2, Sparkles, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

function CodeTwinFeatured({ isDark }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest">
              <Code2 className="w-4 h-4" />
              Featured: CodeTwin IDE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
              Pair program with your <br />
              <span className="text-emerald-500">AI Digital Twin.</span>
            </h2>
            <p
              className={`text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Experience zero-latency pair programming with an AI that&apos;s
              trained to understand your logic. Debug, optimize, and learn as
              you build real projects.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold">
                  Real-time Mentorship
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold">
                  Intelligent Context
                </span>
              </div>
            </div>

            <Link
              href="/code-twin"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 group"
            >
              Open CodeTwin Studio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mockup */}
          <div className="flex-1 w-full max-w-2xl relative group">
            <div className="absolute inset-x-0 top-0 bottom-0 bg-emerald-500/10 blur-[100px] rounded-full opacity-50 transition-opacity group-hover:opacity-100" />
            <div
              className={`relative rounded-3xl border overflow-hidden shadow-2xl ${isDark ? "bg-slate-900 border-white/5" : "bg-white border-gray-100"}`}
            >
              <div
                className={`p-4 border-b flex items-center gap-2 ${isDark ? "bg-slate-950 border-white/5" : "bg-gray-50 border-gray-100"}`}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-mono opacity-40 ml-2">
                  roadmap.js
                </span>
              </div>
              <div className="flex h-[350px]">
                <div className="flex-1 p-6 font-mono text-xs leading-6 opacity-40 select-none">
                  <div className="text-purple-400">function</div> bridge()
                  &#123; <br />
                  &nbsp;&nbsp;
                  <div className="text-emerald-400 inline">
                    {/* AI pair programming... */}
                  </div>
                  ; <br />
                  &#125;
                </div>
                <div
                  className={`w-48 sm:w-64 border-l p-4 flex flex-col ${isDark ? "bg-slate-950/50" : "bg-gray-50"} border-inherit`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-500">
                      AI Assistant
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-xl border text-[10px] leading-relaxed ${isDark ? "bg-slate-800 border-white/10" : "bg-white border-gray-100 shadow-sm"}`}
                  >
                    &quot;I&apos;ve analyzed your logic and found a more
                    efficient approach...&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CodeTwinFeatured;
