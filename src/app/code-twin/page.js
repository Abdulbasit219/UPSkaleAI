"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  Brain, Code, MessageSquare, Play, Zap, Sparkles,
  BookOpen, Target, Award, Clock, Users, TrendingUp,
  Send, Bot, User, Copy, CheckCircle, Volume2,
  VolumeX, Settings, ChevronRight, Star, Lightbulb,
  Bug, Rocket, Shield, GitBranch, Cpu, Bookmark
} from 'lucide-react';

export default function CodeTwinPage() {
  const [activeTab, setActiveTab] = useState('mentor');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock initial conversation
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hi! I'm CodeTwin, your AI coding mentor. I can help you understand programming concepts, debug code, and improve your problem-solving skills. What would you like to work on today?",
        timestamp: new Date(),
        avatar: <Bot className="w-6 h-6" />
      }
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
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      avatar: <User className="w-6 h-6" />
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "I understand you're asking about that concept. Let me break it down step by step and provide some examples to help you understand better.",
        timestamp: new Date(),
        avatar: <Bot className="w-6 h-6" />,
        codeExample: `function example() {\n  // This is how it works\n  console.log("Learning made easy!");\n}`
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Code Mentor",
      description: "Get step-by-step explanations and learn programming concepts intuitively",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Bug className="w-8 h-8" />,
      title: "Smart Debugger",
      description: "Find and fix errors with detailed explanations and solutions",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Code Optimizer",
      description: "Improve your code efficiency with AI-powered suggestions",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Pair Programmer",
      description: "Real-time collaborative coding with AI assistance",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

  const codingTopics = [
    { name: "Algorithms", level: "Beginner", progress: 75 },
    { name: "Data Structures", level: "Intermediate", progress: 60 },
    { name: "Web Development", level: "Beginner", progress: 85 },
    { name: "Python Basics", level: "Advanced", progress: 90 }
  ];

  const recentChallenges = [
    { title: "Reverse String", difficulty: "Easy", completed: true },
    { title: "Binary Search", difficulty: "Medium", completed: true },
    { title: "Tree Traversal", difficulty: "Hard", completed: false },
    { title: "Dynamic Programming", difficulty: "Medium", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-4 backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Coding Mentor</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Meet
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> CodeTwin</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your personal AI coding partner that teaches you to think like a programmer, not just copy code.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Coding Streak</span>
                  <span className="text-white font-bold">7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Problems Solved</span>
                  <span className="text-white font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">AI Sessions</span>
                  <span className="text-white font-bold">18</span>
                </div>
              </div>
            </div>

            {/* Learning Topics */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Learning Topics
              </h3>
              <div className="space-y-4">
                {codingTopics.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-medium">{topic.name}</span>
                      <span className="text-gray-400 text-xs">{topic.level}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-gray-400 text-xs">{topic.progress}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Challenges */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Recent Challenges
              </h3>
              <div className="space-y-3">
                {recentChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-purple-500/10">
                    <div>
                      <div className="text-white text-sm font-medium">{challenge.title}</div>
                      <div className={`text-xs ${
                        challenge.difficulty === 'Easy' ? 'text-green-400' :
                        challenge.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {challenge.difficulty}
                      </div>
                    </div>
                    {challenge.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
              {/* Chat Header */}
              <div className="border-b border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">CodeTwin AI</h2>
                      <p className="text-gray-400 text-sm">Online • Ready to help you code</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
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
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="text-purple-400">
                        {message.avatar}
                      </div>
                    </div>
                    <div className={`max-w-[70%] ${
                      message.type === 'user' ? 'bg-purple-500/20' : 'bg-slate-800/50'
                    } rounded-2xl p-4 border border-purple-500/20`}>
                      <p className="text-white whitespace-pre-wrap">{message.content}</p>
                      {message.codeExample && (
                        <div className="mt-3 bg-slate-900 rounded-lg p-3 border border-purple-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-400 text-sm font-mono">JavaScript</span>
                            <button className="text-gray-400 hover:text-white transition-colors">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <pre className="text-green-400 text-sm font-mono overflow-x-auto">
                            {message.codeExample}
                          </pre>
                        </div>
                      )}
                      <div className="text-gray-500 text-xs mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                      <div className="text-purple-400">
                        <Bot className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-2xl p-4 border border-purple-500/20">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-purple-500/20 p-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask CodeTwin about programming concepts, debug code, or request explanations..."
                      className="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      rows="2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
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
                    "Optimize this algorithm"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className="px-3 py-1 bg-slate-800 text-gray-400 text-sm rounded-lg hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
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
                  className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 text-center hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}