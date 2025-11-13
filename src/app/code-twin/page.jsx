"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Brain,
  Code,
  MessageSquare,
  Play,
  Zap,
  Sparkles,
  BookOpen,
  Target,
  Award,
  Clock,
  Users,
  TrendingUp,
  Send,
  Bot,
  User,
  Copy,
  CheckCircle,
  Volume2,
  VolumeX,
  Settings,
  ChevronRight,
  Star,
  Lightbulb,
  Bug,
  Rocket,
  Shield,
  GitBranch,
  Cpu,
  Bookmark,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function CodeTwinPage() {
  const [activeTab, setActiveTab] = useState("mentor");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  // Mock initial conversation
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: "ai",
        content:
          "Hi! I'm CodeTwin, your AI coding mentor. I can help you understand programming concepts, debug code, and improve your problem-solving skills. What would you like to work on today?",
        timestamp: new Date(),
        avatar: <Bot className="w-6 h-6" />,
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      avatar: <User className="w-6 h-6" />,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        content:
          "I understand you're asking about that concept. Let me break it down step by step and provide some examples to help you understand better.",
        timestamp: new Date(),
        avatar: <Bot className="w-6 h-6" />,
        codeExample: `function example() {\n  // This is how it works\n  console.log("Learning made easy!");\n}`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Code Mentor",
      description:
        "Get step-by-step explanations and learn programming concepts intuitively",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Bug className="w-8 h-8" />,
      title: "Smart Debugger",
      description:
        "Find and fix errors with detailed explanations and solutions",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Code Optimizer",
      description: "Improve your code efficiency with AI-powered suggestions",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Pair Programmer",
      description: "Real-time collaborative coding with AI assistance",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const codingTopics = [
    { name: "Algorithms", level: "Beginner", progress: 75 },
    { name: "Data Structures", level: "Intermediate", progress: 60 },
    { name: "Web Development", level: "Beginner", progress: 85 },
    { name: "Python Basics", level: "Advanced", progress: 90 },
  ];

  const recentChallenges = [
    { title: "Reverse String", difficulty: "Easy", completed: true },
    { title: "Binary Search", difficulty: "Medium", completed: true },
    { title: "Tree Traversal", difficulty: "Hard", completed: false },
    { title: "Dynamic Programming", difficulty: "Medium", completed: false },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      } pt-20`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iZ3JheSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-4 backdrop-blur-sm ${
              isDark
                ? "bg-purple-500/20 border-purple-500/30"
                : "bg-purple-100 border-purple-300/30"
            }`}
          >
            <Cpu
              className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`}
            />
            <span
              className={`text-sm font-medium ${isDark ? "text-purple-300" : "text-purple-700"}`}
            >
              AI-Powered Coding Mentor
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Meet
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              CodeTwin
            </span>
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Your personal AI coding partner that teaches you to think like a
            programmer, not just copy code.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <TrendingUp
                  className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Coding Streak
                  </span>
                  <span
                    className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    7 days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Problems Solved
                  </span>
                  <span
                    className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    24
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    AI Sessions
                  </span>
                  <span
                    className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    18
                  </span>
                </div>
              </div>
            </div>

            {/* Learning Topics */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <BookOpen
                  className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Learning Topics
              </h3>
              <div className="space-y-4">
                {codingTopics.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {topic.name}
                      </span>
                      <span
                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {topic.level}
                      </span>
                    </div>
                    <div
                      className={`w-full rounded-full h-2 ${
                        isDark ? "bg-slate-800" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                    <div
                      className={`text-right text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {topic.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Challenges */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <Target
                  className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Recent Challenges
              </h3>
              <div className="space-y-3">
                {recentChallenges.map((challenge, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-gray-50 border-purple-300/10"
                    }`}
                  >
                    <div>
                      <div
                        className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {challenge.title}
                      </div>
                      <div
                        className={`text-xs ${
                          challenge.difficulty === "Easy"
                            ? "text-green-400"
                            : challenge.difficulty === "Medium"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {challenge.difficulty}
                      </div>
                    </div>
                    {challenge.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <div
                        className={`w-5 h-5 border-2 rounded-full ${
                          isDark ? "border-gray-400" : "border-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div
              className={`backdrop-blur-sm border rounded-xl overflow-hidden ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              {/* Chat Header */}
              <div
                className={`border-b p-6 ${
                  isDark ? "border-purple-500/20" : "border-purple-300/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2
                        className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        CodeTwin AI
                      </h2>
                      <p
                        className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Online • Ready to help you code
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-2 transition-colors ${
                        isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      className={`p-2 transition-colors ${
                        isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${
                      message.type === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDark
                          ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                          : "bg-gradient-to-br from-purple-100 to-pink-100"
                      }`}
                    >
                      <div
                        className={
                          isDark ? "text-purple-400" : "text-purple-600"
                        }
                      >
                        {message.avatar}
                      </div>
                    </div>
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 border ${
                        message.type === "user"
                          ? isDark
                            ? "bg-purple-500/20 border-purple-500/20"
                            : "bg-purple-100 border-purple-300/20"
                          : isDark
                            ? "bg-slate-800/50 border-purple-500/20"
                            : "bg-gray-50 border-purple-300/20"
                      }`}
                    >
                      <p className={isDark ? "text-white" : "text-gray-900"}>
                        {message.content}
                      </p>
                      {message.codeExample && (
                        <div
                          className={`mt-3 rounded-lg p-3 border ${
                            isDark
                              ? "bg-slate-900 border-purple-500/20"
                              : "bg-gray-100 border-purple-300/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-400 text-sm font-mono">
                              JavaScript
                            </span>
                            <button
                              className={`transition-colors ${
                                isDark
                                  ? "text-gray-400 hover:text-white"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <pre className="text-green-400 text-sm font-mono overflow-x-auto">
                            {message.codeExample}
                          </pre>
                        </div>
                      )}
                      <div
                        className={`text-xs mt-2 ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDark
                          ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                          : "bg-gradient-to-br from-purple-100 to-pink-100"
                      }`}
                    >
                      <div
                        className={
                          isDark ? "text-purple-400" : "text-purple-600"
                        }
                      >
                        <Bot className="w-6 h-6" />
                      </div>
                    </div>
                    <div
                      className={`rounded-2xl p-4 border ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/20"
                          : "bg-gray-50 border-purple-300/20"
                      }`}
                    >
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div
                className={`border-t p-6 ${
                  isDark ? "border-purple-500/20" : "border-purple-300/20"
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask CodeTwin about programming concepts, debug code, or request explanations..."
                      className={`w-full px-4 py-3 border rounded-xl placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                        isDark
                          ? "bg-slate-800 border-purple-500/20 text-white"
                          : "bg-white border-purple-300/20 text-gray-900"
                      }`}
                      rows="2"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "Explain loops in Python",
                    "Debug this JavaScript function",
                    "Help me understand recursion",
                    "Optimize this algorithm",
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors border ${
                        isDark
                          ? "bg-slate-800 text-gray-400 border-slate-700 hover:bg-slate-700 hover:text-white"
                          : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:text-gray-800"
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-sm border rounded-xl p-4 text-center transition-all duration-300 ${
                    isDark
                      ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
                      : "bg-white/80 border-purple-300/20 hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-300/20"
                  }`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3
                    className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
