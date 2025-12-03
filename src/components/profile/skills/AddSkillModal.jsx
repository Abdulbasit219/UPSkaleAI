import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";

const AddSkillModal = ({
  openSkillsModal,
  setOpenSkillsModal,
  isDark,
  newSkill,
  setNewSkill,
  handleAddSkill,
}) => {
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
            // value={newSkill.name}
            // onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />

          <Input
            placeholder="Skill Level (Beginner / Intermediate / Expert)"
            className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            // value={newSkill.level}
            // onChange={(e) =>
            //   setNewSkill({ ...newSkill, level: e.target.value })
            // }
          />

          <Input
            placeholder="lastPracticed"
            type="text"
            className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            // value={newSkill.progress}
            // onChange={(e) =>
            //   setNewSkill({ ...newSkill, progress: Number(e.target.value) })
            // }
          />

        </div>

        <DialogFooter>
          <Button
            onClick={handleAddSkill}
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
