"use client";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SharedCTABanner from "@/components/ui/CTABanner";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { fetchProfile } from "@/store/slices/profileSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function SkillBridgeLanding() {
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
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      {/* Background Pattern */}
      <BackgroundPattern />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700 ${isDark ? "bg-purple-500/20 border-purple-500/30 text-purple-200" : "bg-purple-100 border-purple-200 text-purple-700 shadow-sm"}`}
          >
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold">
              AI-Powered Career Growth Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Bridge the gap between <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              learning and earning
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Your personal AI career counselor that guides you from learning to
            practice to employment. Discover trending skills, learn efficiently,
            and become job-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link
              href="/signup"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className={`px-8 py-4 border rounded-2xl font-bold text-lg transition-all ${isDark ? "border-white/10 hover:bg-white/5 text-white" : "border-gray-200 hover:bg-gray-100 text-gray-900 shadow-sm"}`}
            >
              Explore Platform
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border backdrop-blur-sm transition-all hover:-translate-y-1 ${isDark ? "bg-slate-900/50 border-white/5" : "bg-white border-gray-100 shadow-sm"}`}
              >
                <div className="text-3xl font-bold text-purple-500 mb-1">
                  {stat.value}
                </div>
                <div
                  className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                Experience zero-latency pair programming with an AI that's
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
                      // AI pair programming...
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
                      "I've analyzed your logic and found a more efficient
                      approach..."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Success */}
      <section
        id="how-it-works"
        className="py-24 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your path to <span className="text-purple-500">success</span>
            </h2>
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-600"} font-medium`}
            >
              Four simple steps to transform your career
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Set Your Goal",
                desc: "Define your dream career",
                icon: <Target className="w-8 h-8" />,
              },
              {
                num: "02",
                title: "Get Your Roadmap",
                desc: "Custom AI-generated path",
                icon: <Brain className="w-8 h-8" />,
              },
              {
                num: "03",
                title: "Build & Verify",
                desc: "Prove skills with projects",
                icon: <Award className="w-8 h-8" />,
              },
              {
                num: "04",
                title: "Land Your Job",
                desc: "Connect with global roles",
                icon: <Rocket className="w-8 h-8" />,
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center group">
                <div
                  className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 ${isDark ? "bg-slate-900 border border-white/5" : "bg-white border border-gray-100 shadow-sm"}`}
                >
                  <div className="text-purple-500">{step.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-200 dark:text-gray-200/20 mb-2">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p
                  className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}
                >
                  {step.desc}
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
