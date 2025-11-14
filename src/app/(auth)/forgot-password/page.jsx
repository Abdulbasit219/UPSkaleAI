"use client";
import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, CheckCircle, 
  Lock, Shield, Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSelector } from 'react-redux';
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleBackToLogin = () => {
    window.history.back();
  };

return (
    <div className={`min-h-screen pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" 
        : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
    }`}>
      {/* Background Pattern */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark 
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-md w-full space-y-8 relative z-10">

        {/* Card Container */}
        <div className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
          isDark
            ? "bg-slate-900/50 border-purple-500/30 shadow-purple-500/10"
            : "bg-white/90 border-purple-300/30 shadow-purple-300/10"
        }`}>
          {!isSubmitted ? (
            // Reset Password Form
            <>
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
                  isDark
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30"
                    : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/30"
                }`}>
                  <Lock className={`w-8 h-8 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`} />
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Forgot Password?
                </h2>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full pl-10 pr-4 py-3 border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/20 text-white"
                          : "bg-white border-purple-300/20 text-gray-900"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    focusRingOffsetColor: isDark ? '#0f172a' : '#f9fafb'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending instructions...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Info */}
              <div className={`mt-6 p-4 rounded-xl border ${
                isDark
                  ? "bg-slate-800/30 border-purple-500/10"
                  : "bg-gray-50/50 border-purple-300/10"
              }`}>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>Secure & Encrypted</p>
                    <p className={`text-xs mt-1 ${
                      isDark ? "text-gray-500" : "text-gray-600"
                    }`}>
                      Your email is protected. We'll never share your information with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Success State
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              
              <h3 className={`text-2xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Check Your Email!
              </h3>
              
              <p className={isDark ? "text-gray-400 mb-2" : "text-gray-600 mb-2"}>
                We've sent password reset instructions to
              </p>
              <p className="text-purple-300 font-semibold mb-6">{email}</p>
              
              <p className={`text-sm mb-8 ${
                isDark ? "text-gray-500" : "text-gray-600"
              }`}>
                Didn't receive the email? Check your spam folder or 
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors"
                >
                  try again
                </button>
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleBackToLogin}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors border ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Back to Login
                </button>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 border-2 border-purple-500 text-purple-400 rounded-xl font-semibold hover:bg-purple-500/10 transition-all"
                >
                  Reset Another Email
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <a href="#" className={`transition-colors ${
              isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"
            }`}>
              Privacy Policy
            </a>
            <a href="#" className={`transition-colors ${
              isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"
            }`}>
              Terms of Service
            </a>
            <a href="#" className={`transition-colors ${
              isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"
            }`}>
              Support
            </a>
          </div>
          <p className={`text-sm ${
            isDark ? "text-gray-600" : "text-gray-500"
          }`}>
            &copy; 2025 SkillBridge. All rights reserved.
          </p>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isDark ? "bg-purple-500/10" : "bg-purple-500/5"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDark ? "bg-pink-500/10" : "bg-pink-500/5"
        }`}></div>
      </div>
    </div>
  );
}