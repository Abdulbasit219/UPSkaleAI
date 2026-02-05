import React from "react";
import Link from "next/link";
import {
  Shield,
  Settings,
  Building2,
  Sparkles,
  User,
  DollarSign,
  LogOut,
} from "lucide-react";

function UserDropdown({
  isUserDropdownOpen,
  userDropdownRef,
  getUserDisplayName,
  session,
  handleSignOut,
  isDark,
}) {
  const getRoleBasedMenuItems = () => {
    if (!session) return [];
    const role = session?.user?.role;

    switch (role) {
      case "Admin":
        return [
          {
            name: "Admin Dashboard",
            href: "/admin",
            icon: <Shield className="w-4 h-4" />,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: <Settings className="w-4 h-4" />,
          },
        ];
      case "Company":
        return [
          {
            name: "Company Dashboard",
            href: "/company/dashboard",
            icon: <Building2 className="w-4 h-4" />,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: <Settings className="w-4 h-4" />,
          },
        ];
      case "Job Seeker":
      default:
        return [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: <Sparkles className="w-4 h-4" />,
          },
          {
            name: "Profile",
            href: "/profile",
            icon: <User className="w-4 h-4" />,
          },
          {
            name: "Pricing",
            href: "/pricing",
            icon: <DollarSign className="w-4 h-4" />,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: <Settings className="w-4 h-4" />,
          },
        ];
    }
  };

  const userMenuItems = getRoleBasedMenuItems();

  return (
    <>
      {isUserDropdownOpen && (
        <div
          ref={userDropdownRef}
          className={`fixed top-[3.75rem] sm:top-[4.25rem] right-4 sm:right-6 w-56 sm:w-64 backdrop-blur-3xl border rounded-2xl sm:rounded-[2rem] shadow-2xl py-2 sm:py-3 z-[10000] animate-in fade-in zoom-in-95 duration-200 ${isDark ? "bg-slate-950/90 border-white/10" : "bg-white/95 border-slate-200"}`}
        >
          <div
            className={`px-5 sm:px-6 py-3 sm:py-4 border-b border-slate-100 ${isDark ? "border-white/5" : "border-slate-100"}`}
          >
            <p className="text-xs sm:text-sm font-black text-white tracking-tight dark:text-white text-slate-900">
              {getUserDisplayName()}
            </p>
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 truncate mt-0.5">
              {session?.user?.email}
            </p>
          </div>
          <div className="py-2 sm:py-3 px-1.5 sm:px-2">
            {userMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider mx-1.5 sm:mx-2 rounded-xl sm:rounded-2xl transition-all ${isDark ? "text-slate-400 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
              >
                <span className="text-purple-500">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <div
              className={`mx-4 sm:mx-6 my-2 sm:my-3 border-t ${isDark ? "border-white/5" : "border-slate-100"}`}
            />
            <button
              onClick={handleSignOut}
              className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider mx-3 sm:mx-4 rounded-xl sm:rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDropdown;
