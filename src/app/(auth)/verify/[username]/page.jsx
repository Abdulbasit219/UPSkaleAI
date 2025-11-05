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

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        username: params.username,
        code: data.code,
      });

      toast.success(response.data.message);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error(
        error.response?.data?.message || "Verification failed. Please try again."
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 pt-24">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 md:p-10 shadow-2xl shadow-purple-500/10">
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
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
              <Mail className="w-10 h-10 text-purple-400" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Verify Your Account
            </h1>
            <p className="text-gray-400 text-sm">
              We've sent a verification code to your email
            </p>
            {params.username && (
              <p className="text-purple-400 font-semibold mt-2">
                @{params.username}
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
                    className="text-gray-300 font-medium mb-2 block text-sm"
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
                      className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-center text-2xl tracking-widest font-mono"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <ShieldCheck className="w-5 h-5 text-purple-400/50" />
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
            <p className="text-gray-400 text-sm mb-3">
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
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
          </div>

          {/* Back to Sign In */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Wrong email?{" "}
              <Link 
                href="/sign-up" 
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sign up again
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Mail className="w-5 h-5 text-purple-400 mt-0.5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">
                Check your spam folder
              </h3>
              <p className="text-gray-400 text-xs">
                If you don't see the email in your inbox, please check your spam or junk folder.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          The verification code will expire in 10 minutes
        </p>
      </div>
    </div>
  );
};

export default Page;