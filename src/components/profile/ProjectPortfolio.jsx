import { Briefcase, Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";

const ProjectPortfolio = ({
  profile,
  isDark,
  setShowProjectModal,
  deleteProject,
  handleEdit,
}) => {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3
          className={`text-xl font-bold flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <Briefcase className="w-5 h-5 text-purple-400" />
          Project Portfolio
        </h3>

        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
          onClick={() => setShowProjectModal(true)}
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Project List */}
      <div className="grid sm:grid-cols-2 gap-4">
        {profile?.projects?.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            isDark={isDark}
            deleteProject={deleteProject}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPortfolio;
