"use client";
import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spotlight from "@/components/ui/Spotlight";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/forgot-password", { email });

      if (res.data.success) {
        toast.success("OTP sent to your email!");
        router.push(`/verify/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong, try again",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-gray-900"
      }`}
    >
      <BackgroundPattern />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={isDark ? "white" : "#a855f7"}
      />
      <div className="max-w-md w-full relative z-10">
        <div
          className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
            isDark
              ? "bg-slate-900/50 border-purple-500/30 shadow-purple-500/10"
              : "bg-white/90 border-purple-300/30 shadow-purple-300/10"
          }`}
        >
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
                isDark
                  ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30"
                  : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/30"
              }`}
            >
              <Mail
                className={`w-8 h-8 ${isDark ? "text-purple-400" : "text-purple-600"}`}
              />
            </div>
            <h2
              className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Forgot Password?
            </h2>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Enter your email to receive an OTP for password reset.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={`h-5 w-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  />
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
              className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
