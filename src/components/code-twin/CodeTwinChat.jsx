"use client";
import React, { useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Copy,
  Volume2,
  VolumeX,
  Sparkles,
  Terminal,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const CodeTwinChat = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  isDark,
  isSpeaking,
  setIsSpeaking,
  className,
  onToggleFullscreen,
  isFullscreen,
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
  };

  const MarkdownComponents = {
    p: ({ children }) => (
      <p className="mb-3 sm:mb-4 last:mb-0 leading-relaxed text-[11px] sm:text-sm font-medium opacity-90">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="text-sm sm:text-xl font-black mb-2 sm:mb-4 mt-4 sm:mt-6 first:mt-0 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xs sm:text-lg font-bold mb-2 sm:mb-3 mt-3 sm:mt-5 first:mt-0 text-purple-400">
        {children}
      </h2>
    ),
    ul: ({ children }) => (
      <ul className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2 opacity-90 text-[11px] sm:text-sm">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2 opacity-90 text-[11px] sm:text-sm">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match ? match[1] : "code";

      if (!inline) {
        return (
          <div className="my-3 sm:my-6 rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/20 bg-slate-950 shadow-2xl group/code">
            <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2.5 bg-slate-900 border-b border-purple-500/10">
              <span className="text-[8px] sm:text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
                <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                {lang}
              </span>
              <button
                onClick={() =>
                  copyToClipboard(String(children).replace(/\n$/, ""))
                }
                className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
              >
                <Copy className="w-3 sm:w-3.5 h-3 sm:w-3.5" />
              </button>
            </div>
            <pre className="p-3 sm:p-5 overflow-x-auto custom-scrollbar">
              <code className="text-[10px] sm:text-[13px] font-mono text-emerald-400 leading-relaxed block">
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <code
          className="px-1 py-0.5 rounded-md bg-purple-500/10 text-purple-400 font-mono text-[10px] sm:text-[13px] border border-purple-500/10"
          {...props}
        >
          {children}
        </code>
      );
    },
    strong: ({ children }) => (
      <strong
        className={`font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}
      >
        {children}
      </strong>
    ),
  };

  return (
    <div className={`flex flex-col h-full min-h-[400px] ${className || ""}`}>
      <div
        className={`flex-1 backdrop-blur-3xl border rounded-2xl overflow-hidden flex flex-col transition-all duration-500 ${
          isDark
            ? "bg-slate-950/40 border-white/5 shadow-2xl shadow-purple-500/10"
            : "bg-white/90 border-slate-200 shadow-xl shadow-purple-500/5"
        }`}
      >
        {/* Chat Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between transition-colors ${
            isDark
              ? "bg-slate-900/50 border-white/5"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
            </div>
            <div>
              <h2
                className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
              >
                CodeTwin AI
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Always online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-slate-200 text-slate-500 hover:text-slate-900"}`}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-slate-200 text-slate-500 hover:text-slate-900"}`}
            >
              {isSpeaking ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth custom-scrollbar min-h-0">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-sm font-medium">
                How can I help you code today?
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 group ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-1 ${
                  message.type === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-purple-600 text-white"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                  message.type === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : isDark
                      ? "bg-slate-800 text-slate-200 rounded-tl-none"
                      : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                }`}
              >
                <div
                  className={`prose prose-sm max-w-none ${message.type === "user" ? "prose-invert" : isDark ? "prose-invert" : "prose-slate"}`}
                >
                  <ReactMarkdown components={MarkdownComponents}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-purple-500" />
              </div>
              <div
                className={`rounded-2xl rounded-tl-none px-4 py-3 ${isDark ? "bg-slate-800" : "bg-white border border-slate-100"}`}
              >
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className={`p-4 border-t ${isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-200"}`}
        >
          <div className="relative max-w-4xl mx-auto">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about your code..."
              className={`w-full pl-4 pr-14 py-3 rounded-xl border resize-none text-sm shadow-sm transition-all focus:ring-2 focus:ring-purple-500/20 outline-none custom-scrollbar ${
                isDark
                  ? "bg-slate-950 border-white/10 text-white focus:border-purple-500/50 placeholder-slate-600"
                  : "bg-white border-slate-200 text-slate-900 focus:border-purple-500/50 placeholder-slate-400"
              }`}
              rows="1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {["Explain Code", "Find Bugs", "Optimize", "Add Comments"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputMessage(`${suggestion} this code...`)}
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors border ${
                    isDark
                      ? "bg-white/5 border-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {suggestion}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTwinChat;
