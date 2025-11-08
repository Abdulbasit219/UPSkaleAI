"use client";
import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, CheckCircle, 
  Lock, Shield, Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">

        {/* Card Container */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/10">
          {!isSubmitted ? (
            // Reset Password Form
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                  <Lock className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Forgot Password?
                </h2>
                <p className="text-gray-400">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
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
              <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-purple-500/10">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Secure & Encrypted</p>
                    <p className="text-xs text-gray-500 mt-1">
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
              
              <h3 className="text-2xl font-bold text-white mb-3">
                Check Your Email!
              </h3>
              
              <p className="text-gray-400 mb-2">
                We've sent password reset instructions to
              </p>
              <p className="text-purple-300 font-semibold mb-6">{email}</p>
              
              <p className="text-sm text-gray-500 mb-8">
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
                  className="w-full py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
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
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Support
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            &copy; 2025 SkillBridge. All rights reserved.
          </p>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}