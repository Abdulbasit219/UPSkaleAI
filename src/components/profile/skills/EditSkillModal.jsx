import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";

const EditSkillModal = ({
  openEditModal,
  setOpenEditModal,
  isDark,
  handleUpdateSkill,
  skill,
}) => {
  const [localSkill, setLocalSkill] = useState({
    skillName: "",
    level: "",
    lastPracticed: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (skill) {
      setLocalSkill({
        skillName: skill.skillName || "",
        level: skill.level || "",
        lastPracticed: skill.lastPracticed || "",
      });
    }
  }, [skill]);

  const skillLevels = {
    beginner: {
      progress: 25,
      color: "from-red-500 to-orange-500",
      label: "Beginner",
    },
    intermediate: {
      progress: 60,
      color: "from-yellow-500 to-amber-500",
      label: "Intermediate",
    },
    advanced: {
      progress: 85,
      color: "from-blue-500 to-cyan-500",
      label: "Advanced",
    },
    expert: {
      progress: 100,
      color: "from-green-500 to-emerald-500",
      label: "Expert",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setLocalSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleLevelChange = (value) => {
    setError("");
    setLocalSkill((prev) => ({ ...prev, level: value }));
  };

  const handleSubmit = () => {
    if (!localSkill.skillName.trim()) {
      setError("Skill name is required");
      return;
    }

    if (!localSkill.level) {
      setError("Skill level is required");
      return;
    }

    if (!localSkill.lastPracticed.trim()) {
      setError("Last practiced date is required");
      return;
    }

    const normalizedLevel = localSkill.level.toLowerCase();
    const levelConfig = skillLevels[normalizedLevel];

    const skillData = {
      skillId: skill._id,
      skillName: localSkill.skillName.trim(),
      level: levelConfig.label,
      progress: levelConfig.progress,
      lastPracticed: localSkill.lastPracticed.trim(),
      colorClass: levelConfig.color,
    };

    handleUpdateSkill(skillData);
    setError("");
    setOpenEditModal(false);
  };

  return (
    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
      <DialogContent
        className={`${isDark ? "bg-slate-900 text-white" : "bg-white"}`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Edit Skill</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <div>
            <Input
              placeholder="Skill Name (e.g., React, Node.js)"
              className={`${isDark ? "bg-slate-800 text-white" : ""}`}
              name="skillName"
              value={localSkill.skillName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Select value={localSkill.level} onValueChange={handleLevelChange}>
              <SelectTrigger
                className={`${isDark ? "bg-slate-800 text-white border-slate-700" : ""}`}
              >
                <SelectValue placeholder="Select Skill Level" />
              </SelectTrigger>
              <SelectContent
                className={`${isDark ? "bg-slate-800 text-white border-slate-700" : ""}`}
              >
                <SelectItem value="Beginner">Beginner (25%)</SelectItem>
                <SelectItem value="Intermediate">Intermediate (60%)</SelectItem>
                <SelectItem value="Advanced">Advanced (85%)</SelectItem>
                <SelectItem value="Expert">Expert (100%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              placeholder="Last Practiced (e.g., 2 days ago, Yesterday)"
              name="lastPracticed"
              value={localSkill.lastPracticed}
              type="text"
              onChange={handleInputChange}
              className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpenEditModal(false);
              setError("");
            }}
            className={`${isDark ? "border-slate-700 text-white hover:bg-slate-800" : ""}`}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
          >
            Update Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSkillModal;
