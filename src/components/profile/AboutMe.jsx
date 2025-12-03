import { User, Edit } from "lucide-react";

const AboutMe = ({ profile, isDark, setIsEditOpen }) => {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-xl font-bold flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <User className="w-5 h-5 text-purple-400" />
          About Me
        </h3>
        <button
          onClick={() => setIsEditOpen(true)}
          className={`p-2 transition-colors hover:scale-105 rounded-lg cursor-pointer ${
            isDark
              ? "text-gray-400 hover:text-white hover:bg-slate-800"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Bio */}
      <p
        className={`leading-relaxed mb-4 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {profile?.bio || "No bio available."}
      </p>
    </div>
  );
};

export default AboutMe;
