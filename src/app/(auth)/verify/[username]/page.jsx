"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Sparkles, Mail, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { useSelector } from "react-redux";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/verify-code`, {
        username: decodeURIComponent(params.username),
        code: data.code,
      });

      toast.success(response.data.message);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post(`/api/resend-code`, {
        username: params.username,
      });
      toast.success("Verification code resent to your email");
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 pt-24 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div
          className={`backdrop-blur-xl border rounded-2xl p-8 md:p-10 shadow-2xl ${
            isDark
              ? "bg-slate-900/80 border-purple-500/30 shadow-purple-500/10"
              : "bg-white/90 border-purple-300/30 shadow-purple-300/10"
          }`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SkillBridge
              </span>
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center border ${
                isDark
                  ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30"
                  : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/30"
              }`}
            >
              <Mail
                className={`w-10 h-10 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Verify Your Account
            </h1>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We've sent a verification code to your email
            </p>
            {params.username && (
              <p className="text-purple-400 font-semibold mt-2">
                @{decodeURIComponent(params.username)}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <label
                    htmlFor="code"
                    className={`font-medium mb-2 block text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Verification Code
                  </label>

                  <div className="relative">
                    <Input
                      {...field}
                      id="code"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      aria-invalid={fieldState.invalid}
                      className={`w-full px-4 py-3 border rounded-xl placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-center text-2xl tracking-widest font-mono ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/30 text-white"
                          : "bg-white border-purple-300/30 text-gray-900"
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <ShieldCheck
                        className={`w-5 h-5 ${
                          isDark ? "text-purple-400/50" : "text-purple-400/70"
                        }`}
                      />
                    </div>
                  </div>

                  {fieldState.invalid && fieldState.error && (
                    <p className="text-pink-400 text-sm mt-1.5 text-center">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Verify Account
                </span>
              )}
            </Button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p
              className={`text-sm mb-3 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Didn't receive the code?
            </p>
            <button
              type="button"
              onClick={handleResendCode}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors text-sm"
            >
              Resend verification code
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDark ? "border-purple-500/20" : "border-purple-300/20"
                }`}
              ></div>
            </div>
          </div>

          {/* Back to Sign In */}
          <div className="text-center">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Wrong email?{" "}
              <Link
                href="/signup"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sign up again
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div
          className={`mt-6 border rounded-xl p-4 backdrop-blur-sm ${
            isDark
              ? "bg-purple-500/10 border-purple-500/20"
              : "bg-purple-100/50 border-purple-300/20"
          }`}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Mail
                className={`w-5 h-5 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                } mt-0.5`}
              />
            </div>
            <div>
              <h3
                className={`font-semibold text-sm mb-1 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Check your spam folder
              </h3>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                If you don't see the email in your inbox, please check your spam
                or junk folder.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p
          className={`text-center text-xs mt-6 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          The verification code will expire in 10 minutes
        </p>
      </div>
    </div>
  );
};

export default Page;
