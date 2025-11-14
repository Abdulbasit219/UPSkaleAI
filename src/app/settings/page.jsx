"use client";
import React, { useState } from 'react';
import {
  User, Mail, Lock, Bell, Globe, Palette, Shield,
  CreditCard, Users, Eye, EyeOff, Camera, Trash2,
  Check, X, ChevronRight, LogOut, Download, Upload,
  Smartphone, Monitor, Moon, Sun, Volume2, VolumeX,
  Key, Link2, Github, Linkedin, Twitter, AlertCircle,
  Save, RefreshCw, Zap, Target, BookOpen, Award,
  Settings as SettingsIcon, HelpCircle, FileText,
  Calendar, Clock, Languages, MapPin,Plus
} from 'lucide-react';
import { useSelector } from 'react-redux';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  // User data
  const userData = {
    name: "Ali",
    email: "ali@example.com",
    username: "ali",
    bio: "Full-stack developer passionate about building scalable applications",
    location: "Karachi, Pakistan",
    website: "https://ali.dev",
    phone: "+1 (555) 123-4567",
    timezone: "Pakistan Standard Time (PKT)",
    language: "English (US)",
  };

  const tabs = [
    { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
    { id: 'account', icon: <SettingsIcon className="w-5 h-5" />, label: 'Account' },
    { id: 'security', icon: <Shield className="w-5 h-5" />, label: 'Security' },
    { id: 'notifications', icon: <Bell className="w-5 h-5" />, label: 'Notifications' },
    { id: 'preferences', icon: <Palette className="w-5 h-5" />, label: 'Preferences' },
    { id: 'billing', icon: <CreditCard className="w-5 h-5" />, label: 'Billing' },
    { id: 'privacy', icon: <Eye className="w-5 h-5" />, label: 'Privacy' },
  ];

  const notificationSettings = [
    {
      category: "Learning Updates",
      items: [
        { id: 'course-updates', label: 'Course updates and announcements', enabled: true },
        { id: 'new-content', label: 'New content available', enabled: true },
        { id: 'assignment-reminders', label: 'Assignment reminders', enabled: true },
      ]
    },
    {
      category: "Community",
      items: [
        { id: 'messages', label: 'Direct messages', enabled: true },
        { id: 'comments', label: 'Comments on your posts', enabled: true },
        { id: 'mentions', label: 'Mentions and tags', enabled: false },
      ]
    },
    {
      category: "Account Activity",
      items: [
        { id: 'security-alerts', label: 'Security alerts', enabled: true },
        { id: 'login-attempts', label: 'Login attempts', enabled: true },
        { id: 'account-changes', label: 'Account changes', enabled: true },
      ]
    },
  ];

  const connectedAccounts = [
    { platform: 'GitHub', icon: <Github className="w-5 h-5" />, connected: true, username: '@ali' },
    { platform: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, connected: true, username: 'Ali' },
    { platform: 'Twitter', icon: <Twitter className="w-5 h-5" />, connected: false, username: null },
  ];

  const sessions = [
    { device: 'MacBook Pro', location: 'Karachi, Pakistan', lastActive: 'Active now', current: true },
    { device: 'iPhone 14', location: 'Karachi, Pakistan', lastActive: '2 hours ago', current: false },
    { device: 'Chrome on Windows', location: 'Karachi, Pakistan', lastActive: '3 days ago', current: false },
  ];

 return (
    <div className={`min-h-screen pt-20 pb-12 transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white" 
        : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
    }`}>
      {/* Background Pattern */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark 
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Settings
          </h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className={`backdrop-blur-sm border rounded-xl p-2 sticky top-24 ${
              isDark
                ? "bg-slate-900/50 border-purple-500/20"
                : "bg-white/80 border-purple-300/20"
            }`}>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                        : `${
                            isDark 
                              ? 'text-gray-400 hover:text-white hover:bg-slate-800/50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                          }`
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                ))}
              </nav>

              <div className={`mt-4 pt-4 border-t ${
                isDark ? "border-purple-500/20" : "border-purple-300/20"
              }`}>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isDark
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    : "text-red-500 hover:text-red-600 hover:bg-red-50"
                }`}>
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                {/* Profile Picture */}
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Profile Picture</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <button className={`absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                        isDark ? "bg-slate-900/80" : "bg-white/90"
                      }`}>
                        <Camera className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-700"}`} />
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Upload New
                        </button>
                        <button className={`px-4 py-2 rounded-lg font-semibold transition-all border ${
                          isDark
                            ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                        }`}>
                          Remove
                        </button>
                      </div>
                      <p className={`text-sm mt-2 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Recommended: Square image, at least 400x400px
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Full Name</label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Username</label>
                      <input
                        type="text"
                        defaultValue={userData.username}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Bio</label>
                      <textarea
                        defaultValue={userData.bio}
                        rows={4}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Location</label>
                      <div className="relative">
                        <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`} />
                        <input
                          type="text"
                          defaultValue={userData.location}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                            isDark
                              ? "bg-slate-800 border-slate-700 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Website</label>
                      <div className="relative">
                        <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`} />
                        <input
                          type="url"
                          defaultValue={userData.website}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                            isDark
                              ? "bg-slate-800 border-slate-700 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button className={`px-6 py-2.5 rounded-lg font-semibold transition-all border ${
                      isDark
                        ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}>
                      Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Social Links */}
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Social Links</h2>
                  <div className="space-y-4">
                    {connectedAccounts.map((account, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/10"
                          : "bg-gray-50/50 border-purple-300/10"
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"
                          }`}>
                            {account.icon}
                          </div>
                          <div>
                            <div className={`font-semibold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}>{account.platform}</div>
                            {account.connected ? (
                              <div className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>{account.username}</div>
                            ) : (
                              <div className={isDark ? "text-gray-500 text-sm" : "text-gray-400 text-sm"}>Not connected</div>
                            )}
                          </div>
                        </div>
                        <button className={`px-4 py-2 rounded-lg font-semibold transition-all border ${
                          account.connected
                            ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                            : 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20'
                        }`}>
                          {account.connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <>
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Email Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Current Email</label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`} />
                          <input
                            type="email"
                            defaultValue={userData.email}
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                              isDark
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                        <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                          Update
                        </button>
                      </div>
                      <p className={`text-sm mt-2 flex items-center gap-2 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}>
                        <Check className="w-4 h-4 text-green-400" />
                        Email verified
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Language & Region</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Language</label>
                      <div className="relative">
                        <Languages className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`} />
                        <select className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors appearance-none ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}>
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Timezone</label>
                      <div className="relative">
                        <Clock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`} />
                        <select className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors appearance-none ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}>
                          <option>Pacific Time (PT)</option>
                          <option>Eastern Time (ET)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 hover:border-red-500/30"
                    : "bg-white/80 border-red-300/20 hover:border-red-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    Danger Zone
                  </h2>
                  <div className="space-y-4">
                    <div className={`flex items-start justify-between p-4 rounded-lg border ${
                      isDark
                        ? "bg-red-500/5 border-red-500/20"
                        : "bg-red-50 border-red-200"
                    }`}>
                      <div>
                        <div className={`font-semibold mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>Delete Account</div>
                        <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Permanently delete your account and all data</div>
                      </div>
                      <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg font-semibold border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <>
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Current Password</label>
                      <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`} />
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                            isDark
                              ? "bg-slate-800 border-slate-700 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                            isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>New Password</label>
                      <input
                        type="password"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Confirm New Password</label>
                      <input
                        type="password"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                    Update Password
                  </button>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Two-Factor Authentication</h2>
                  <div className={`flex items-start justify-between p-4 rounded-lg border ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10"
                      : "bg-gray-50/50 border-purple-300/10"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"
                      }`}>
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`font-semibold mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>Authenticator App</div>
                        <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Use an authenticator app to generate codes</div>
                        {twoFactorEnabled && (
                          <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                            <Check className="w-4 h-4" />
                            Enabled
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all border ${
                        twoFactorEnabled
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20'
                      }`}
                    >
                      {twoFactorEnabled ? 'Enabled' : 'Enable'}
                    </button>
                  </div>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Active Sessions</h2>
                  <div className="space-y-3">
                    {sessions.map((session, index) => (
                      <div key={index} className={`flex items-start justify-between p-4 rounded-lg border ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/10"
                          : "bg-gray-50/50 border-purple-300/10"
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0 ${
                            isDark ? "bg-purple-500/10" : "bg-purple-100"
                          }`}>
                            {session.device.includes('iPhone') || session.device.includes('iPad') ? (
                              <Smartphone className="w-5 h-5" />
                            ) : (
                              <Monitor className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className={`font-semibold ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}>{session.device}</div>
                              {session.current && (
                                <span className={`px-2 py-0.5 text-xs rounded-full border ${
                                  isDark
                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                    : "bg-green-100 text-green-700 border-green-200"
                                }`}>
                                  Current
                                </span>
                              )}
                            </div>
                            <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>{session.location}</div>
                            <div className={isDark ? "text-gray-500 text-xs mt-1" : "text-gray-400 text-xs mt-1"}>{session.lastActive}</div>
                          </div>
                        </div>
                        {!session.current && (
                          <button className={`text-sm font-semibold ${
                            isDark ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"
                          }`}>
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <>
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Notification Channels</h2>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-4 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-gray-50/50 border-purple-300/10"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Mail className={`w-5 h-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`} />
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Email Notifications</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Receive notifications via email</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          emailNotifications ? 'bg-gradient-to-r from-purple-500 to-pink-500' : (
                            isDark ? 'bg-slate-700' : 'bg-gray-300'
                          )
                        }`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className={`flex items-center justify-between p-4 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-gray-50/50 border-purple-300/10"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Bell className={`w-5 h-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`} />
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Push Notifications</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Receive push notifications on your devices</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          pushNotifications ? 'bg-gradient-to-r from-purple-500 to-pink-500' : (
                            isDark ? 'bg-slate-700' : 'bg-gray-300'
                          )
                        }`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Notification Preferences</h2>
                  <div className="space-y-6">
                    {notificationSettings.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <h3 className={`text-lg font-semibold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>{category.category}</h3>
                        <div className="space-y-3">
                          {category.items.map((item, itemIndex) => (
                            <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                              isDark
                                ? "bg-slate-800/50 border-purple-500/10"
                                : "bg-gray-50/50 border-purple-300/10"
                            }`}>
                              <div>
                                <div className={`font-medium ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}>{item.label}</div>
                              </div>
                              <button
                                onClick={() => {
                                  // Handle toggle for this specific item
                                  console.log('Toggle', item.id);
                                }}
                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                  item.enabled ? 'bg-gradient-to-r from-purple-500 to-pink-500' : (
                                    isDark ? 'bg-slate-700' : 'bg-gray-300'
                                  )
                                }`}
                              >
                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                  item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <>
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Appearance</h2>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-4 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-gray-50/50 border-purple-300/10"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Moon className={`w-5 h-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`} />
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Dark Mode</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Use dark theme across the platform</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : (
                            isDark ? 'bg-slate-700' : 'bg-gray-300'
                          )
                        }`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          darkMode ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className={`flex items-center justify-between p-4 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-gray-50/50 border-purple-300/10"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Volume2 className={`w-5 h-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`} />
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Sound Effects</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Play sounds for interactions</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          soundEnabled ? 'bg-gradient-to-r from-purple-500 to-pink-500' : (
                            isDark ? 'bg-slate-700' : 'bg-gray-300'
                          )
                        }`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Learning Preferences</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Daily Goal</label>
                      <select className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                        isDark
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                        <option>4 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>Difficulty Level</label>
                      <select className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                        isDark
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <>
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Current Plan</h2>
                  <div className={`p-6 rounded-xl border ${
                    isDark
                      ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20"
                      : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300/20"
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className={`font-bold text-lg ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>Pro Plan</div>
                        <div className={isDark ? "text-gray-400" : "text-gray-600"}>$29/month • Billed monthly</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                        isDark
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}>
                        Active
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <button className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                        Upgrade to Enterprise
                      </button>
                      <button className={`px-4 py-2.5 rounded-lg font-semibold transition-all border ${
                        isDark
                          ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}>
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Payment Method</h2>
                  <div className={`p-4 rounded-lg border ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10"
                      : "bg-gray-50/50 border-purple-300/10"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"
                        }`}>
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Visa ending in 4242</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Expires 12/2025</div>
                        </div>
                      </div>
                      <button className={`font-semibold ${
                        isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
                      }`}>
                        Edit
                      </button>
                    </div>
                  </div>
                  <button className={`mt-4 px-4 py-2.5 rounded-lg font-semibold transition-all border flex items-center gap-2 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}>
                    <Plus className="w-4 h-4" />
                    Add Payment Method
                  </button>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Billing History</h2>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className={`flex items-center justify-between p-4 rounded-lg border ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/10"
                          : "bg-gray-50/50 border-purple-300/10"
                      }`}>
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Pro Plan Subscription</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>March 1, 2024</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>$29.00</div>
                          <div className="text-green-400 text-sm">Paid</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full mt-4 px-4 py-2.5 rounded-lg font-semibold transition-all border ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}>
                    View All Invoices
                  </button>
                </div>
              </>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <>
                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Profile Visibility</h2>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-gray-50/50 border-purple-300/10"
                    }`}>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>Who can see your profile?</label>
                      <select className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                        isDark
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}>
                        <option>Public - Anyone can view</option>
                        <option>Connections Only</option>
                        <option>Private - Only Me</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'Show learning progress to others', enabled: true },
                        { label: 'Show skills on public profile', enabled: true },
                        { label: 'Show projects portfolio', enabled: false },
                        { label: 'Show email to connections', enabled: false },
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                          isDark
                            ? "bg-slate-800/50 border-purple-500/10"
                            : "bg-gray-50/50 border-purple-300/10"
                        }`}>
                          <div className={`font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>{item.label}</div>
                          <button
                            onClick={() => console.log('Toggle privacy setting', index)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              item.enabled ? 'bg-gradient-to-r from-purple-500 to-pink-500' : (
                                isDark ? 'bg-slate-700' : 'bg-gray-300'
                              )
                            }`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/30"
                    : "bg-white/80 border-purple-300/20 hover:border-purple-300/30"
                }`}>
                  <h2 className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>Data & Privacy</h2>
                  <div className="space-y-4">
                    <button className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                        : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Download className={`w-5 h-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`} />
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Download Your Data</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Get a copy of your SkillBridge data</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`} />
                    </button>

                    <button className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                        : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
                    }`}>
                      <div className="flex items-center gap-3">
                        <FileText className={`w-5 h-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`} />
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Privacy Policy</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Learn how we protect your data</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`} />
                    </button>

                    <button className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                        : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
                    }`}>
                      <div className="flex items-center gap-3">
                        <HelpCircle className={`w-5 h-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`} />
                        <div>
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>Help & Support</div>
                          <div className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>Get help with privacy settings</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}