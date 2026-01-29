"use client";
import React, { useState } from "react";
import {
  Copy,
  Play,
  RotateCcw,
  Terminal,
  Trash2,
  Maximize2,
  Minimize2,
} from "lucide-react";

const CodeEditor = ({
  isDark,
  code,
  setCode,
  language = "javascript",
  onToggleFullscreen,
  isFullscreen,
}) => {
  const [lineCount, setLineCount] = useState(code.split("\n").length || 1);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (e) => {
    const val = e.target.value;
    setCode(val);
    setLineCount(val.split("\n").length);
  };

  const handleRun = () => {
    setIsRunning(true);
    const logs = [];
    const originalLog = console.log;

    console.log = (...args) => {
      logs.push(
        args
          .map((arg) =>
            typeof arg === "object"
              ? JSON.stringify(arg, null, 2)
              : String(arg),
          )
          .join(" "),
      );
    };

    try {
      const runCode = new Function(code);
      runCode();
      setOutput(
        logs.length > 0 ? logs : ["Code executed successfully (no output)."],
      );
    } catch (err) {
      setOutput([`Error: ${err.message}`]);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-500 ${
        isDark
          ? "bg-[#0d1117] border-white/5 shadow-2xl shadow-purple-500/5"
          : "bg-white border-slate-200 shadow-xl shadow-purple-500/5"
      }`}
    >
      {/* Editor Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b transition-colors ${
          isDark
            ? "bg-slate-900/50 border-white/5 backdrop-blur-md"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-md border transition-colors ${
              isDark
                ? "bg-white/5 border-white/5 text-gray-300"
                : "bg-white border-slate-200 text-slate-600"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs font-medium tracking-tight">main.js</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? "hover:bg-white/10 text-gray-400 hover:text-white"
                  : "hover:bg-slate-200 text-slate-500 hover:text-slate-900"
              }`}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          )}

          <div
            className={`w-px h-5 ${isDark ? "bg-white/10" : "bg-slate-200"}`}
          />

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="group relative flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Play
              className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : "fill-current"}`}
            />
            <span>{isRunning ? "Running..." : "Run Code"}</span>
          </button>

          <div className="group relative">
            <button
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? "hover:bg-white/10 text-gray-400 hover:text-white"
                  : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-200">
              <div
                className={`flex flex-col p-1 rounded-xl border shadow-xl backdrop-blur-xl ${
                  isDark
                    ? "bg-slate-900/95 border-white/10"
                    : "bg-white/95 border-slate-200"
                }`}
              >
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isDark
                      ? "hover:bg-white/5 text-gray-300"
                      : "hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
                <button
                  onClick={() => setCode("")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container for Editor and Console */}
      <div className="flex flex-col flex-1 overflow-hidden min-h-0 bg-transparent">
        {/* Editor Body */}
        <div className="relative flex-1 overflow-hidden flex transition-colors duration-500">
          {/* Line Numbers */}
          <div
            className={`flex flex-col shrink-0 pt-6 px-4 select-none border-r transition-all hidden xs:flex ${
              isDark
                ? "bg-[#0d1117] border-white/5 text-slate-600"
                : "bg-slate-50/50 border-slate-200 text-slate-400"
            }`}
          >
            {Array.from({
              length: Math.min(Math.max(lineCount, 30), 1000),
            }).map((_, i) => (
              <div key={i} className="leading-6 text-xs font-mono text-right">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Text Area */}
          <textarea
            value={code}
            onChange={handleCodeChange}
            className={`flex-1 p-6 leading-6 resize-none outline-none font-mono text-sm custom-scrollbar transition-colors ${
              isDark
                ? "bg-[#0d1117] text-indigo-100 placeholder-slate-700 caret-purple-400"
                : "bg-white text-slate-800 placeholder-slate-300 caret-purple-600"
            }`}
            spellCheck="false"
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
            placeholder="// Start coding here..."
          />
        </div>

        {/* Console / Output Area */}
        <div
          className={`h-48 flex flex-col shrink-0 border-t transition-all duration-500 ${
            isDark
              ? "bg-[#0f1117] border-white/5"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div
            className={`flex items-center justify-between px-4 py-2 border-b text-[10px] font-bold uppercase tracking-widest transition-colors ${
              isDark
                ? "bg-white/5 text-slate-400 border-white/5"
                : "bg-white text-slate-500 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              Console Output
            </div>
            <button
              onClick={() => setOutput([])}
              className={`p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-500 transition-colors`}
              title="Clear Console"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs custom-scrollbar">
            {output.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 gap-2">
                <Terminal className="w-6 h-6" />
                <span>Ready to execute</span>
              </div>
            ) : (
              <div className="space-y-1">
                {output.map((line, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 font-medium ${
                      line.startsWith("Error:")
                        ? "text-red-400"
                        : isDark
                          ? "text-emerald-400"
                          : "text-emerald-600"
                    }`}
                  >
                    <span className="opacity-30 select-none shrink-0">➜</span>
                    <span className="whitespace-pre-wrap">{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div
        className={`px-4 py-1.5 border-t text-[10px] font-medium flex justify-between items-center shrink-0 ${
          isDark
            ? "bg-slate-900 text-slate-400 border-white/5"
            : "bg-slate-50 text-slate-500 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-purple-400" : "bg-purple-500"} animate-pulse`}
            />
            JavaScript
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 opacity-60">
            <RotateCcw className="w-3 h-3" />
            Auto-saved
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono opacity-60">
          <span>Ln {code.split("\n").length}</span>
          <span>Col {code.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
