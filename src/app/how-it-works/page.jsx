"use client";
import React, { useState } from 'react';
import { 
  Target, Brain, Award, Rocket, 
  Zap, Sparkles, Users, Clock, 
  CheckCircle, Play, ArrowRight,
  BarChart3, Briefcase, BookOpen,
  Star, Shield, Globe
} from 'lucide-react';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      icon: <Target className="w-8 h-8" />,
      title: "Set Your Career Goal",
      description: "Tell us about your dream job, current skills, and career aspirations",
      details: [
        "AI analyzes 1000+ career paths",
        "Personalized goal setting",
        "Skill gap identification",
        "Industry trend matching"
      ],
      image: "🎯",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "02",
      icon: <Brain className="w-8 h-8" />,
      title: "Get AI-Powered Roadmap",
      description: "Receive a customized learning path with milestones and timelines",
      details: [
        "Personalized skill roadmap",
        "Milestone-based learning",
        "Real-time progress tracking",
        "Adaptive path adjustments"
      ],
      image: "🗺️",
      color: "from-blue-500 to-purple-500"
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
        "Peer code reviews"
      ],
      image: "🚀",
      color: "from-pink-500 to-purple-500"
    },
    {
      number: "04",
      icon: <Rocket className="w-8 h-8" />,
      title: "Land Your Dream Job",
      description: "Get matched with opportunities and ace interviews with AI coaching",
      details: [
        "AI-powered job matching",
        "Interview preparation",
        "Resume optimization",
        "Offer negotiation guidance"
      ],
      image: "💼",
      color: "from-green-500 to-blue-500"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Career Matching",
      description: "Smart algorithms match you with careers that fit your skills and interests",
      stat: "95% Accuracy"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed insights and recommendations",
      stat: "Real-time Tracking"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Job Readiness Score",
      description: "Know exactly when you're ready to apply with our readiness indicator",
      stat: "85% Success Rate"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Curated Learning",
      description: "Access the best resources from top platforms tailored to your path",
      stat: "500+ Courses"
    }
  ];

  const successMetrics = [
    { icon: <Users className="w-5 h-5" />, value: "10K+", label: "Career Transitions" },
    { icon: <Clock className="w-5 h-5" />, value: "3.2x", label: "Faster Hiring" },
    { icon: <Star className="w-5 h-5" />, value: "4.8/5", label: "User Rating" },
    { icon: <Award className="w-5 h-5" />, value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-24 pb-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/40 rounded-full mb-8 backdrop-blur-md shadow-lg shadow-purple-500/20 animate-pulse">
            <Sparkles className="w-4 h-4 text-purple-300 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-purple-200">Your Journey Starts Here</span>
            <Sparkles className="w-4 h-4 text-pink-300 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            How
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient"> SkillBridge </span>
            Works
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your career in <span className="text-purple-400 font-bold">4 simple steps</span> with AI-powered guidance. 
            <br className="hidden sm:block" />
            From learning to earning, we bridge the gap with personalized roadmaps.
          </p>

          {/* Success Metrics with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {successMetrics.map((metric, idx) => (
              <div 
                key={idx} 
                className="group text-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-purple-300 group-hover:text-purple-200 transition-colors">
                      {metric.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {metric.value}
                </div>
                <div className="text-gray-300 text-sm font-medium">{metric.label}</div>
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
                  className={`group p-7 rounded-3xl border backdrop-blur-md cursor-pointer transition-all duration-500 ${
                    activeStep === idx
                      ? 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-purple-400/70 shadow-2xl shadow-purple-500/30 scale-[1.02]'
                      : 'bg-slate-900/40 border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-900/60 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {step.number}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{step.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">{step.description}</p>
                      <div className="space-y-2.5">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm text-gray-200 group-hover:text-white transition-colors">
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
              <div className="bg-gradient-to-br from-slate-900/90 via-purple-900/30 to-slate-900/90 backdrop-blur-2xl border-2 border-purple-500/40 rounded-[2rem] p-10 shadow-2xl shadow-purple-500/20">
                <div className="text-center mb-8">
                  <div className="text-8xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>{steps[activeStep].image}</div>
                  <div className={`w-24 h-24 bg-gradient-to-br ${steps[activeStep].color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/40 animate-pulse`}>
                    <div className="text-white text-3xl font-black">
                      {steps[activeStep].number}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Step Visualization */}
                <div className="space-y-5">
                  <div className="flex justify-between text-sm font-semibold text-gray-300">
                    <span>Start</span>
                    <span>Complete</span>
                  </div>
                  <div className="relative w-full bg-slate-800/80 rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full transition-all duration-700 shadow-lg shadow-purple-500/50"
                      style={{ width: `${(activeStep + 1) * 25}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-purple-300">Step {activeStep + 1} of 4</span>
                    <span className="text-pink-300">{((activeStep + 1) * 25)}% Complete</span>
                  </div>
                </div>

                {/*  Demo CTA */}
                <button className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group">
                  <Play className="w-6 h-6 group-hover:scale-125 transition-transform" />
                  <span className="text-lg">Watch {steps[activeStep].title} Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  Key Features */}
        <div className="mb-24">
          <h2 className="text-4xl font-black text-white text-center mb-4">
            Why Choose
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"> SkillBridge?</span>
          </h2>
          <p className="text-gray-300 text-center text-lg mb-16 max-w-2xl mx-auto">
            Experience the power of AI-driven career transformation with cutting-edge features
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group relative p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border border-purple-500/30 rounded-3xl hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-purple-600/10 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <div className="text-purple-300 group-hover:text-purple-200 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{feature.description}</p>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
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
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-2xl border border-purple-500/30 rounded-[2rem] p-12 shadow-xl">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-10 h-10 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Verified Skills</h3>
                <p className="text-gray-300 leading-relaxed">Industry-recognized certifications and project verification</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Globe className="w-10 h-10 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Global Opportunities</h3>
                <p className="text-gray-300 leading-relaxed">Connect with companies worldwide through our partner network</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Community Support</h3>
                <p className="text-gray-300 leading-relaxed">Learn with peers and get mentorship from industry experts</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-[2rem] p-12 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners who transformed their careers with SkillBridge's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button className="px-10 py-5 bg-white text-purple-600 rounded-full font-black text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group">
                  Start Free Trial
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-5 border-2 border-white text-white rounded-full font-black text-lg hover:bg-white/10 transition-all">
                  Watch Platform Demo
                </button>
              </div>
              <p className="text-purple-100/90 text-sm mt-8 font-medium">
                No credit card required • 14-day free trial • Personalized onboarding
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}