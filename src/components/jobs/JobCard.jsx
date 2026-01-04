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
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";

const JobCard = ({ job, isDark, isSaved, onSave }) => (
  <div
    className={`group relative backdrop-blur-xl border rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-300 hover:shadow-2xl overflow-hidden ${
      isDark
        ? "bg-slate-900/50 border-white/5 hover:border-purple-500/40 shadow-purple-950/10"
        : "bg-white border-gray-100 shadow-xl shadow-purple-500/5 hover:border-purple-200"
    }`}
  >
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div className="flex items-start gap-4 md:gap-6 flex-1">
          {/* Company Logo */}
          <div
            className={`w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-2xl flex items-center justify-center text-3xl md:text-4xl border transition-transform group-hover:scale-105 duration-500 ${
              isDark ? "border-white/5" : "border-slate-100"
            }`}
          >
            {job.logo}
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            {/* Title & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`text-xl md:text-2xl font-bold leading-none ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {job.title}
              </h3>
              <div className="flex gap-1.5">
                {job.featured && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-lg text-[10px] font-bold border border-amber-500/20">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}
                {job.urgent && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-red-500/10 text-red-600 dark:text-red-500 rounded-lg text-[10px] font-bold border border-red-500/20 animate-pulse">
                    <Zap className="w-3 h-3 fill-current" />
                    Urgent
                  </div>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div
              className={`flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-purple-500" />
                {job.company}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-500" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {job.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isDark
                      ? "bg-white/5 text-purple-300 border-white/5 hover:bg-white/10"
                      : "bg-slate-50 text-purple-600 border-slate-200 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="px-3 py-1.5 rounded-xl text-xs font-semibold opacity-40">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Side */}
        <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-4 md:min-w-[120px]">
          <div className="flex flex-col md:items-end">
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <Target className="w-4 h-4" />
              <span className="text-xl font-bold leading-none">
                {job.match}%
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              Match Score
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className={`p-2.5 rounded-xl transition-all border ${
                isSaved
                  ? "text-amber-500 bg-amber-500/10 border-amber-500/30 scale-110 shadow-lg shadow-amber-500/10"
                  : `${
                      isDark
                        ? "text-gray-500 hover:text-amber-500 hover:bg-white/5 border-white/5"
                        : "text-gray-400 hover:text-amber-500 hover:bg-amber-50 border-gray-200"
                    }`
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
              />
            </button>
            <button
              className={`p-2.5 rounded-xl transition-all border ${
                isDark
                  ? "text-gray-500 hover:text-white hover:bg-white/5 border-white/5"
                  : "text-gray-400 hover:text-slate-900 hover:bg-slate-50 border-gray-200"
              }`}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Meta Tags */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between pt-5 border-t gap-4 ${
          isDark ? "border-white/5" : "border-slate-50"
        }`}
      >
        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 flex-wrap uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            {job.type}
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            {job.experience}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {job.applicants} Applicants
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/jobsearch/details/${job.id}`}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-sm transition-all border ${
              isDark
                ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:shadow-sm"
            }`}
          >
            Details
          </Link>
          <Link
            href={`/jobsearch/apply/${job.id}`}
            className="flex-1 sm:flex-none px-8 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default JobCard;
