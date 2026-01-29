"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  Award,
  Briefcase,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Zap,
  Brain,
  Rocket,
  Code2,
  Bot,
  Terminal,
  Sparkles,
  ArrowDown,
  BookOpen,
  MessageSquare,
  ClipboardCheck,
  Layout,
  UserCircle,
  Settings,
  Search,
  Globe,
  Building2,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SharedCTABanner from "@/components/ui/CTABanner";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import HeroSection from "@/components/landing/HeroSection";
import { fetchProfile } from "@/store/slices/profileSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function UpSkaleAILanding() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? themeMode : "dark";
  const isDark = theme === "dark";

  const { data: session } = useSession();
  const user = session?.user;
  const dispatch = useDispatch();

  useEffect(() => {
    const updateStreak = async () => {
      try {
        await axios.post("/api/user/profile/streak");
      } catch (error) {
        console.log("Streak update failed:", error);
      }
    };
    updateStreak();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile());
    }
  }, [user, dispatch]);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Career Path Mapper",
      description:
        "Get a personalized roadmap tailored to your dream career with AI-powered insights.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Skill Assessment",
      description:
        "Upload projects or take quizzes to get your skills evaluated by high-tier AI models.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Learning Roadmap",
      description:
        "Step-by-step guidance with curated courses from top-tier educational platforms.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Portfolio Builder",
      description:
        "Automatically generate stunning resumes and digital portfolios from your verified skills.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Upscale Opportunities",
      description:
        "Connect with internships and global job roles matched perfectly to your skill level.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Career Analytics",
      description:
        "Track your progress with detailed data-driven insights and career readiness scores.",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Learners" },
    { value: "500+", label: "Career Paths" },
    { value: "95%", label: "Success Rate" },
    { value: "2K+", label: "Opportunities" },
  ];

  return (
    <div
      className={`relative w-full overflow-x-hidden min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      {/* Background Pattern */}
      <BackgroundPattern />

      {/* Hero Section  */}
      <HeroSection />

      {/* Features Grid */}
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

      {/* 10+ AI Tools Section - SaaS Style */}
      {/* 10+ AI Tools Section - Premium Bento Style */}
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
          <div className="mt-24 flex flex-col items-center gap-10">
            <div className="text-sm font-bold opacity-40 uppercase tracking-[0.3em] text-center">
              Trusted by 10,000+ top-tier professionals
            </div>

            <div
              className={`relative w-full max-w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 md:before:w-20 before:bg-gradient-to-r ${isDark ? "before:from-slate-950" : "before:from-gray-50"} before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-10 md:after:w-20 after:bg-gradient-to-l ${isDark ? "after:from-slate-950" : "after:from-gray-50"} after:to-transparent`}
            >
              <div className="flex animate-marquee gap-8 md:gap-16 items-center whitespace-nowrap">
                {[1, 2].map((set) => (
                  <div
                    key={set}
                    className="flex gap-8 md:gap-16 items-center shrink-0"
                  >
                    <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                      VORTEX
                    </div>
                    <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                      AETHER
                    </div>
                    <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                      QUANTUM
                    </div>
                    <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                      NEON
                    </div>
                    <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                      PULSE
                    </div>
                    <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                      ZIGMA
                    </div>
                    <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                      ORBIT
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes shine {
          0% {
            left: -100%;
            transition-property: left;
          }
          100% {
            left: 100%;
            transition-property: left;
          }
        }
        .group:hover .shine-effect {
          animation: shine 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* CodeTwin Featured Section */}
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

            {/* Refined Mockup */}
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

      {/* Job Search Featured Section */}
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

            {/* SaaS Mockup for Job Search */}
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
                      pay: "$140k - $180k",
                      match: "98%",
                    },
                    {
                      title: "Full Stack Developer",
                      company: "Neon Systems",
                      location: "New York, US",
                      pay: "$120k - $160k",
                      match: "95%",
                    },
                    {
                      title: "React Specialist",
                      company: "Velocity AI",
                      location: "London, UK",
                      pay: "£80k - £110k",
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
                              <Building2 className="w-2.5 h-2.5" />{" "}
                              {job.company}
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

      {/* Path to Success - Enhanced SaaS Style */}
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
              We&apos;ve engineered a four-step cycle designed to take you from
              a curious learner to a high-earning professional.
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

      {/* FAQ Section */}
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

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SharedCTABanner
            isDark={isDark}
            title="Ready to bridge your future?"
            subtitle="Join thousands of learners who are already building their dream careers with AI-powered guidance"
            primaryBtn={{
              text: "Get Started Free",
              onClick: () => router.push("/signup"),
            }}
          />
        </div>
      </section>
    </div>
  );
}
