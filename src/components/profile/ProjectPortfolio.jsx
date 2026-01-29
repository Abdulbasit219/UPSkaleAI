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
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            isDark
              ? "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"
              : "bg-purple-100 hover:bg-purple-200 text-purple-600"
          }`}
          onClick={() => setShowProjectModal(true)}
        >
          <Plus className="w-4 h-4" /> Add
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
