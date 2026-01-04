"use client";
import React, { useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Copy,
  Volume2,
  VolumeX,
  Settings,
  Sparkles,
  Terminal,
  ChevronRight,
  Check,
} from "lucide-react";

const CodeTwinChat = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  isDark,
  isSpeaking,
  setIsSpeaking,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast here
  };

  const renderContent = (content) => {
    // Simple logic to detect code blocks
    const parts = content.split(/```/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const lines = part.split("\n");
        const lang = lines[0].trim();
        const code = lines.slice(1).join("\n");
        return (
          <div
            key={index}
            className="my-4 rounded-xl overflow-hidden border border-purple-500/20 bg-slate-950 shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-purple-500/10">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                {lang || "code"}
              </span>
              <button
                onClick={() => copyToClipboard(code)}
                className="p-1 hover:bg-slate-800 rounded transition-colors text-gray-400 hover:text-white"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-emerald-400 leading-relaxed">
                {code}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <p key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="lg:col-span-3 flex flex-col h-[750px]">
      <div
        className={`flex-1 backdrop-blur-3xl border rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 ${
          isDark
            ? "bg-slate-900/40 border-purple-500/20 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
            : "bg-white/70 border-purple-200/50 shadow-[0_0_50px_rgba(168,85,247,0.05)]"
        }`}
      >
        {/* Chat Header */}
        <div
          className={`px-8 py-6 border-b flex items-center justify-between bg-gradient-to-r ${
            isDark
              ? "from-slate-900/50 to-purple-900/20 border-purple-500/10"
              : "from-white/50 to-purple-50/50 border-purple-200/50"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2
                className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
              >
                CodeTwin{" "}
                <span className="text-purple-500 text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 ml-1">
                  v2.0
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  System Latency: 12ms • GPU Mode
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              {
                icon: isSpeaking ? <VolumeX /> : <Volume2 />,
                onClick: () => setIsSpeaking(!isSpeaking),
              },
              { icon: <Settings />, onClick: () => {} },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700"
                    : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {React.cloneElement(btn.icon, { className: "w-5 h-5" })}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scroll-smooth custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Sparkles className="w-12 h-12 text-purple-500 animate-bounce" />
              <p
                className={`text-lg font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Start a conversation with your AI Mentor
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-110 ${
                  message.type === "user"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </div>

              <div
                className={`max-w-[85%] rounded-[2rem] px-6 py-5 border relative ${
                  message.type === "user"
                    ? isDark
                      ? "bg-blue-600/10 border-blue-500/20 text-blue-50"
                      : "bg-blue-50 border-blue-200 text-blue-900"
                    : isDark
                      ? "bg-slate-800/80 border-purple-500/20 text-gray-100"
                      : "bg-gray-50 border-purple-200/50 text-gray-900"
                }`}
              >
                <div className="prose prose-invert max-w-none text-[15px] font-medium leading-relaxed">
                  {renderContent(message.content)}
                </div>

                <div
                  className={`text-[10px] mt-3 font-bold uppercase tracking-widest opacity-40 flex items-center gap-2 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {message.type === "user" && <Check className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <div
                className={`rounded-[2rem] px-8 py-5 border ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20"
                    : "bg-gray-50 border-purple-200/50"
                }`}
              >
                <div className="flex space-x-3">
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className={`p-6 border-t ${isDark ? "border-purple-500/10" : "border-purple-200/50"}`}
        >
          <div className="relative group">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Deep seek your coding problems..."
              className={`w-full pl-6 pr-32 py-5 rounded-[2rem] border-2 placeholder-gray-500 focus:outline-none transition-all resize-none font-medium text-base shadow-inner ${
                isDark
                  ? "bg-slate-950/80 border-purple-500/10 text-white focus:border-purple-500/50"
                  : "bg-white border-purple-100 text-gray-900 focus:border-purple-500/50"
              }`}
              rows="2"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-2 active:scale-95"
              >
                <span className="hidden sm:inline">Analyze</span>
                <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 ml-2">
            {[
              "Explain Dijkstra's Algorithm",
              "Fix React hydration error",
              "Optimize SQL query",
              "Modern API patterns",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${
                  isDark
                    ? "bg-slate-800/50 text-gray-400 border-purple-500/10 hover:border-purple-500/50 hover:text-white"
                    : "bg-gray-50 text-gray-600 border-purple-100 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTwinChat;
