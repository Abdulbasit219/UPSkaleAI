"use client";
import { useEffect } from "react";
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
  ChevronRight,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SharedCTABanner from "@/components/ui/CTABanner";
import { fetchProfile } from "@/store/slices/profileSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function SkillBridgeLanding() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme.mode);
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
      title: "Opportunity Bridge",
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
      className={`min-h-screen transition-all duration-700 ${isDark ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 opacity-60" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-10 animate-in fade-in slide-in-from-top-4 duration-700 ${isDark ? "bg-purple-500/10 border-purple-500/30 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-700 shadow-sm"}`}
          >
            <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Next-Gen Career Growth Platform
            </span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-10 text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Bridge your <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              learning & earning.
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-bold tracking-tight opacity-50 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            SkillBridge is your neural career counselor. Map your path, verify
            your skills, and connect with global opportunities through
            persistent AI guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link
              href="/signup"
              className="group px-10 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-2xl"
            >
              Initialize Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className={`px-10 py-5 border rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all ${isDark ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-900 shadow-sm hover:bg-slate-50"}`}
            >
              Explore Features
            </Link>
          </div>

          {/* Stats Bar - High fidelity */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 ${isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-200 shadow-xl shadow-purple-500/5"}`}
              >
                <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div
                  className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-40 px-6 relative z-10 ${isDark ? "bg-slate-950/40" : "bg-white border-y border-slate-100"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase">
              The SkillBridge Ecosystem
            </h2>
            <p className="max-w-xl mx-auto text-sm font-bold opacity-30 uppercase tracking-widest italic tracking-[0.3em]">
              Everything you need to succeed in the neural era.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, idx) => (
              <div
                key={idx}
                className={`group p-10 rounded-[3rem] border transition-all duration-700 hover:-translate-y-3 ${isDark ? "bg-slate-900/40 border-white/5 hover:border-purple-500/30" : "bg-slate-50/50 border-slate-100 hover:bg-white hover:shadow-2xl shadow-purple-500/5 hover:border-purple-300/30"}`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-black tracking-tight mb-4 uppercase">
                  {f.title}
                </h3>
                <p
                  className={`text-sm font-semibold leading-relaxed opacity-40 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED: CodeTwin Showpiece */}
      <section className="py-48 px-6 relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-10 text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                <Code2 className="w-5 h-5" />
                Featured Tool: CodeTwin
              </div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.85]">
                Coding, paired <br />
                <span className="text-emerald-500 italic">with logic.</span>
              </h2>
              <p
                className={`text-lg sm:text-xl font-bold tracking-tight opacity-40 leading-relaxed max-w-xl ${isDark ? "text-slate-300" : "text-slate-600"}`}
              >
                Meet your CodeTwin. A world-class IDE with a real-time AI mentor
                that understands your architectural intent. Debug, optimize, and
                learn as you build.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1">
                      Live Mentorship
                    </h4>
                    <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest leading-relaxed">
                      Neural analysis of every line of code.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1">
                      Project Context
                    </h4>
                    <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest leading-relaxed">
                      Full-stack awareness in a single IDE.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/code-twin"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/30"
              >
                Launch Code-Twin Studio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* High Fidelity Mockup */}
            <div className="flex-1 w-full max-w-2xl relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div
                className={`relative rounded-[3rem] border overflow-hidden shadow-2xl transition-all duration-700 ${isDark ? "bg-slate-950/80 border-white/5" : "bg-white border-slate-200"}`}
              >
                <div
                  className={`px-8 py-5 border-b flex items-center justify-between ${isDark ? "bg-slate-900 border-white/5" : "bg-slate-50 border-slate-100"}`}
                >
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 opacity-40 shrink-0" />
                    <div className="w-3 h-3 rounded-full bg-amber-400 opacity-40 shrink-0" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400 opacity-40 shrink-0" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest opacity-20 uppercase">
                    main_logic.js
                  </span>
                </div>
                <div className="flex h-[400px]">
                  <div className="flex-1 p-10 font-mono text-[11px] leading-8 opacity-40 italic">
                    <pre>{`// Neural Optimization
function skillBridge(user) {
  return AI.pair(user.logic);
}

// Experience it...`}</pre>
                  </div>
                  <div
                    className={`w-48 sm:w-64 border-l p-8 space-y-6 flex flex-col ${isDark ? "bg-slate-950/50" : "bg-white shadow-inner"} border-inherit`}
                  >
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-emerald-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
                        Mentor
                      </span>
                    </div>
                    <div
                      className={`p-5 rounded-2xl rounded-tl-none border text-[11px] font-bold leading-relaxed transition-all duration-1000 ${isDark ? "bg-slate-800 border-white/5 text-slate-100" : "bg-emerald-50 border-emerald-100 text-emerald-800 shadow-sm"}`}
                    >
                      "I suggest using a neural-map for this logic flow. Shall I
                      refactor it?"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Success - Modern Path Visual */}
      <section id="how-it-works" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase">
              Evolution Path
            </h2>
            <p className="max-w-xl mx-auto text-sm font-bold opacity-30 uppercase tracking-widest italic tracking-[0.3em]">
              Phase transition to job-readiness.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              {
                num: "01",
                title: "Defne Goal",
                desc: "Phase 1: Your neural career target.",
                icon: <Target className="w-8 h-8" />,
              },
              {
                num: "02",
                title: "Map Road",
                desc: "Phase 2: AI-sequenced learning path.",
                icon: <Brain className="w-8 h-8" />,
              },
              {
                num: "03",
                title: "Verify Proof",
                desc: "Phase 3: Verify skills with projects.",
                icon: <Award className="w-8 h-8" />,
              },
              {
                num: "04",
                title: "Bridge Entry",
                desc: "Phase 4: Direct job market integration.",
                icon: <Rocket className="w-8 h-8" />,
              },
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div
                  className={`w-24 h-24 rounded-[2.5rem] mx-auto mb-8 flex items-center justify-center border transition-all duration-700 group-hover:scale-110 group-hover:rotate-[15deg] ${isDark ? "bg-slate-900 border-white/5" : "bg-white border-slate-200 shadow-xl"}`}
                >
                  <div className="text-purple-500 scale-125">{step.icon}</div>
                </div>
                <span className="text-5xl font-black opacity-10 tracking-tighter mb-4 block group-hover:opacity-30 transition-opacity">
                  {step.num}
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest leading-relaxed max-w-[150px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`p-16 sm:p-24 rounded-[4rem] relative overflow-hidden text-center transition-all duration-1000 ${isDark ? "bg-slate-950 border border-white/5 shadow-2xl" : "bg-slate-950 text-white shadow-2xl"}`}
          >
            <div className="absolute inset-x-0 -top-20 -bottom-20 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-pink-600/20 opacity-30 blur-[100px]" />
            <div className="relative z-10 space-y-12">
              <h2 className="text-5xl sm:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.85] text-balance">
                Bridge your <br />
                <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent italic">
                  Limitless
                </span>{" "}
                potential.
              </h2>
              <p className="max-w-xl mx-auto text-lg sm:text-xl font-bold opacity-40 leading-relaxed tracking-tight">
                Join thousands of future professionals already building their
                dream careers with SkillBridge AI.
              </p>
              <div className="pt-6">
                <Link
                  href="/signup"
                  className="px-12 py-6 bg-white dark:bg-white text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
