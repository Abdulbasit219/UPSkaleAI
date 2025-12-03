import { Briefcase, MapPin, Calendar } from "lucide-react";

const UserInfo = ({ profile, isDark }) => {
  return (
    <div className="space-y-2 flex-1">
      <h1 className={`text-3xl lg:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
        {profile?.name}
      </h1>
      <p className={isDark ? "text-gray-400 text-lg" : "text-gray-600 text-lg"}>
        @{profile?.name}
      </p>

      <div className={`flex flex-wrap items-center gap-4 text-sm pt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4" />
          <span>{profile?.role}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{profile?.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Joined {profile?.memberSince}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
