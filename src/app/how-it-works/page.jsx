"use client";
import React, { useState } from "react";
import {
  Target,
  Brain,
  Award,
  Rocket,
  Zap,
  Sparkles,
  Users,
  Clock,
  CheckCircle,
  Play,
  ArrowRight,
  BarChart3,
  Briefcase,
  BookOpen,
  Star,
  Shield,
  Globe,
} from "lucide-react";
import { useSelector } from "react-redux";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import SharedCTABanner from "@/components/ui/CTABanner";

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const steps = [
    {
      number: "01",
      icon: <Target className="w-8 h-8" />,
      title: "Set Your Career Goal",
      description:
        "Tell us about your dream job, current skills, and career aspirations",
      details: [
        "AI analyzes 1000+ career paths",
        "Personalized goal setting",
        "Skill gap identification",
        "Industry trend matching",
      ],
      image: "🎯",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "02",
      icon: <Brain className="w-8 h-8" />,
      title: "Get AI-Powered Roadmap",
      description:
        "Receive a customized learning path with milestones and timelines",
      details: [
        "Personalized skill roadmap",
        "Milestone-based learning",
        "Real-time progress tracking",
        "Adaptive path adjustments",
      ],
      image: "🗺️",
      color: "from-blue-500 to-purple-500",
    },
    {
      number: "03",
      icon: <Award className="w-8 h-8" />,
      title: "Learn & Build Skills",
      description: "Access curated courses, projects, and skill assessments",
      details: [
        "Hands-on project work",
        "Skill verification tests",
        "Portfolio building",
        "Peer code reviews",
      ],
      image: "🚀",
      color: "from-pink-500 to-purple-500",
    },
    {
      number: "04",
      icon: <Rocket className="w-8 h-8" />,
      title: "Land Your Dream Job",
      description:
        "Get matched with opportunities and ace interviews with AI coaching",
      details: [
        "AI-powered job matching",
        "Interview preparation",
        "Resume optimization",
        "Offer negotiation guidance",
      ],
      image: "💼",
      color: "from-green-500 to-blue-500",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Career Matching",
      description:
        "Smart algorithms match you with careers that fit your skills and interests",
      stat: "95% Accuracy",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Analytics",
      description:
        "Track your learning journey with detailed insights and recommendations",
      stat: "Real-time Tracking",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Job Readiness Score",
      description:
        "Know exactly when you're ready to apply with our readiness indicator",
      stat: "85% Success Rate",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Curated Learning",
      description:
        "Access the best resources from top platforms tailored to your path",
      stat: "500+ Courses",
    },
  ];

  const successMetrics = [
    {
      icon: <Users className="w-5 h-5" />,
      value: "10K+",
      label: "Career Transitions",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      value: "3.2x",
      label: "Faster Hiring",
    },
    {
      icon: <Star className="w-5 h-5" />,
      value: "4.8/5",
      label: "User Rating",
    },
    {
      icon: <Award className="w-5 h-5" />,
      value: "95%",
      label: "Success Rate",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      } pt-24 pb-20`}
    >
      {/* Background Pattern */}
      <BackgroundPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-full mb-8 backdrop-blur-sm ${
              isDark
                ? "bg-purple-500/20 border-purple-500/30"
                : "bg-purple-100/80 border-purple-300/30"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 ${isDark ? "text-purple-300" : "text-purple-500"}`}
            />
            <span
              className={`text-sm font-semibold ${isDark ? "text-purple-200" : "text-purple-700"}`}
            >
              Your Journey Starts Here
            </span>
            <Sparkles
              className={`w-4 h-4 ${isDark ? "text-pink-300" : "text-pink-500"}`}
            />
          </div>

          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            How
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              {" "}
              UpSkaleAI{" "}
            </span>
            Works
          </h1>

          <p
            className={`text-xl sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Transform your career in{" "}
            <span className="text-purple-400 font-bold">4 simple steps</span>{" "}
            with AI-powered guidance.
            <br className="hidden sm:block" />
            From learning to earning, we bridge the gap with personalized
            roadmaps.
          </p>

          {/* Success Metrics with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {successMetrics.map((metric, idx) => (
              <div
                key={idx}
                className={`group text-center p-6 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                  isDark
                    ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30"
                    : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/30 hover:border-purple-300/60 hover:shadow-2xl hover:shadow-purple-300/30"
                }`}
              >
                <div className="flex justify-center mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                      isDark
                        ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30"
                        : "bg-gradient-to-br from-purple-100 to-pink-100"
                    }`}
                  >
                    <div
                      className={`transition-colors ${
                        isDark
                          ? "text-purple-300 group-hover:text-purple-200"
                          : "text-purple-500 group-hover:text-purple-600"
                      }`}
                    >
                      {metric.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {metric.value}
                </div>
                <div
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Steps Section */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Steps Navigation */}
            <div className="space-y-5">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`group p-7 rounded-3xl border backdrop-blur-sm cursor-pointer transition-all duration-500 ${
                    activeStep === idx
                      ? `scale-[1.02] ${
                          isDark
                            ? "bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-purple-400/70 shadow-2xl shadow-purple-500/30"
                            : "bg-gradient-to-br from-white/90 to-white/70 border-purple-400/70 shadow-2xl shadow-purple-500/20"
                        }`
                      : `${
                          isDark
                            ? "bg-slate-900/40 border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-900/60"
                            : "bg-white/40 border-purple-300/20 hover:border-purple-300/50 hover:bg-white/60"
                        } hover:scale-[1.01]`
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {step.number}
                        </span>
                        <h3
                          className={`text-xl font-bold group-hover:text-purple-300 transition-colors ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        className={`mb-4 leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {step.description}
                      </p>
                      <div className="space-y-2.5">
                        {step.details.map((detail, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2.5 text-sm transition-colors ${
                              isDark
                                ? "text-gray-200 group-hover:text-white"
                                : "text-gray-700 group-hover:text-gray-900"
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="font-medium">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Visualization */}
            <div className="relative lg:sticky lg:top-24">
              <div
                className={`backdrop-blur-2xl border-2 rounded-[2rem] p-10 shadow-2xl ${
                  isDark
                    ? "bg-gradient-to-br from-slate-900/90 via-purple-900/30 to-slate-900/90 border-purple-500/40 shadow-purple-500/20"
                    : "bg-gradient-to-br from-white/90 via-purple-50/30 to-white/90 border-purple-300/40 shadow-purple-300/20"
                }`}
              >
                <div className="text-center mb-8">
                  <div
                    className="text-8xl mb-6 animate-bounce"
                    style={{ animationDuration: "2s" }}
                  >
                    {steps[activeStep].image}
                  </div>
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${steps[activeStep].color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl ${
                      isDark ? "shadow-purple-500/40" : "shadow-purple-300/40"
                    } animate-pulse`}
                  >
                    <div className="text-white text-3xl font-black">
                      {steps[activeStep].number}
                    </div>
                  </div>
                  <h3
                    className={`text-3xl font-black mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {steps[activeStep].title}
                  </h3>
                  <p
                    className={`text-lg leading-relaxed ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Step Visualization */}
                <div className="space-y-5">
                  <div
                    className={`flex justify-between text-sm font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span>Start</span>
                    <span>Complete</span>
                  </div>
                  <div
                    className={`relative w-full rounded-full h-3 overflow-hidden shadow-inner ${
                      isDark ? "bg-slate-800/80" : "bg-gray-200/80"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full transition-all duration-700 shadow-lg shadow-purple-500/50"
                      style={{ width: `${(activeStep + 1) * 25}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-purple-300">
                      Step {activeStep + 1} of 4
                    </span>
                    <span className="text-pink-300">
                      {(activeStep + 1) * 25}% Complete
                    </span>
                  </div>
                </div>

                {/* Demo CTA */}
                <button className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group">
                  <Play className="w-6 h-6 group-hover:scale-125 transition-transform" />
                  <span className="text-lg">
                    Watch {steps[activeStep].title} Demo
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-24">
          <h2
            className={`text-4xl font-black text-center mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Why Choose
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              UpSkaleAI?
            </span>
          </h2>
          <p
            className={`text-center text-lg mb-16 max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Experience the power of AI-driven career transformation with
            cutting-edge features
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`group relative p-8 backdrop-blur-sm border rounded-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  isDark
                    ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30"
                    : "bg-gradient-to-br from-white/80 to-white/60 border-purple-300/30 hover:border-purple-300/60 hover:shadow-2xl hover:shadow-purple-300/30"
                }`}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isDark
                      ? "bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-purple-600/10"
                      : "bg-gradient-to-br from-purple-100/0 via-pink-100/0 to-purple-100/0 group-hover:from-purple-100/50 group-hover:via-pink-100/50 group-hover:to-purple-100/50"
                  }`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg ${
                      isDark
                        ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30"
                        : "bg-gradient-to-br from-purple-100 to-pink-100"
                    }`}
                  >
                    <div
                      className={`transition-colors ${
                        isDark
                          ? "text-purple-300 group-hover:text-purple-200"
                          : "text-purple-500 group-hover:text-purple-600"
                      }`}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3
                    className={`text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm mb-4 leading-relaxed ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                  <div
                    className={`inline-block px-4 py-2 rounded-full ${
                      isDark
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                        : "bg-gradient-to-r from-purple-100 to-pink-100"
                    }`}
                  >
                    <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {feature.stat}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-24">
          <div
            className={`backdrop-blur-2xl border rounded-[2rem] p-12 shadow-xl ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/60 border-purple-300/30"
            }`}
          >
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center group">
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                    isDark
                      ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30"
                      : "bg-gradient-to-br from-purple-100 to-pink-100"
                  }`}
                >
                  <Shield
                    className={`w-10 h-10 ${
                      isDark ? "text-purple-300" : "text-purple-500"
                    }`}
                  />
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Verified Skills
                </h3>
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Industry-recognized certifications and project verification
                </p>
              </div>
              <div className="text-center group">
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                    isDark
                      ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30"
                      : "bg-gradient-to-br from-purple-100 to-pink-100"
                  }`}
                >
                  <Globe
                    className={`w-10 h-10 ${
                      isDark ? "text-purple-300" : "text-purple-500"
                    }`}
                  />
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Global Opportunities
                </h3>
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Connect with companies worldwide through our partner network
                </p>
              </div>
              <div className="text-center group">
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                    isDark
                      ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30"
                      : "bg-gradient-to-br from-purple-100 to-pink-100"
                  }`}
                >
                  <Users
                    className={`w-10 h-10 ${
                      isDark ? "text-purple-300" : "text-purple-500"
                    }`}
                  />
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Community Support
                </h3>
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Learn with peers and get mentorship from industry experts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <SharedCTABanner
            isDark={isDark}
            className="rounded-[2rem] shadow-2xl"
            title="Ready to Start Your Journey?"
            subtitle="Join thousands of learners who transformed their careers with UpSkaleAI's AI-powered platform."
            primaryBtn={{
              text: "Start Free Trial",
              icon: (
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              ),
              onClick: () => {},
            }}
            secondaryBtn={{
              text: "Watch Platform Demo",
              onClick: () => {},
            }}
          >
            <p className="text-purple-100/90 text-sm mt-8 font-medium">
              No credit card required • 14-day free trial • Personalized
              onboarding
            </p>
          </SharedCTABanner>
        </div>
      </div>
    </div>
  );
}
