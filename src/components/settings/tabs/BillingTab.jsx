import React from "react";
import { CreditCard, Plus } from "lucide-react";
import SettingsCard from "../SettingsCard";
import Button from "../Button";

/**
 * Billing tab component
 */
export default function BillingTab({ isDark }) {
  return (
    <>
      {/* Current Plan */}
      <SettingsCard title="Current Plan" isDark={isDark}>
        <div
          className={`p-6 rounded-xl border ${
            isDark
              ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20"
              : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300/20"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div
                className={`font-bold text-lg ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Pro Plan
              </div>
              <div className={isDark ? "text-gray-400" : "text-gray-600"}>
                $29/month • Billed monthly
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                isDark
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-green-100 text-green-700 border-green-200"
              }`}
            >
              Active
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Button variant="primary">Upgrade to Enterprise</Button>
            <Button variant="secondary" isDark={isDark}>
              Cancel Subscription
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* Payment Method */}
      <SettingsCard title="Payment Method" isDark={isDark}>
        <div
          className={`p-4 rounded-lg border ${
            isDark
              ? "bg-slate-800/50 border-purple-500/10"
              : "bg-gray-50/50 border-purple-300/10"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Visa ending in 4242
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"
                  }
                >
                  Expires 12/2025
                </div>
              </div>
            </div>
            <button
              className={`font-semibold ${
                isDark
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-700"
              }`}
            >
              Edit
            </button>
          </div>
        </div>
        <Button
          variant="secondary"
          isDark={isDark}
          icon={Plus}
          className="mt-4"
        >
          Add Payment Method
        </Button>
      </SettingsCard>

      {/* Billing History */}
      <SettingsCard title="Billing History" isDark={isDark}>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                isDark
                  ? "bg-slate-800/50 border-purple-500/10"
                  : "bg-gray-50/50 border-purple-300/10"
              }`}
            >
              <div>
                <div
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Pro Plan Subscription
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"
                  }
                >
                  March {item}, 2024
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  $29.00
                </div>
                <div className="text-green-400 text-sm">Paid</div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="secondary" isDark={isDark} className="w-full mt-4">
          View All Invoices
        </Button>
      </SettingsCard>
    </>
  );
}
