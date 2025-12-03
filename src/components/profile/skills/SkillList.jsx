import React, { useState } from "react";
import SkillCard from "./SkillCard";
// import AddSkillModal from "./AddSkillModal";
import { BarChart3, Plus } from "lucide-react";

const SkillList = ({ isDark }) => {
  const [openSkillsModal, setOpenSkillsModal] = useState(false);

  const skills = [
    {
      id: 1,
      name: "HTML/CSS",
      icon: "code",
      level: "Expert",
      progress: 100,
      lastPracticed: "Today",
    },
    {
      id: 2,
      name: "JavaScript",
      icon: "javascript",
      level: "Advanced",
      progress: 100,
      lastPracticed: "Yesterday",
    },
    {
      id: 3,
      name: "React.js",
      icon: "react",
      level: "Advanced",
      progress: 100,
      lastPracticed: "2 days ago",
    },
    {
      id: 4,
      name: "Node.js",
      icon: "node",
      level: "Intermediate",
      progress: 100,
      lastPracticed: "1 week ago",
    },
    {
      id: 5,
      name: "MongoDB",
      icon: "database",
      level: "Intermediate",
      progress: 100,
      lastPracticed: "5 days ago",
    },
    {
      id: 6,
      name: "Express.js",
      icon: "server",
      level: "Intermediate",
      progress: 100,
      lastPracticed: "3 days ago",
    },
  ];

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
  });

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ name: "", level: "" });
    setOpenSkillsModal(false);
  };

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 ${
        isDark
          ? "bg-slate-900/80 border-purple-500/20"
          : "bg-white border-purple-300/20"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-xl font-bold flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Skills & Expertise
        </h3>

        <button
          onClick={() => setOpenSkillsModal(true)}
          className={`px-4 py-2 text-sm rounded-lg border flex items-center gap-2 font-semibold hover:scale-105 ${
            isDark
              ? "bg-purple-500/20 text-purple-300 border-purple-500/20 hover:bg-purple-500/30"
              : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
          }`}
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* SKILL LIST */}
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} isDark={isDark} />
        ))}
      </div>

      {/* MODAL */}
      {/* <AddSkillModal
        open={openSkillsModal}
        setOpen={setOpenSkillsModal}
        newSkill={newSkill}
        setNewSkill={setNewSkill}
        handleAddSkill={handleAddSkill}
        isDark={isDark}
      /> */}
    </div>
  );
};

export default SkillList;
