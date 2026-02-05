"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  Award,
  Briefcase,
  BarChart3,
  TrendingUp,
  Brain,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SharedCTABanner from "@/components/ui/CTABanner";
import FaqSection from "@/components/landing/FaqSection";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import HeroSection from "@/components/landing/HeroSection";
import { fetchProfile } from "@/store/slices/profileSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
import JobSearch from "@/components/landing/JobSearch";
import PathToSuccess from "@/components/landing/PathToSuccess";
import CodeTwinFeatured from "@/components/landing/CodeTwinFeatured";
import AiTools from "@/components/landing/AiTools";
import Features from "@/components/landing/Features";

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
      <Features isDark={isDark} features={features} />
      {/* AI Tools Section */}
      <AiTools isDark={isDark} stats={stats} />
      {/* CodeTwin Featured Section */}
      <CodeTwinFeatured isDark={isDark} />
      {/* Job Search Featured Section */}
      <JobSearch isDark={isDark} />
      {/* Path to Success */}
      <PathToSuccess isDark={isDark} />
      {/* FAQ Section */}
      <FaqSection isDark={isDark} />
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
