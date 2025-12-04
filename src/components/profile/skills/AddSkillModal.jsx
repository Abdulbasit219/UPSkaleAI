import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

const AddSkillModal = ({
  openSkillsModal,
  setOpenSkillsModal,
  isDark,
  handleAddSkill,
}) => {
  const [localSkill, setLocalSkill] = useState({
    skillName: "",
    level: "",
    lastPracticed: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLocalSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    handleAddSkill(localSkill)
    setLocalSkill({ name: "", level: "", lastPracticed: "" });
    setOpenSkillsModal(false)
  }

  return (
    <Dialog open={openSkillsModal} onOpenChange={setOpenSkillsModal}>
      <DialogContent
        className={`${isDark ? "bg-slate-900 text-white" : "bg-white"}`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add New Skill</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <Input
            placeholder="Skill Name (e.g., React, Node.js)"
            className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            name="skillName"
            value={localSkill.skillName}
            onChange={handleInputChange}
          />

          <Input
            placeholder="Skill Level (Beginner / Intermediate / Expert)"
            name="level"
            value={localSkill.level}
            onChange={handleInputChange}
            className={`${isDark ? "bg-slate-800 text-white" : ""}`}
          />

          <Input
            placeholder="lastPracticed"
            name="lastPracticed"
            value={localSkill.lastPracticed}
            type="text"
            onChange={handleInputChange}
            className={`${isDark ? "bg-slate-800 text-white" : ""}`}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 cursor-pointer to-pink-500 text-white"
          >
            Add Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillModal;
