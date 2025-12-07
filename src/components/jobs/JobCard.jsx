import { 
  Building, 
  MapPin, 
  Clock, 
  Briefcase, 
  Award, 
  DollarSign, 
  Users, 
  Target, 
  Bookmark, 
  Share2, 
  Eye, 
  ArrowRight,
  Star 
} from "lucide-react";
import Link from "next/link";

// const { job } = props;

const JobCard = ({ job, isDark, isSaved, onSave }) => (
  <div className={`group relative backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden ${
    isDark
      ? "bg-slate-900/50 border-purple-500/20"
      : "bg-white/80 border-purple-300/20"
  }`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
        <div className="flex items-start gap-3 sm:gap-4 flex-1">
          {/* Company Logo */}
          <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl border group-hover:scale-110 transition-transform ${
            isDark ? "border-purple-500/20" : "border-purple-300/20"
          }`}>
            {job.logo}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title & Badges */}
            <div className="flex flex-col xs:flex-row xs:items-start gap-1 xs:gap-2 mb-1 sm:mb-2">
              <h3 className={`text-lg sm:text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all break-words ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {job.title}
              </h3>
              <div className="flex gap-1 flex-wrap">
                {job.featured && (
                  <div className="flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30 font-medium">
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400" />
                    Featured
                  </div>
                )}
                {job.urgent && (
                  <div className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30 font-medium animate-pulse">
                    🔥 Urgent
                  </div>
                )}
              </div>
            </div>

            {/* Company & Location */}
            <div className={`flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-4 text-xs sm:text-sm mb-2 sm:mb-3 flex-wrap ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              <div className="flex items-center gap-1 sm:gap-1.5 font-medium">
                <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                {job.company}
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                {job.location}
                {job.remote && (
                  <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">
                    Remote
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                {job.posted}
              </div>
            </div>

            {/* Description */}
            <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {job.description}
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs border font-medium transition-all ${
                    isDark
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40"
                      : "bg-purple-100 text-purple-700 border-purple-300/20 hover:bg-purple-200 hover:border-purple-400/40"
                  }`}
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs border font-medium ${
                  isDark
                    ? "bg-gray-500/10 text-gray-400 border-gray-500/20"
                    : "bg-gray-100 text-gray-600 border-gray-300/20"
                }`}>
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Match Score & Actions */}
        <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end gap-2 sm:gap-3">
          <div className="text-right">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
              <div className="relative flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />
                <span className="text-green-400 font-bold text-base sm:text-lg md:text-xl">
                  {job.match}%
                </span>
              </div>
            </div>
            <div className={`text-xs mt-0.5 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              Match Score
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onSave}
              className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all border ${
                isSaved
                  ? "text-yellow-400 bg-yellow-500/20 border-yellow-500/30 scale-110"
                  : `${
                      isDark
                        ? "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 border-slate-700 hover:border-yellow-500/30"
                        : "text-gray-600 hover:text-yellow-500 hover:bg-yellow-100 border-gray-300 hover:border-yellow-400/30"
                    }`
              }`}
            >
              <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${isSaved ? "fill-yellow-400" : ""}`} />
            </button>
            <button className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all border ${
              isDark
                ? "text-gray-400 hover:text-white hover:bg-slate-700 border-slate-700 hover:border-purple-500/30"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-300 hover:border-purple-400/30"
            }`}>
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between pt-3 sm:pt-4 border-t gap-2 sm:gap-0 ${
        isDark ? "border-purple-500/20" : "border-purple-300/20"
      }`}>
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
          <div className={`flex items-center gap-1 sm:gap-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">{job.type}</span>
          </div>
          <div className={`flex items-center gap-1 sm:gap-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">{job.experience}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-green-400 font-semibold">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            {job.salary}
          </div>
          <div className={`flex items-center gap-1 sm:gap-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            {job.applicants} applicants
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
          <Link
            href={`/jobsearch/details/${job.id}`}
            className={`px-3 py-1.5 sm:px-4 sm:py-2.5 border rounded-lg sm:rounded-xl font-semibold transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
              isDark
                ? "bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700 hover:border-purple-500/30"
                : "bg-white/80 border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-purple-400/30"
            }`}
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            Details
          </Link>
          <Link
            href={`/jobsearch/apply/${job.id}`}
            className="px-4 py-1.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:scale-105"
          >
            Apply Now
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default JobCard;