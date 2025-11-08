"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Users,
  Target,
  Star,
  Bookmark,
  Share2,
  ArrowRight,
  Briefcase,
  Award,
  Globe,
  Cpu,
  Code,
  CheckCircle,
  Heart,
  Send,
  Play,
  ChevronDown,
  ExternalLink,
  Calendar,
  Shield,
  Zap,
  Sparkles,
  TrendingUp,
  MessageCircle,
  FileText,
  GitBranch,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function JobDetailsPage({ jobId }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);

  // Mock job data - in real app, this would come from props or API
  const job = {
    id: 1,
    title: "Senior React Developer",
    company: "TechInnovate Inc.",
    logo: "🚀",
    location: "San Francisco, CA",
    remote: true,
    type: "Full-time",
    experience: "5+ years",
    salary: "$120,000 - $160,000",
    posted: "2 hours ago",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "AWS",
      "GraphQL",
      "Jest",
      "Docker",
    ],
    match: 95,
    featured: true,
    urgent: true,
    applicants: 12,
    views: 245,

    // Detailed information
    description:
      "We're looking for a passionate Senior React Developer to join our innovative team building next-generation web applications. You'll work on challenging projects that impact millions of users worldwide.",

    responsibilities: [
      "Develop and maintain high-quality React applications",
      "Collaborate with cross-functional teams including designers and backend developers",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and provide constructive feedback",
      "Optimize applications for maximum performance and scalability",
      "Stay up-to-date with emerging technologies and industry trends",
    ],

    requirements: [
      "5+ years of professional experience with React",
      "Strong proficiency in TypeScript and modern JavaScript",
      "Experience with state management libraries (Redux, Zustand)",
      "Knowledge of testing frameworks (Jest, React Testing Library)",
      "Familiarity with CI/CD pipelines and DevOps practices",
      "Bachelor's degree in Computer Science or related field",
    ],

    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Unlimited PTO and paid parental leave",
      "401(k) with company matching",
    ],

    companyInfo: {
      name: "TechInnovate Inc.",
      description:
        "We're a fast-growing tech company building the future of digital experiences. Our platform serves over 10 million users worldwide.",
      size: "201-500 employees",
      founded: "2018",
      industry: "Technology",
      website: "https://techinnovate.com",
      culture: "Innovative, Collaborative, Fast-paced",
    },

    hiringProcess: [
      "Initial screening call (30 mins)",
      "Technical interview (60 mins)",
      "Take-home assignment",
      "On-site interview (3 hours)",
      "Final decision within 48 hours",
    ],
  };

  const similarJobs = [
    {
      id: 2,
      title: "Frontend Engineer",
      company: "DigitalDreams",
      location: "Remote",
      salary: "$110K - $150K",
      match: 88,
      urgent: false,
    },
    {
      id: 3,
      title: "React Native Developer",
      company: "MobileFirst",
      location: "New York, NY",
      salary: "$100K - $140K",
      match: 82,
      urgent: true,
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "StartUp Ventures",
      location: "Remote",
      salary: "$90K - $130K",
      match: 78,
      urgent: false,
    },
  ];

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    { id: "company", label: "Company", icon: <Building className="w-4 h-4" /> },
    { id: "benefits", label: "Benefits", icon: <Award className="w-4 h-4" /> },
    { id: "process", label: "Process", icon: <Target className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/jobsearch"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                isSaved
                  ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30"
                  : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 border border-slate-700"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-yellow-400" : ""}`}
              />
              {isSaved ? "Saved" : "Save"}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-all border border-slate-700">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Job Header */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-4xl border border-purple-500/20">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h1 className="text-3xl font-bold text-white">
                        {job.title}
                      </h1>
                      {job.featured && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-lg text-sm border border-yellow-500/30">
                          <Star className="w-4 h-4 fill-yellow-400" />
                          Featured
                        </div>
                      )}
                      {job.urgent && (
                        <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm border border-red-500/30 animate-pulse">
                          🔥 Urgent Hiring
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-gray-400 mb-3 flex-wrap">
                      <div className="flex items-center gap-2 font-medium">
                        <Building className="w-4 h-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                        {job.remote && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">
                            Remote OK
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-400 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {job.experience}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.posted}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                    <div className="relative flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <Target className="w-6 h-6 text-green-400" />
                      <span className="text-green-400 font-bold text-2xl">
                        {job.match}%
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm mt-2">
                    AI Match Score
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl text-sm border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-purple-500/20 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {job.applicants} applicants
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {job.views} views
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  High application rate
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 mb-6 bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all flex-1 justify-center ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Job Description
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {job.responsibilities.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {job.requirements.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Company Tab */}
              {activeTab === "company" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      About {job.companyInfo.name}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {job.companyInfo.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        Company Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-purple-500/20">
                          <span className="text-gray-400">Company Size</span>
                          <span className="text-white">
                            {job.companyInfo.size}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-purple-500/20">
                          <span className="text-gray-400">Founded</span>
                          <span className="text-white">
                            {job.companyInfo.founded}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-purple-500/20">
                          <span className="text-gray-400">Industry</span>
                          <span className="text-white">
                            {job.companyInfo.industry}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-purple-500/20">
                          <span className="text-gray-400">Culture</span>
                          <span className="text-white">
                            {job.companyInfo.culture}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        Company Links
                      </h3>
                      <div className="space-y-3">
                        <a
                          href={job.companyInfo.website}
                          className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all group"
                        >
                          <Globe className="w-5 h-5 text-purple-400" />
                          <span className="text-white group-hover:text-purple-300 transition-colors">
                            Company Website
                          </span>
                          <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                        </a>
                        <button className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all group w-full">
                          <Linkedin className="w-5 h-5 text-blue-400" />
                          <span className="text-white group-hover:text-blue-300 transition-colors">
                            LinkedIn Page
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Tab */}
              {activeTab === "benefits" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Compensation & Benefits
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {job.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-purple-500/20"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Why You'll Love Working Here
                    </h3>
                    <p className="text-gray-300">
                      Join a team that values innovation, collaboration, and
                      work-life balance. We're committed to your professional
                      growth and provide ample opportunities for learning and
                      advancement.
                    </p>
                  </div>
                </div>
              )}

              {/* Process Tab */}
              {activeTab === "process" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Hiring Process
                    </h2>
                    <div className="space-y-4">
                      {job.hiringProcess.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium mb-1">
                              {step}
                            </div>
                            <div className="text-gray-400 text-sm">
                              Typically takes{" "}
                              {index === 0
                                ? "1-2"
                                : index === 1
                                  ? "3-5"
                                  : "5-7"}{" "}
                              business days
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-800/50 rounded-xl border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      What to Expect
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        • Transparent communication throughout the process
                      </li>
                      <li>• Feedback provided after each stage</li>
                      <li>• Flexible scheduling for interviews</li>
                      <li>• Quick decision-making timeline</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready to Apply?
                </h3>
                <p className="text-gray-400 text-sm">
                  Your profile matches {job.match}% of requirements
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/jobsearch/apply`}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  Quick Apply
                </Link>
                <button className="w-full py-3.5 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Recruiter
                </button>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold text-sm">
                    Good Match
                  </span>
                </div>
                <p className="text-gray-400 text-xs">
                  Based on your skills and experience, you're a strong candidate
                  for this position.
                </p>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <div
                    key={similarJob.id}
                    className="p-4 bg-slate-800/50 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-white font-semibold text-sm mb-1">
                          {similarJob.title}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {similarJob.company}
                        </div>
                      </div>
                      {similarJob.urgent && (
                        <div className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30">
                          Urgent
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{similarJob.location}</span>
                      <span className="text-green-400 font-semibold">
                        {similarJob.match}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 bg-slate-800/50 border border-purple-500/20 text-white rounded-xl text-sm font-medium hover:bg-slate-800 hover:border-purple-500/40 transition-all">
                View All Similar Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
