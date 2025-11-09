"use client";
import React, { useState } from 'react';
import {
  Target, Brain, Award, Rocket, TrendingUp,
  BookOpen, Clock, Users, Zap, Sparkles,
  CheckCircle, Play, ArrowRight, Star, Shield,
  Briefcase, Code, Palette, BarChart3, Cpu,
  GitBranch, Database, Cloud, Smartphone, Globe,
  Heart, MessageCircle, Share2, Download, Calendar,DollarSign
} from 'lucide-react';

export default function CareerPathPage() {
  const [activePath, setActivePath] = useState('frontend');
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const careerPaths = [
    {
      id: 'frontend',
      name: 'Frontend Developer',
      icon: <Code className="w-6 h-6" />,
      description: 'Build interactive user interfaces and web applications',
      demand: 'High',
      salary: '$85K - $150K',
      growth: '22%',
      popularity: 95,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'backend',
      name: 'Backend Developer',
      icon: <Database className="w-6 h-6" />,
      description: 'Develop server-side logic and database architecture',
      demand: 'Very High',
      salary: '$90K - $160K',
      growth: '25%',
      popularity: 92,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'fullstack',
      name: 'Full Stack Developer',
      icon: <Cpu className="w-6 h-6" />,
      description: 'Master both frontend and backend technologies',
      demand: 'Extreme',
      salary: '$95K - $170K',
      growth: '28%',
      popularity: 98,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'mobile',
      name: 'Mobile Developer',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Create native and cross-platform mobile apps',
      demand: 'High',
      salary: '$80K - $140K',
      growth: '20%',
      popularity: 88,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'devops',
      name: 'DevOps Engineer',
      icon: <Cloud className="w-6 h-6" />,
      description: 'Manage infrastructure and deployment pipelines',
      demand: 'Very High',
      salary: '$100K - $180K',
      growth: '30%',
      popularity: 90,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'ai-ml',
      name: 'AI/ML Engineer',
      icon: <Brain className="w-6 h-6" />,
      description: 'Build intelligent systems and machine learning models',
      demand: 'Extreme',
      salary: '$120K - $200K',
      growth: '35%',
      popularity: 96,
      color: 'from-purple-500 to-blue-500'
    }
  ];

  const pathDetails = {
    frontend: {
      overview: "Frontend developers are responsible for creating the visual and interactive elements of websites and web applications that users see and interact with directly.",
      timeline: "6-12 months to job-ready",
      difficulty: "Intermediate",
      skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Responsive Design", "UI/UX Principles"],
      milestones: [
        {
          title: "Web Fundamentals",
          duration: "1-2 months",
          progress: 100,
          skills: ["HTML5", "CSS3", "Git", "Basic JavaScript"],
          resources: 12,
          completed: true
        },
        {
          title: "JavaScript Mastery",
          duration: "2-3 months",
          progress: 85,
          skills: ["ES6+", "DOM Manipulation", "Async Programming", "APIs"],
          resources: 18,
          completed: false
        },
        {
          title: "React & Modern Frameworks",
          duration: "3-4 months",
          progress: 60,
          skills: ["React", "State Management", "React Router", "Testing"],
          resources: 24,
          completed: false
        },
        {
          title: "Advanced Concepts",
          duration: "2-3 months",
          progress: 20,
          skills: ["TypeScript", "Performance", "Accessibility", "PWA"],
          resources: 16,
          completed: false
        },
        {
          title: "Portfolio & Job Ready",
          duration: "1-2 months",
          progress: 10,
          skills: ["Projects", "Interview Prep", "Resume Building"],
          resources: 8,
          completed: false
        }
      ],
      jobOpportunities: [
        { role: "Junior Frontend Developer", companies: 234, avgSalary: "$85,000" },
        { role: "Frontend Developer", companies: 567, avgSalary: "$110,000" },
        { role: "Senior Frontend Developer", companies: 189, avgSalary: "$145,000" },
        { role: "Frontend Architect", companies: 45, avgSalary: "$180,000" }
      ]
    },
    backend: {
      overview: "Backend developers focus on server-side development, working with databases, APIs, and application logic that power web applications behind the scenes.",
      timeline: "8-14 months to job-ready",
      difficulty: "Intermediate",
      skills: ["Node.js", "Python", "Databases", "APIs", "Authentication", "Deployment"],
      milestones: [
        {
          title: "Programming Fundamentals",
          duration: "2-3 months",
          progress: 100,
          skills: ["Python/JavaScript", "Data Structures", "Algorithms"],
          resources: 15,
          completed: true
        },
        {
          title: "Backend Basics",
          duration: "3-4 months",
          progress: 75,
          skills: ["Node.js/Express", "REST APIs", "Database Design"],
          resources: 20,
          completed: false
        },
        {
          title: "Advanced Backend",
          duration: "3-4 months",
          progress: 40,
          skills: ["Authentication", "Caching", "Microservices"],
          resources: 18,
          completed: false
        },
        {
          title: "DevOps & Deployment",
          duration: "2-3 months",
          progress: 15,
          skills: ["Docker", "AWS", "CI/CD", "Monitoring"],
          resources: 14,
          completed: false
        }
      ],
      jobOpportunities: [
        { role: "Junior Backend Developer", companies: 198, avgSalary: "$90,000" },
        { role: "Backend Developer", companies: 432, avgSalary: "$120,000" },
        { role: "Senior Backend Developer", companies: 234, avgSalary: "$155,000" },
        { role: "Backend Architect", companies: 67, avgSalary: "$190,000" }
      ]
    }
  };

  const currentPath = careerPaths.find(path => path.id === activePath);
  const currentDetails = pathDetails[activePath] || pathDetails.frontend;

  const stats = [
    { value: "95%", label: "Success Rate", icon: <Target className="w-5 h-5" /> },
    { value: "6-12mo", label: "Avg. Timeline", icon: <Clock className="w-5 h-5" /> },
    { value: "2.3K+", label: "Career Switchers", icon: <Users className="w-5 h-5" /> },
    { value: "$85K+", label: "Starting Salary", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Career Guidance</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Career Path</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Discover personalized learning journeys and master the skills needed for your dream tech career
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <div className="text-purple-400">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Career Paths Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Career Paths
              </h3>
              <div className="space-y-2">
                {careerPaths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setActivePath(path.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                      activePath === path.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center`}>
                      <div className="text-white">
                        {path.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{path.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{path.description}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {path.popularity}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                AI Recommendation
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Best Match</span>
                  <span className="text-white font-semibold">Full Stack</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Based on</span>
                  <span className="text-white font-semibold">Your Skills</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Confidence</span>
                  <span className="text-green-400 font-semibold">92%</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                <Brain className="w-4 h-4" />
                Get Personalized Path
              </button>
            </div>
          </div>

          {/* Path Details */}
          <div className="lg:col-span-3">
            {/* Path Header */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${currentPath.color} rounded-2xl flex items-center justify-center`}>
                    <div className="text-white text-2xl">
                      {currentPath.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{currentPath.name}</h2>
                    <p className="text-gray-400 text-lg mb-4">{currentPath.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-white">{currentPath.demand} Demand</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                        <span className="text-white">{currentPath.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-white">{currentPath.growth} Growth</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {currentPath.popularity}%
                  </div>
                  <div className="text-gray-400 text-sm">Popularity Score</div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-purple-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{currentDetails.timeline}</div>
                  <div className="text-gray-400 text-sm">Estimated Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{currentDetails.difficulty}</div>
                  <div className="text-gray-400 text-sm">Difficulty Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{currentDetails.skills.length}</div>
                  <div className="text-gray-400 text-sm">Key Skills</div>
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-400" />
                Learning Path
              </h3>

              <div className="space-y-6">
                {currentDetails.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex gap-6 p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedMilestone === index
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'
                        : 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40'
                    }`}
                    onClick={() => setSelectedMilestone(index)}
                  >
                    {/* Step Number */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        milestone.completed
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : milestone.progress > 0
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-slate-700 text-gray-400 border border-slate-600'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < currentDetails.milestones.length - 1 && (
                        <div className="w-0.5 h-12 bg-purple-500/20 mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{milestone.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {milestone.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {milestone.resources} resources
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white mb-1">{milestone.progress}%</div>
                          <div className="text-gray-400 text-sm">Complete</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {milestone.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-sm border border-purple-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-4">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 text-sm">
                          <Play className="w-4 h-4" />
                          Start Learning
                        </button>
                        <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4" />
                          View Resources
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Opportunities */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-400" />
                Career Opportunities
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {currentDetails.jobOpportunities.map((job, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{job.role}</h4>
                      <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">
                        {job.companies}+ companies
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Average Salary</span>
                      <span className="text-yellow-400 font-semibold">{job.avgSalary}</span>
                    </div>
                    <button className="w-full mt-4 py-2 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all text-sm">
                      Explore Jobs
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Brain className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">AI Career Assessment</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Take our AI-powered assessment to get a personalized career path tailored to your skills and goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Career Assessment
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}