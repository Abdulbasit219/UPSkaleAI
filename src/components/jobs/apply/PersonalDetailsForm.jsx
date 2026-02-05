import React from "react";
import { User, Mail, Phone, MapPin, Sparkles } from "lucide-react";

const PersonalDetailsForm = ({
  formData,
  handleInputChange,
  isDark,
  profileData,
  session,
}) => {
  return (
    <div className="space-y-6">
      <h2
        className={`text-2xl font-bold mb-6 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Personal Information
      </h2>
      {(profileData || session?.user) && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 ${
            isDark
              ? "bg-purple-500/10 border-purple-500/20"
              : "bg-purple-50 border-purple-300/20"
          }`}
        >
          <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Auto-filled from your profile
            </p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We've pre-filled your information. Feel free to edit as needed.
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Full Name
          </label>
          <div className="relative">
            <User
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <div className="relative">
            <Mail
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Phone
          </label>
          <div className="relative">
            <Phone
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Location
          </label>
          <div className="relative">
            <MapPin
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.remoteOk}
            onChange={(e) => handleInputChange("remoteOk", e.target.checked)}
            className={`w-4 h-4 text-purple-500 border rounded focus:ring-purple-500 ${
              isDark
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-300"
            }`}
          />
          <span
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Open to remote work
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.relocationOk}
            onChange={(e) =>
              handleInputChange("relocationOk", e.target.checked)
            }
            className={`w-4 h-4 text-purple-500 border rounded focus:ring-purple-500 ${
              isDark
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-300"
            }`}
          />
          <span
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Willing to relocate
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
