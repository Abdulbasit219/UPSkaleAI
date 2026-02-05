import React from "react";
import {
  Briefcase,
  Globe,
  Building2,
  MapPin,
  Search,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

function JobSearch({ isDark }) {
  return (
    <section
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 ${isDark ? "bg-slate-900/20" : "bg-gray-50/50"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest">
              <Briefcase className="w-4 h-4" />
              New: Upscale Opportunities
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
              Find your dream job <br />
              <span className="text-blue-500">with AI precision.</span>
            </h2>
            <p
              className={`text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Our neural matching engine analyzes your verified skills from
              CodeTwin to connect you with roles where you&apos;ll actually
              thrive. No more endless scrolling through irrelevant postings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold">
                  Global Remote Roles
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold">
                  Top Tech Companies
                </span>
              </div>
            </div>

            <Link
              href="/jobsearch"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 group"
            >
              Explore Job Board
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Job Search */}
          <div className="flex-1 w-full max-w-2xl relative group">
            <div className="absolute inset-x-0 top-0 bottom-0 bg-blue-500/10 blur-[100px] rounded-full opacity-50 transition-opacity group-hover:opacity-100" />
            <div
              className={`relative rounded-3xl border overflow-hidden shadow-2xl ${isDark ? "bg-slate-900 border-white/5" : "bg-white border-gray-100"}`}
            >
              <div
                className={`p-4 border-b flex items-center justify-between ${isDark ? "bg-slate-950 border-white/5" : "bg-gray-50 border-gray-100"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  </div>
                  <div
                    className={`h-6 w-32 rounded-lg ${isDark ? "bg-white/5" : "bg-gray-200"} animate-pulse`}
                  />
                </div>
                <Search className="w-4 h-4 opacity-40" />
              </div>

              <div className="p-6 space-y-4">
                {/* Search Bar Mockup */}
                <div
                  className={`p-3 rounded-xl border flex items-center gap-3 ${isDark ? "bg-slate-800 border-white/10" : "bg-gray-50 border-gray-200"}`}
                >
                  <Search className="w-4 h-4 text-blue-500" />
                  <div
                    className={`h-2 w-48 rounded ${isDark ? "bg-white/10" : "bg-gray-300"}`}
                  />
                </div>

                {/* Job Cards Mockup */}
                {[
                  {
                    title: "Senior Frontend Engineer",
                    company: "Aether Corp",
                    location: "Remote",
                    pay: "PKR 300k - 500k",
                    match: "98%",
                  },
                  {
                    title: "Full Stack Developer",
                    company: "Neon Systems",
                    location: "Karachi, PK",
                    pay: "PKR 250k - 400k",
                    match: "95%",
                  },
                  {
                    title: "React Specialist",
                    company: "Velocity AI",
                    location: "Lahore, PK",
                    pay: "PKR 200k - 350k",
                    match: "92%",
                  },
                ].map((job, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.02] ${isDark ? "bg-slate-800/50 border-white/5 hover:bg-slate-800" : "bg-white border-gray-100 hover:shadow-md"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        {job.company[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold mb-0.5">
                          {job.title}
                        </div>
                        <div className="flex items-center gap-2 opacity-60 text-[10px]">
                          <span className="flex items-center gap-0.5">
                            <Building2 className="w-2.5 h-2.5" /> {job.company}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5" /> {job.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-blue-500 mb-0.5">
                        {job.match} Match
                      </div>
                      <div className="text-[10px] font-mono opacity-60">
                        {job.pay}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobSearch;
