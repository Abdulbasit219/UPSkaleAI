"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ProjectUpsertModal({ open, setOpen, editData }) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const techArray = techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (editData) {
        await axios.put(`/api/user/profile/project/${editData._id}`, {
          title,
          description,
          techStack: techArray,
          projectLink,
          githubLink,
        });
      } else {
        await axios.put("/api/user/profile/project", {
          title,
          description,
          techStack: techArray,
          projectLink,
          githubLink,
        });
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setTechStack(editData.techStack?.join(", ") || "");
      setProjectLink(editData.projectLink || "");
      setGithubLink(editData.githubLink || "");
      console.log(editData);
    } else {
      // Clear fields when adding new project
      setTitle("");
      setDescription("");
      setTechStack("");
      setProjectLink("");
      setGithubLink("");
    }
  }, [editData, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`max-w-lg rounded-2xl border shadow-xl backdrop-blur-md 
    ${
      true
        ? "bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-purple-500/30"
        : "bg-gradient-to-br from-white/90 to-purple-50/90 border-purple-300/40"
    }`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-purple-400">
            {editData ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-purple-300">
              Project Title
            </label>
            <Input
              className="bg-slate-900/40 border-purple-500/30 text-purple-100"
              placeholder="e.g. Real Estate Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-purple-300">
              Project Description
            </label>
            <Textarea
              className="bg-slate-900/40 border-purple-500/30 text-purple-100"
              placeholder="Short description about your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-purple-300">
              Tech Stack (comma separated)
            </label>
            <Input
              className="bg-slate-900/40 border-purple-500/30 text-purple-100"
              placeholder="React, Node.js, MongoDB"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-purple-300">
              Live Project Link
            </label>
            <Input
              className="bg-slate-900/40 border-purple-500/30 text-purple-100"
              placeholder="https://example.com"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-purple-300">
              GitHub Link
            </label>
            <Input
              className="bg-slate-900/40 border-purple-500/30 text-purple-100"
              placeholder="https://github.com/username/project"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:scale-105 transition-all"
          >
            {loading
              ? editData
                ? "Saving..."
                : "Adding..."
              : editData
                ? "Save Changes"
                : "Add Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
