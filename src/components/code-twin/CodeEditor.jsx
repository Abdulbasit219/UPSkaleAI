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

    // Capture console.log
    console.log = (...args) => {
      logs.push(
        args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")
      );
    };

    try {
      // Create a function from the code and execute it
      // Note: This is a simple evaluation for demonstration.
      // In a real production environment, this would run in a worker/sandbox.
      const runCode = new Function(code);
      runCode();
      setOutput(
        logs.length > 0 ? logs : ["Code executed successfully (no output)."]
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
      className={`flex flex-col h-full rounded-2xl overflow-hidden border transition-all ${
        isDark
          ? "bg-[#1e1e1e] border-white/10 shadow-2xl"
          : "bg-white border-gray-200 shadow-xl"
      }`}
    >
      {/* Editor Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b ${
          isDark ? "bg-[#252526] border-white/5" : "bg-gray-50 border-gray-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span
            className={`ml-3 text-xs font-mono opacity-60 ${isDark ? "text-white" : "text-gray-600"}`}
          >
            main.js
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onToggleFullscreen && (
            <button
              title={isFullscreen ? "Minimize" : "Maximize"}
              onClick={onToggleFullscreen}
              className={`p-1.5 rounded transition mr-1 ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />{" "}
            {isRunning ? "Running..." : "Run"}
          </button>
          <div className="w-[1px] h-4 bg-gray-300 dark:bg-white/10 mx-1" />
          <button
            title="Copy Code"
            onClick={() => navigator.clipboard.writeText(code)}
            className={`p-1.5 rounded transition ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            title="Reset"
            onClick={() => setCode("")}
            className={`p-1.5 rounded transition ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container for Editor and Console */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Editor Body */}
        <div className="relative flex-1 overflow-hidden font-mono text-sm border-b dark:border-white/5">
          {/* Line Numbers */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-10 text-right pr-3 pt-4 select-none opacity-40 border-r dark:border-white/5 ${
              isDark ? "text-gray-400 bg-[#1e1e1e]" : "text-gray-400 bg-gray-50"
            }`}
          >
            {Array.from({ length: Math.max(lineCount, 50) }).map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Text Area */}
          <textarea
            value={code}
            onChange={handleCodeChange}
            className={`absolute top-0 right-0 bottom-0 left-10 p-4 leading-6 resize-none outline-none font-mono whitespace-pre custom-scrollbar ${
              isDark
                ? "bg-[#1e1e1e] text-gray-300 placeholder-gray-600 caret-purple-400"
                : "bg-white text-gray-800 placeholder-gray-400 caret-purple-600"
            }`}
            spellCheck="false"
            placeholder="// Start coding here..."
          />
        </div>

        {/* Console / Output Area */}
        <div
          className={`h-40 flex flex-col ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}
        >
          <div
            className={`flex items-center justify-between px-4 py-1.5 border-b text-[10px] font-bold tracking-wider uppercase ${isDark ? "bg-[#252526] text-gray-400 border-white/5" : "bg-gray-50 text-gray-500 border-gray-100"}`}
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Output / Console
            </div>
            <button
              onClick={() => setOutput([])}
              className="hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs custom-scrollbar">
            {output.length === 0 ? (
              <span className="opacity-30">
                No output yet. Run your code to see results.
              </span>
            ) : (
              output.map((line, i) => (
                <div
                  key={i}
                  className={`mb-1 ${line.startsWith("Error:") ? "text-red-400" : isDark ? "text-emerald-400" : "text-emerald-600"}`}
                >
                  <span className="opacity-30 mr-2">{">"}</span>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div
        className={`px-4 py-1 border-t text-[10px] font-mono flex justify-between items-center ${
          isDark ? "bg-[#007acc] text-white" : "bg-purple-600 text-white"
        }`}
      >
        <span>JavaScript (ES6+)</span>
        <span>
          Ln {code.substring(0, code.length).split("\n").length}, Col{" "}
          {code.length}
        </span>
      </div>
    </div>
  );
};

export default CodeEditor;
