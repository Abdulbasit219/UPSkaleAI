import {
  Trash,
  Edit,
  Heart,
  Eye,
  ExternalLink,
} from "lucide-react";
import ProjectTechBadge from "./ProjectTechBadge";

const ProjectCard = ({ project, isDark, deleteProject, handleEdit }) => {
  return (
    <div
      className={`group border rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
        isDark
          ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-purple-500/20"
          : "bg-white/50 border-purple-300/10 hover:border-purple-300/30 hover:shadow-purple-300/20"
      }`}
    >
      {/* Banner */}
      <div
        className={`h-32 flex items-center justify-center text-5xl relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-slate-800 to-slate-700"
            : "bg-gradient-to-br from-gray-100 to-gray-200"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              : "bg-gradient-to-br from-purple-100 to-pink-100"
          }`}
        ></div>

        <span className="relative z-10">project image</span>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 z-20">
          {/* Delete */}
          <button
            className={`px-2 py-1 backdrop-blur-sm rounded-full text-xs transition hover:bg-red-600 hover:text-white cursor-pointer ${
              isDark
                ? "bg-slate-900/80 text-white"
                : "bg-white/80 text-gray-700"
            }`}
            onClick={() => deleteProject(project._id)}
          >
            <Trash className="w-4 h-4" />
          </button>

          {/* Edit */}
          <button
            className={`px-2 py-1 backdrop-blur-sm rounded-full text-xs transition hover:bg-blue-600 hover:text-white cursor-pointer ${
              isDark
                ? "bg-slate-900/80 text-white"
                : "bg-white/80 text-gray-700"
            }`}
            onClick={() => handleEdit(project)}
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4
          className={`font-bold mb-1 group-hover:text-purple-400 transition-colors ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {project?.title}
        </h4>

        <p
          className={`text-sm mb-3 line-clamp-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {project?.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project?.techStack?.map((tech, i) => (
            <ProjectTechBadge key={i} tech={tech} isDark={isDark} />
          ))}
        </div>

        {/* Stats + Link */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-3 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>project likes</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>project views</span>
            </div>
          </div>

          <a
            href={project.projectLink}
            target="_blank"
            className={`p-1.5 transition hover:scale-105 rounded ${
              isDark
                ? "text-gray-400 hover:text-white hover:bg-slate-700"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
