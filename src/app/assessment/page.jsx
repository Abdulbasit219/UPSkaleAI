"use client";
import React, { useState } from "react";
import {
  Target,
  Brain,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Play,
  Zap,
  Trophy,
  Star,
  Code,
  Briefcase,
  BookOpen,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Sparkles,
  FileText,
  BarChart3,
  Lightbulb,
  Timer,
  Users,
  Download,
  Share2,
  RefreshCw,
  Home,
} from "lucide-react";
import { useSelector } from "react-redux";
export default function SkillAssessmentPage() {
  const [step, setStep] = useState("welcome");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizStarted, setQuizStarted] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  // Assessment categories
  const categories = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: <Code className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      skills: ["React", "JavaScript", "HTML/CSS", "TypeScript"],
      questions: 15,
      duration: "15 min",
      difficulty: "Intermediate",
      description:
        "Test your knowledge of modern frontend technologies and frameworks",
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: <Brain className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      skills: ["Node.js", "Express", "APIs", "Databases"],
      questions: 15,
      duration: "15 min",
      difficulty: "Intermediate",
      description:
        "Assess your backend development and server-side programming skills",
    },
    {
      id: "fullstack",
      title: "Full-Stack Development",
      icon: <Zap className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      skills: ["React", "Node.js", "MongoDB", "REST APIs"],
      questions: 20,
      duration: "20 min",
      difficulty: "Advanced",
      description:
        "Comprehensive assessment covering both frontend and backend",
    },
    {
      id: "javascript",
      title: "JavaScript Mastery",
      icon: <Star className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      skills: ["ES6+", "Async/Await", "Closures", "Prototypes"],
      questions: 12,
      duration: "12 min",
      difficulty: "Advanced",
      description: "Deep dive into JavaScript concepts and advanced patterns",
    },
  ];

  // Sample quiz questions (Frontend)
  const quizQuestions = [
    {
      id: 1,
      question: "What is the purpose of React Hooks?",
      options: [
        "To add state and lifecycle features to functional components",
        "To create class components",
        "To style React components",
        "To handle routing in React apps",
      ],
      correct: 0,
      explanation:
        "React Hooks allow you to use state and other React features in functional components without writing a class.",
    },
    {
      id: 2,
      question: "Which method is used to update state in React?",
      options: [
        "this.updateState()",
        "this.setState()",
        "this.modifyState()",
        "this.changeState()",
      ],
      correct: 1,
      explanation:
        "setState() is the primary method for updating state in React class components.",
    },
    {
      id: 3,
      question: "What does CSS 'flexbox' primarily help with?",
      options: [
        "Creating animations",
        "Layout and alignment of elements",
        "Adding shadows to elements",
        "Changing font styles",
      ],
      correct: 1,
      explanation:
        "Flexbox is a CSS layout module designed for distributing space and aligning items in a container.",
    },
    {
      id: 4,
      question: "What is the Virtual DOM in React?",
      options: [
        "A database for storing components",
        "A lightweight copy of the actual DOM",
        "A styling framework",
        "A testing library",
      ],
      correct: 1,
      explanation:
        "The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates and rendering.",
    },
    {
      id: 5,
      question: "What is the purpose of 'useEffect' hook?",
      options: [
        "To manage component state",
        "To perform side effects in functional components",
        "To create context",
        "To handle events",
      ],
      correct: 1,
      explanation:
        "useEffect is used to perform side effects like data fetching, subscriptions, or manual DOM changes.",
    },
  ];

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    Object.keys(answers).forEach((questionId) => {
      const question = quizQuestions.find((q) => q.id === parseInt(questionId));
      if (question && answers[questionId] === question.correct) {
        correct++;
      }
    });
    return {
      score: correct,
      total: quizQuestions.length,
      percentage: Math.round((correct / quizQuestions.length) * 100),
    };
  };

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [quizQuestions[questionIndex].id]: optionIndex,
    });
  };

  const startQuiz = (category) => {
    setSelectedCategory(category);
    setStep("quiz");
    setQuizStarted(true);
  };

  const finishQuiz = () => {
    setStep("results");
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Results data
  const results = calculateScore();
  const skillLevel =
    results.percentage >= 80
      ? "Expert"
      : results.percentage >= 60
        ? "Proficient"
        : results.percentage >= 40
          ? "Intermediate"
          : "Beginner";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950" : "bg-gray-50"
      } pt-20 pb-12`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iZ3JheSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Welcome Screen */}
        {step === "welcome" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 ${
                  isDark
                    ? "bg-purple-500/10 border-purple-500/30"
                    : "bg-purple-100 border-purple-300/30"
                }`}
              >
                <Target
                  className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                <span
                  className={`text-sm font-semibold ${isDark ? "text-purple-300" : "text-purple-700"}`}
                >
                  Skill Assessment
                </span>
              </div>
              <h1
                className={`text-4xl lg:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Test Your{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Skills
                </span>
              </h1>
              <p
                className={`text-xl max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Take a quick assessment to evaluate your skills and get
                personalized job recommendations
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Brain className="w-6 h-6" />,
                  title: "Smart Assessment",
                  desc: "AI-powered questions tailored to your level",
                },
                {
                  icon: <Trophy className="w-6 h-6" />,
                  title: "Instant Results",
                  desc: "Get detailed feedback immediately",
                },
                {
                  icon: <Briefcase className="w-6 h-6" />,
                  title: "Job Matching",
                  desc: "Find roles that match your skill level",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className={`backdrop-blur-sm border rounded-xl p-6 transition-all hover:-translate-y-1 ${
                    isDark
                      ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
                      : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      isDark
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400"
                        : "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                    }`}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div>
              <h2
                className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Choose Your Assessment
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`group backdrop-blur-sm border rounded-xl p-6 transition-all hover:-translate-y-1 cursor-pointer ${
                      isDark
                        ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20"
                        : "bg-white/80 border-purple-300/20 hover:border-purple-300/40 hover:shadow-lg hover:shadow-purple-300/20"
                    }`}
                    onClick={() => setStep("category")}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                      >
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold group-hover:text-purple-400 transition-colors mb-1 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {category.title}
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-xs rounded-full border ${
                            isDark
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                              : "bg-purple-100 text-purple-700 border-purple-300/20"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div
                        className={`flex items-center gap-4 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {category.questions} questions
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {category.duration}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          category.difficulty === "Advanced"
                            ? "bg-red-500/10 text-red-400"
                            : category.difficulty === "Intermediate"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {category.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startQuiz(category);
                      }}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                    >
                      Start Assessment
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quiz Screen */}
        {step === "quiz" && (
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 mb-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2
                    className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {selectedCategory?.title}
                  </h2>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-2xl">
                    <Timer className="w-6 h-6" />
                    {formatTime(timeLeft)}
                  </div>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Time Remaining
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className={`w-full rounded-full h-2 ${
                  isDark ? "bg-slate-800" : "bg-gray-200"
                }`}
              >
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-8 mb-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4">
                  <Code className="w-4 h-4" />
                  Multiple Choice
                </div>
                <h3
                  className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {quizQuestions[currentQuestion]?.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[currentQuestion]?.options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQuestion, index)}
                      className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                        answers[quizQuestions[currentQuestion].id] === index
                          ? "bg-purple-500/20 border-purple-500 text-white"
                          : isDark
                            ? "bg-slate-800/50 border-slate-700 text-gray-300 hover:border-purple-500/50 hover:bg-slate-800"
                            : "bg-gray-50 border-gray-300 text-gray-700 hover:border-purple-500/50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            answers[quizQuestions[currentQuestion].id] === index
                              ? "border-purple-400 bg-purple-500"
                              : isDark
                                ? "border-gray-600"
                                : "border-gray-400"
                          }`}
                        >
                          {answers[quizQuestions[currentQuestion].id] ===
                            index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all border flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark
                    ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentQuestion < quizQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={finishQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2"
                >
                  Finish Assessment
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Screen */}
        {step === "results" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Assessment Complete! 🎉
                </h2>
                <p className="text-purple-100 mb-6">
                  Great job on completing the {selectedCategory?.title}{" "}
                  assessment
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-4xl font-bold text-white">
                      {results.score}
                    </div>
                    <div className="text-purple-100 text-sm">Correct</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-4xl font-bold text-white">
                      {results.percentage}%
                    </div>
                    <div className="text-purple-100 text-sm">Score</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-4xl font-bold text-white">
                      {skillLevel}
                    </div>
                    <div className="text-purple-100 text-sm">Level</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Results */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <BarChart3
                  className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Performance Breakdown
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div
                  className={`rounded-lg p-6 border ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10"
                      : "bg-gray-50 border-purple-300/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Accuracy
                    </span>
                    <span
                      className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {results.percentage}%
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-full h-3 ${
                      isDark ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      style={{ width: `${results.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div
                  className={`rounded-lg p-6 border ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10"
                      : "bg-gray-50 border-purple-300/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Questions Answered
                    </span>
                    <span
                      className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {Object.keys(answers).length}/{quizQuestions.length}
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-full h-3 ${
                      isDark ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      style={{
                        width: `${(Object.keys(answers).length / quizQuestions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Skill Level Badge */}
              <div
                className={`p-6 rounded-xl border-2 ${
                  skillLevel === "Expert"
                    ? "bg-green-500/10 border-green-500/30"
                    : skillLevel === "Proficient"
                      ? "bg-blue-500/10 border-blue-500/30"
                      : skillLevel === "Intermediate"
                        ? "bg-yellow-500/10 border-yellow-500/30"
                        : "bg-orange-500/10 border-orange-500/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      skillLevel === "Expert"
                        ? "bg-green-500/20 text-green-400"
                        : skillLevel === "Proficient"
                          ? "bg-blue-500/20 text-blue-400"
                          : skillLevel === "Intermediate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Skill Level: {skillLevel}
                    </h4>
                    <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                      {skillLevel === "Expert" &&
                        "Outstanding! You have mastered this skill area. You're ready for senior-level positions."}
                      {skillLevel === "Proficient" &&
                        "Great work! You have a strong understanding. Continue practicing to reach expert level."}
                      {skillLevel === "Intermediate" &&
                        "Good progress! You understand the basics. Focus on advanced concepts to improve."}
                      {skillLevel === "Beginner" &&
                        "Keep learning! Review fundamental concepts and practice regularly to build your skills."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Next Steps */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <Lightbulb
                  className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Recommended Next Steps
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`rounded-lg p-5 border transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                      : "bg-gray-50 border-purple-300/10 hover:border-purple-300/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        Continue Learning
                      </h4>
                      <p
                        className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Enroll in courses to strengthen weak areas
                      </p>
                      <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
                        Browse Courses
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-lg p-5 border transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                      : "bg-gray-50 border-purple-300/10 hover:border-purple-300/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 flex-shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        Job Matches
                      </h4>
                      <p
                        className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Find jobs matching your skill level
                      </p>
                      <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
                        View Jobs
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-lg p-5 border transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                      : "bg-gray-50 border-purple-300/10 hover:border-purple-300/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        Practice More
                      </h4>
                      <p
                        className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Take additional assessments to track progress
                      </p>
                      <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
                        More Assessments
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-lg p-5 border transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                      : "bg-gray-50 border-purple-300/10 hover:border-purple-300/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-400 flex-shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        Join Community
                      </h4>
                      <p
                        className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Connect with peers and mentors
                      </p>
                      <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
                        Explore Community
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <TrendingUp
                  className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Strengths & Areas to Improve
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div>
                  <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Strengths
                  </h4>
                  <div className="space-y-3">
                    {[
                      "React Fundamentals",
                      "Component Design",
                      "State Management",
                    ].map((strength, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span
                          className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                        >
                          {strength}
                        </span>
                        <span className="ml-auto text-green-400 text-sm font-semibold">
                          Strong
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas to Improve */}
                <div>
                  <h4 className="text-orange-400 font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Areas to Improve
                  </h4>
                  <div className="space-y-3">
                    {["Advanced Hooks", "Performance Optimization"].map(
                      (weakness, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20"
                        >
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span
                            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            {weakness}
                          </span>
                          <span className="ml-auto text-orange-400 text-sm font-semibold">
                            Review
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Question Review */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <FileText
                  className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Question Review
              </h3>

              <div className="space-y-4">
                {quizQuestions.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correct;

                  return (
                    <div
                      key={index}
                      className={`p-5 rounded-lg border-2 ${
                        isCorrect
                          ? "bg-green-500/5 border-green-500/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isCorrect
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <XCircle className="w-6 h-6" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                          >
                            Question {index + 1}: {question.question}
                          </h4>

                          {/* Options */}
                          <div className="space-y-2 mb-3">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg text-sm ${
                                  optIndex === question.correct
                                    ? "bg-green-500/10 border border-green-500/30 text-green-300"
                                    : optIndex === userAnswer && !isCorrect
                                      ? "bg-red-500/10 border border-red-500/30 text-red-300"
                                      : isDark
                                        ? "bg-slate-800/30 text-gray-400"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {optIndex === question.correct && (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  )}
                                  {optIndex === userAnswer && !isCorrect && (
                                    <XCircle className="w-4 h-4 text-red-400" />
                                  )}
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Explanation */}
                          <div
                            className={`p-3 rounded-lg border ${
                              isDark
                                ? "bg-slate-800/50 border-purple-500/10"
                                : "bg-gray-50 border-purple-300/10"
                            }`}
                          >
                            <p
                              className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <span className="text-purple-400 font-semibold">
                                Explanation:{" "}
                              </span>
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all border flex items-center justify-center gap-2 ${
                  isDark
                    ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
              >
                <Download className="w-5 h-5" />
                Download Report
              </button>
              <button
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all border flex items-center justify-center gap-2 ${
                  isDark
                    ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
              >
                <Share2 className="w-5 h-5" />
                Share Results
              </button>
              <button
                onClick={() => {
                  setStep("welcome");
                  setCurrentQuestion(0);
                  setAnswers({});
                  setSelectedCategory(null);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Take Another Assessment
              </button>
            </div>

            {/* Back to Dashboard */}
            <button
              onClick={() => setStep("welcome")}
              className={`w-full px-6 py-3 backdrop-blur-sm rounded-lg font-semibold transition-all border flex items-center justify-center gap-2 ${
                isDark
                  ? "bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
                  : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
              }`}
            >
              <Home className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
