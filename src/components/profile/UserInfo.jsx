import { Briefcase, MapPin, Calendar } from "lucide-react";

const UserInfo = ({ profile, user, isDark }) => {
  const infoItems = [
    { icon: Briefcase, text: profile?.role, show: profile?.role },
    { icon: MapPin, text: profile?.location, show: profile?.location },
    {
      icon: Calendar,
      text: `Joined ${profile?.memberSince}`,
      show: profile?.memberSince,
    },
  ];

  return (
    <div className="space-y-2 flex-1 min-w-0">
      <h1
        className={`text-3xl lg:text-4xl font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {profile?.name || user?.name}
      </h1>
      <p
        className={`text-lg truncate ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        @{user?.username || profile?.name?.toLowerCase().replace(/\s+/g, "")}
      </p>

      <div
        className={`flex flex-wrap items-center gap-3 lg:gap-4 text-sm pt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {infoItems.map(({ icon: Icon, text, show }, idx) =>
          show ? (
            <div key={idx} className="flex items-center gap-1.5 min-w-0">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{text}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default UserInfo;
