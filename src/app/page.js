"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  Award,
  Briefcase,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Zap,
  Brain,
  Rocket,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import SharedCTABanner from "@/components/ui/CTABanner";
import { fetchProfile } from "@/store/slices/profileSlice";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function SkillBridgeLanding() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const { data } = useSession();
  const user = data?.user;

  const { data: profile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Career Path Mapper",
      description:
        "Get a personalized roadmap tailored to your dream career with AI-powered insights",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Skill Assessment",
      description:
        "Upload projects or take quizzes to get your skills evaluated by AI",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Learning Roadmap",
      description:
        "Step-by-step guidance with curated courses from top platforms",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Portfolio Builder",
      description:
        "Automatically generate stunning resumes and portfolios from verified skills",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Opportunity Bridge",
      description:
        "Connect with internships and jobs matched to your skill level",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Career Analytics",
      description:
        "Track your progress with detailed insights and career readiness scores",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Learners" },
    { value: "500+", label: "Career Paths" },
    { value: "95%", label: "Success Rate" },
    { value: "2K+", label: "Opportunities" },
  ];

  const updateStreak = async () => {
    try {
      await axios.post("/api/user/profile/streak");
    } catch (error) {
      console.log("Streak update failed:", error);
    }
  };

  useEffect(() => {
    updateStreak();
  }, []);

  useEffect(() => {
    if (user && !profile) {
      dispatch(fetchProfile());
    }
  }, [user, dispatch]);

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
            : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
        }`}
      >
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-8 backdrop-blur-sm ${
                  isDark
                    ? "bg-purple-500/20 border-purple-500/30"
                    : "bg-purple-100/80 border-purple-300/30"
                }`}
              >
                <Zap
                  className={`w-4 h-4 ${isDark ? "text-yellow-400" : "text-yellow-500"}`}
                />
                <span className="text-sm font-medium">
                  AI-Powered Career Growth Platform
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Bridge the gap between
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  {" "}
                  learning
                </span>
                <br />
                and
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  {" "}
                  earning
                </span>
              </h1>

              <p
                className={`text-xl mb-8 max-w-3xl mx-auto ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Your personal AI career counselor that guides you from learning
                to practice to employment. Discover trending skills, learn
                efficiently, and become job-ready.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  className={`px-8 py-4 border rounded-full font-semibold text-lg transition-all ${
                    isDark
                      ? "border-purple-500/50 hover:bg-purple-500/10"
                      : "border-purple-300/50 hover:bg-purple-50"
                  }`}
                >
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center p-6 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
                      : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
                  }`}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
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
          className={`py-20 px-4 sm:px-6 lg:px-8 ${
            isDark ? "bg-slate-900/30" : "bg-white/50"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl sm:text-5xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Everything you need to
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  succeed
                </span>
              </h2>
              <p
                className={`text-xl max-w-2xl mx-auto ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Powered by cutting-edge AI to personalize your learning journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`group p-8 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
                      : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/50 hover:shadow-xl hover:shadow-purple-300/20"
                  }`}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                      isDark
                        ? "from-purple-500/20 to-pink-500/20"
                        : "from-purple-100 to-pink-100"
                    }`}
                  >
                    <div className="text-purple-400">{feature.icon}</div>
                  </div>
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl sm:text-5xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Your path to
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  success
                </span>
              </h2>
              <p
                className={`text-xl max-w-2xl mx-auto ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Four simple steps to transform your career
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  num: "01",
                  title: "Set Your Goal",
                  desc: "Tell us your dream career",
                  icon: <Target className="w-8 h-8" />,
                },
                {
                  num: "02",
                  title: "Get Your Roadmap",
                  desc: "AI creates your learning path",
                  icon: <Brain className="w-8 h-8" />,
                },
                {
                  num: "03",
                  title: "Build & Verify",
                  desc: "Learn and prove your skills",
                  icon: <Award className="w-8 h-8" />,
                },
                {
                  num: "04",
                  title: "Land Your Job",
                  desc: "Connect with opportunities",
                  icon: <Rocket className="w-8 h-8" />,
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-6 border ${
                        isDark
                          ? "from-purple-500/20 to-pink-500/20 border-purple-500/30"
                          : "from-purple-100 to-pink-100 border-purple-300/30"
                      }`}
                    >
                      <div className="text-purple-400">{step.icon}</div>
                    </div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                      {step.num}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {step.desc}
                    </p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -translate-x-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
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
    </>
  );
}
