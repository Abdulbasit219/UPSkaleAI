"use client";
import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, Award, Target, Clock, 
  Zap, Sparkles, BarChart3, Activity, Trophy,
  CheckCircle2, Calendar, Brain, Rocket, Star,
  BookOpen, Code, Briefcase, Users, ArrowUp,
  ArrowDown, Download, Share2, RefreshCw, Eye,
  Crown, Flame, Package, FileText, ChevronRight,  
  CircleDot, ChevronDown, Minus
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const timeRanges = ['week', 'month', 'quarter', 'year'];
  const categories = ['all', 'skills', 'learning', 'jobs', 'portfolio'];

  // Mock Data
  const overallStats = {
    careerReadiness: 78,
    skillsLearned: 24,
    coursesCompleted: 12,
    jobsApplied: 18,
    interviewsScheduled: 5,
    portfolioProjects: 8,
    learningStreak: 15,
    totalHours: 127
  };

  const progressCards = [
    {
      title: 'Career Readiness',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Overall job readiness score'
    },
    {
      title: 'Skills Mastered',
      value: '24',
      change: '+8',
      trend: 'up',
      icon: <Award className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Skills you\'ve completed'
    },
    {
      title: 'Learning Streak',
      value: '15 days',
      change: 'Active',
      trend: 'up',
      icon: <Flame className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      description: 'Consecutive learning days'
    },
    {
      title: 'Jobs Applied',
      value: '18',
      change: '+5',
      trend: 'up',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Applications this month'
    }
  ];

  const skillProgress = [
    { name: 'React.js', level: 85, progress: 85, status: 'advanced', category: 'Frontend', hours: 45 },
    { name: 'Node.js', level: 72, progress: 72, status: 'intermediate', category: 'Backend', hours: 32 },
    { name: 'TypeScript', level: 68, progress: 68, status: 'intermediate', category: 'Language', hours: 28 },
    { name: 'Python', level: 90, progress: 90, status: 'advanced', category: 'Language', hours: 52 },
    { name: 'AWS', level: 55, progress: 55, status: 'beginner', category: 'Cloud', hours: 18 },
    { name: 'Docker', level: 62, progress: 62, status: 'intermediate', category: 'DevOps', hours: 24 }
  ];

  const recentActivity = [
    { type: 'achievement', title: 'Completed "Advanced React" Course', time: '2 hours ago', icon: <Trophy className="w-4 h-4" />, color: 'text-yellow-400' },
    { type: 'job', title: 'Applied to Senior Developer at TechCorp', time: '5 hours ago', icon: <Briefcase className="w-4 h-4" />, color: 'text-blue-400' },
    { type: 'skill', title: 'Mastered TypeScript Advanced Patterns', time: '1 day ago', icon: <Code className="w-4 h-4" />, color: 'text-green-400' },
    { type: 'project', title: 'Added E-commerce Project to Portfolio', time: '2 days ago', icon: <Package className="w-4 h-4" />, color: 'text-purple-400' },
    { type: 'assessment', title: 'Scored 92% in React Assessment', time: '3 days ago', icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-400' },
    { type: 'learning', title: 'Started "AWS Fundamentals" Course', time: '4 days ago', icon: <BookOpen className="w-4 h-4" />, color: 'text-cyan-400' }
  ];

  const learningPath = [
    { month: 'Jan', skills: 3, hours: 18, completed: true },
    { month: 'Feb', skills: 4, hours: 24, completed: true },
    { month: 'Mar', skills: 5, hours: 32, completed: true },
    { month: 'Apr', skills: 6, hours: 28, completed: true },
    { month: 'May', skills: 4, hours: 25, completed: false },
    { month: 'Jun', skills: 2, hours: 0, completed: false }
  ];

  const upcomingMilestones = [
    { title: 'Complete Frontend Mastery Path', progress: 75, dueDate: '2 weeks', icon: <Code className="w-5 h-5" />, priority: 'high' },
    { title: 'Get 3 Interview Callbacks', progress: 60, dueDate: '1 month', icon: <Users className="w-5 h-5" />, priority: 'medium' },
    { title: 'Build 10 Portfolio Projects', progress: 80, dueDate: '3 weeks', icon: <Package className="w-5 h-5" />, priority: 'high' },
    { title: 'Achieve 90% Career Readiness', progress: 78, dueDate: '2 months', icon: <Target className="w-5 h-5" />, priority: 'medium' }
  ];

  const achievements = [
    { title: 'Fast Learner', description: 'Completed 5 courses in a month', icon: <Rocket className="w-6 h-6" />, unlocked: true, rarity: 'rare' },
    { title: 'Code Master', description: 'Mastered 10 programming skills', icon: <Code className="w-6 h-6" />, unlocked: true, rarity: 'epic' },
    { title: 'Consistent Learner', description: '30-day learning streak', icon: <Flame className="w-6 h-6" />, unlocked: false, rarity: 'legendary' },
    { title: 'Job Seeker Pro', description: 'Applied to 50+ jobs', icon: <Briefcase className="w-6 h-6" />, unlocked: false, rarity: 'rare' },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 3.9 },
    { day: 'Sat', hours: 6.2 },
    { day: 'Sun', hours: 4.5 }
  ];

  const getSkillColor = (level) => {
    if (level >= 80) return 'from-green-500 to-emerald-500';
    if (level >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-blue-500 to-cyan-500';
  };

  const getStatusBadge = (status) => {
    const badges = {
      advanced: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Advanced' },
      intermediate: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Intermediate' },
      beginner: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Beginner' }
    };
    return badges[status];
  };

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-20 pb-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-4 backdrop-blur-sm">
                <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Your Progress Dashboard
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Analytics
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Overview</span>
              </h1>
              <p className="text-gray-400">Track your learning journey and career progress</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-xl p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>

              <button className="p-3 bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-xl text-gray-400 hover:text-white transition-all hover:border-purple-500/50">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {progressCards.map((card, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center opacity-80`}>
                    <div className="text-white">{card.icon}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    card.trend === 'up' ? 'text-green-400' : card.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {card.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : card.trend === 'down' ? <ArrowDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                    {card.change}
                  </div>
                </div>

                <h3 className="text-sm text-gray-400 mb-1">{card.title}</h3>
                <p className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent mb-2`}>
                  {card.value}
                </p>
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Skill Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Activity Chart */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  Weekly Activity
                </h2>
                <span className="text-sm text-gray-400">{overallStats.totalHours} hours total</span>
              </div>

              <div className="flex items-end justify-between gap-3 h-48">
                {weeklyActivity.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full bg-slate-800/50 rounded-t-lg overflow-hidden" style={{ height: `${(day.hours / maxHours) * 100}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500 to-pink-500 opacity-80"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{day.hours}h</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Progress */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-400" />
                Skills Progress
              </h2>

              <div className="space-y-4">
                {skillProgress.map((skill, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${getSkillColor(skill.level)} rounded-lg flex items-center justify-center opacity-80`}>
                          <Code className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{skill.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{skill.category}</span>
                            <span>•</span>
                            <span>{skill.hours}h practiced</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-lg text-xs border ${getStatusBadge(skill.status).color}`}>
                          {getStatusBadge(skill.status).label}
                        </span>
                        <span className={`text-lg font-bold bg-gradient-to-r ${getSkillColor(skill.level)} bg-clip-text text-transparent`}>
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full transition-all duration-500`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Path Timeline */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-400" />
                Learning Journey
              </h2>

              <div className="flex items-center justify-between gap-4">
                {learningPath.map((month, idx) => (
                  <div key={idx} className="flex-1">
                    <div className="text-center mb-3">
                      <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                        month.completed 
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30' 
                          : 'bg-slate-800/50 border-2 border-slate-700'
                      }`}>
                        {month.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <CircleDot className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-white">{month.month}</span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">{month.skills} skills</p>
                      <p className="text-xs text-gray-500">{month.hours}h</p>
                    </div>
                    {idx < learningPath.length - 1 && (
                      <div className={`h-0.5 mt-[-30px] mb-[-30px] ${
                        month.completed && learningPath[idx + 1].completed 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-slate-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Milestones */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-400" />
                Recent Activity
              </h2>

              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all group">
                    <div className={`w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium group-hover:text-purple-300 transition-colors">{activity.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2.5 bg-slate-800/50 border border-purple-500/20 text-white rounded-xl text-sm font-medium hover:bg-slate-800 hover:border-purple-500/40 transition-all flex items-center justify-center gap-2">
                View All Activity
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Upcoming Milestones */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Milestones
              </h2>

              <div className="space-y-4">
                {upcomingMilestones.map((milestone, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/30 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        milestone.priority === 'high' 
                          ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
                          : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                      }`}>
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm mb-1">{milestone.title}</h3>
                        <p className="text-xs text-gray-400">Due in {milestone.dueDate}</p>
                      </div>
                    </div>

                    <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">{milestone.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-400" />
                Achievements
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, idx) => (
                  <div 
                    key={idx}
                    className={`relative p-4 rounded-xl border transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-500/50'
                        : 'bg-slate-800/30 border-slate-700 opacity-60'
                    }`}
                  >
                    {achievement.unlocked && (
                      <div className="absolute -top-2 -right-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                      achievement.unlocked
                        ? achievement.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30'
                        : achievement.rarity === 'epic' ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30'
                        : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30'
                        : 'bg-slate-800 border-2 border-slate-700'
                    }`}>
                      <div className={achievement.unlocked ? 'text-purple-400' : 'text-gray-600'}>
                        {achievement.icon}
                      </div>
                    </div>

                    <h3 className="text-white font-semibold text-xs text-center mb-1">{achievement.title}</h3>
                    <p className="text-gray-400 text-xs text-center">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
          <div className="relative z-10 text-center">
            <Rocket className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to level up?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get personalized recommendations to boost your career readiness score
            </p>
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto">
              <Sparkles className="w-5 h-5" />
              Get AI Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}