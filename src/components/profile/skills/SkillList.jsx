import React, { useState } from "react";
import SkillCard from "./SkillCard";
import { BarChart3, Plus } from "lucide-react";
import AddSkillModal from "./AddSkillModal";
import EditSkillModal from "./EditSkillModal";

const SkillList = ({
  isDark,
  handleAddSkill,
  handleUpdateSkill,
  handleDeleteSkill,
  skills,
}) => {
  const [openSkillsModal, setOpenSkillsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleEdit = (skill) => {
    setSelectedSkill(skill);
    setOpenEditModal(true);
  };

  const handleDelete = (skill) => {
    if (
      window.confirm(`Are you sure you want to delete "${skill.skillName}"?`)
    ) {
      handleDeleteSkill(skill);
    }
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
          className={`px-4 py-2 text-sm rounded-lg border flex items-center gap-2 font-semibold hover:scale-105 cursor-pointer ${
            isDark
              ? "bg-purple-500/20 text-purple-300 border-purple-500/20 hover:bg-purple-500/30"
              : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
          }`}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* SKILL LIST */}
      <div className="space-y-3">
        {skills?.map((skill, index) => (
          <SkillCard
            key={skill._id || index}
            skill={skill}
            isDark={isDark}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {openSkillsModal && (
        <AddSkillModal
          openSkillsModal={openSkillsModal}
          setOpenSkillsModal={setOpenSkillsModal}
          isDark={isDark}
          handleAddSkill={handleAddSkill}
        />
      )}

      {openEditModal && selectedSkill && (
        <EditSkillModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          isDark={isDark}
          handleUpdateSkill={handleUpdateSkill}
          skill={selectedSkill}
        />
      )}
    </div>
  );
};

export default SkillList;
