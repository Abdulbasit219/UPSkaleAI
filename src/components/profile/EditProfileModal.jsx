"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

export default function EditProfileModal({
  profile,
  onClose,
  isOpen,
  isDark,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("role", formData.role);
    form.append("location", formData.location);
    form.append("bio", formData.bio);

    onSave(form);
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        role: profile.role || "",
        location: profile.location || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${isDark ? "bg-slate-900 text-white" : "bg-white"}`}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information here.
          </DialogDescription>
        </DialogHeader>

        {/* Input Fields */}
        <div className="space-y-4 mt-3">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              onChange={handleChange}
              value={formData?.name}
              className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            />
          </div>

          <div>
            <Label>Role</Label>
            <Input
              onChange={handleChange}
              name="role"
              value={formData?.role}
              className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              onChange={handleChange}
              name="location"
              value={formData?.location}
              className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            />
          </div>

          <div>
            <Label>Bio</Label>
            <Textarea
              onChange={handleChange}
              name="bio"
              value={formData?.bio}
              className={`${isDark ? "bg-slate-800 text-white" : ""}`}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>

          <Button
            className="bg-gradient-to-r from-purple-500 cursor-pointer to-pink-500 text-white"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
