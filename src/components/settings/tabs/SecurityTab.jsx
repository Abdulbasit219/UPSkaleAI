"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import SettingsCard from "../SettingsCard";
import Button from "../Button";
import axios from "axios";
import { toast } from "sonner";

export default function SecurityTab({ isDark }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle show/hide password
  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Update password API call
  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.patch("/api/user/change-password", formData);
      toast.success(res.data.message);

      // Reset form
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPassword({ currentPassword: false, newPassword: false, confirmPassword: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
    isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-gray-900"
  }`;

  return (
    <SettingsCard title="Change Password" isDark={isDark}>
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Current Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={inputClasses + " pl-10 pr-10"}
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("currentPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword.currentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={inputClasses + " pl-10 pr-10"}
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("newPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword.newPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClasses + " pl-10 pr-10"}
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("confirmPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword.confirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        className="mt-6 cursor-pointer"
        onClick={handleUpdatePassword}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </SettingsCard>
  );
}
