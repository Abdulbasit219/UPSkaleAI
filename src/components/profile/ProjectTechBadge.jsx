const ProjectTechBadge = ({ tech, isDark }) => {
  return (
    <span
      className={`px-2 py-1 text-xs rounded border ${
        isDark
          ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
          : "bg-purple-100 text-purple-700 border-purple-200"
      }`}
    >
      {tech}
    </span>
  );
};

export default ProjectTechBadge;
