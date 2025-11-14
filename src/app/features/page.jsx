"use client";
import React, { useState } from 'react';
import {
  Brain, Target, TrendingUp, Award, Briefcase, BarChart3,
  Zap, Sparkles, Users, Clock, Shield, Globe,
  CheckCircle, ArrowRight, Play, Star, Rocket,
  Code, BookOpen, Laptop, MessageSquare, GitBranch,
  Smartphone, Database, Cloud, Lock, Heart
} from 'lucide-react';
import { useSelector } from 'react-redux';
export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('ai');
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const categories = [
    { id: 'ai', name: 'AI Powered', icon: <Brain className="w-5 h-5" /> },
    { id: 'learning', name: 'Learning', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'career', name: 'Career', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'tools', name: 'Tools', icon: <Code className="w-5 h-5" /> },
  ];

  const features = {
    ai: [
      {
        icon: <Brain className="w-8 h-8" />,
        title: "AI Career Path Mapper",
        description: "Get personalized career roadmaps tailored to your goals, skills, and market demand",
        highlights: [
          "Personalized skill recommendations",
          "Market trend analysis",
          "Adaptive learning paths",
          "Real-time industry insights"
        ],
        image: "🧠",
        gradient: "from-purple-500 to-pink-500"
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Smart Skill Assessment",
        description: "AI-powered skill evaluation through projects, quizzes, and code analysis",
        highlights: [
          "Project-based evaluation",
          "Code quality analysis",
          "Progress benchmarking",
          "Skill gap identification"
        ],
        image: "⚡",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        icon: <Target className="w-8 h-8" />,
        title: "Predictive Job Matching",
        description: "Intelligent job matching based on your skills, preferences, and career trajectory",
        highlights: [
          "95% match accuracy",
          "Salary insights",
          "Company culture fit",
          "Growth opportunity analysis"
        ],
        image: "🎯",
        gradient: "from-green-500 to-emerald-500"
      }
    ],
    learning: [
      {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Personalized Learning Paths",
        description: "Adaptive learning journeys that evolve with your progress and goals",
        highlights: [
          "Custom course recommendations",
          "Progress-based adjustments",
          "Multi-format content",
          "Expert-curated resources"
        ],
        image: "📚",
        gradient: "from-purple-500 to-blue-500"
      },
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Progress Analytics",
        description: "Detailed insights into your learning journey with actionable recommendations",
        highlights: [
          "Real-time progress tracking",
          "Skill mastery visualization",
          "Learning efficiency metrics",
          "Personalized insights"
        ],
        image: "📊",
        gradient: "from-pink-500 to-red-500"
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Live Mentorship",
        description: "Connect with industry experts and peers for guided learning",
        highlights: [
          "1:1 mentorship sessions",
          "Peer code reviews",
          "Expert Q&A sessions",
          "Community learning"
        ],
        image: "👥",
        gradient: "from-orange-500 to-yellow-500"
      }
    ],
    career: [
      {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Portfolio Builder",
        description: "Create stunning portfolios that showcase your skills and projects",
        highlights: [
          "Auto-generated portfolios",
          "Project showcase",
          "Skill verification",
          "Custom domains"
        ],
        image: "💼",
        gradient: "from-cyan-500 to-blue-500"
      },
      {
        icon: <Award className="w-8 h-8" />,
        title: "Verified Certifications",
        description: "Industry-recognized certificates that validate your skills",
        highlights: [
          "Blockchain-verified credentials",
          "Skill endorsements",
          "Employer-recognized",
          "Shareable certificates"
        ],
        image: "🏆",
        gradient: "from-yellow-500 to-orange-500"
      },
      {
        icon: <BarChart3 className="w-8 h-8" />,
        title: "Career Analytics",
        description: "Comprehensive analytics to track your career growth and opportunities",
        highlights: [
          "Readiness scoring",
          "Market value estimation",
          "Interview performance",
          "Career trajectory"
        ],
        image: "📈",
        gradient: "from-green-500 to-teal-500"
      }
    ],
    tools: [
      {
        icon: <Code className="w-8 h-8" />,
        title: "Code Playground",
        description: "Built-in development environment for practicing and building projects",
        highlights: [
          "Multi-language support",
          "Real-time collaboration",
          "Project templates",
          "Code review tools"
        ],
        image: "💻",
        gradient: "from-gray-500 to-slate-600"
      },
      {
        icon: <GitBranch className="w-8 h-8" />,
        title: "Project Collaboration",
        description: "Collaborate on real-world projects with peers and mentors",
        highlights: [
          "Git integration",
          "Team projects",
          "Code review workflow",
          "Project management"
        ],
        image: "🔗",
        gradient: "from-purple-500 to-indigo-500"
      },
      {
        icon: <Smartphone className="w-8 h-8" />,
        title: "Mobile Learning",
        description: "Learn on the go with our fully-featured mobile experience",
        highlights: [
          "Offline learning",
          "Mobile code editor",
          "Push notifications",
          "Sync across devices"
        ],
        image: "📱",
        gradient: "from-blue-500 to-purple-500"
      }
    ]
  };

  const stats = [
    { value: "10x", label: "Faster Skill Acquisition", icon: <Zap className="w-5 h-5" /> },
    { value: "95%", label: "Career Success Rate", icon: <Target className="w-5 h-5" /> },
    { value: "500+", label: "Learning Paths", icon: <BookOpen className="w-5 h-5" /> },
    { value: "50K+", label: "Skills Verified", icon: <Award className="w-5 h-5" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      company: "TechSolutions Inc.",
      content: "SkillBridge helped me transition from marketing to tech in 6 months. The AI roadmap was incredibly accurate!",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Data Scientist",
      company: "DataCorp",
      content: "The personalized learning path and project-based approach helped me build a portfolio that impressed recruiters.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Frontend Engineer",
      company: "DigitalAgency",
      content: "Landed my dream job with a 40% salary increase. The career readiness score gave me the confidence to apply.",
      avatar: "PP",
      rating: 5
    }
  ];

 return (
    <div className={`min-h-screen pt-20 pb-12 transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white" 
        : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
    }`}>
      {/* Background Pattern */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark 
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isDark ? "bg-purple-500/10" : "bg-purple-500/5"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDark ? "bg-pink-500/10" : "bg-pink-500/5"
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 backdrop-blur-sm ${
            isDark
              ? "bg-purple-500/20 border-purple-500/30"
              : "bg-purple-100/80 border-purple-300/30"
          }`}>
            <Rocket className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <span className={`text-sm font-medium ${
              isDark ? "text-purple-300" : "text-purple-700"
            }`}>Powerful Features</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Succeed</span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            Discover how SkillBridge's AI-powered platform transforms your learning journey and accelerates your career growth
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center p-4 backdrop-blur-sm border rounded-xl ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}>
                <div className="flex justify-center mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark
                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                      : "bg-gradient-to-br from-purple-100 to-pink-100"
                  }`}>
                    <div className={isDark ? "text-purple-400" : "text-purple-600"}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                  : `${
                      isDark
                        ? 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 border border-slate-700'
                        : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
                    }`
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features[activeCategory].map((feature, index) => (
            <div
              key={index}
              className={`group backdrop-blur-sm border rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
                  : "bg-white/80 border-purple-300/20 hover:border-purple-300/50 hover:shadow-xl hover:shadow-purple-300/20"
              }`}
            >
              {/* Feature Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <div className="text-4xl">{feature.image}</div>
              </div>

              {/* Feature Content */}
              <h3 className={`text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {feature.title}
              </h3>
              <p className={`mb-6 leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                {feature.highlights.map((highlight, i) => (
                  <div key={i} className={`flex items-center gap-2 text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className={`w-full py-2.5 rounded-lg font-semibold transition-all border flex items-center justify-center gap-2 group-hover:border-purple-500/40 ${
                isDark
                  ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}>
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Loved by
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Thousands</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              See how SkillBridge has transformed careers and accelerated learning journeys
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isDark
                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30"
                      : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/30"
                  }`}>
                    <span className={`font-bold text-sm ${
                      isDark ? "text-purple-300" : "text-purple-600"
                    }`}>{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>{testimonial.name}</div>
                    <div className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}>{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
                <p className={`mb-4 leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}>"{testimonial.content}"</p>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
            <div className={`absolute inset-0 ${
              isDark
                ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
                : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"
            }`} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who are already accelerating their careers with SkillBridge's powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
              <p className="text-purple-200/80 text-sm mt-6">
                No credit card required • 14-day free trial • All features included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}