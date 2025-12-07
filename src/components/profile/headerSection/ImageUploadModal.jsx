"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Upload, Trash2, Crop } from "lucide-react";

export default function ImageUploadModal({
  open,
  onClose,
  onUpload,
  currentImage,
  type,
  onDelete,
  isDark,
  fileInputRef,
}) {
  const [fileToUpload, setFileToUpload] = useState(null);

  const isAvatar = type === "avatar";
  const title = isAvatar ? "Profile Photo" : "Cover Photo";

  const previewUrl = fileToUpload
    ? URL.createObjectURL(fileToUpload)
    : currentImage;

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!fileToUpload) return;
    onUpload({ target: { files: [fileToUpload] } });
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className={`
          p-0 overflow-hidden rounded-2xl border 
          ${isDark ? "bg-slate-900 text-white border-slate-700" : "bg-white border-gray-200"}
        `}
      >
        <DialogHeader className="p-5 border-b flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className="p-6 flex flex-col items-center space-y-4">
          <div
            className={`
              relative bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700
              flex items-center justify-center
              overflow-hidden shadow-md
              ${isAvatar ? "w-40 h-40 rounded-full" : "w-full h-48 rounded-xl"}
            `}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className={`object-cover w-full h-full ${
                  isAvatar ? "rounded-full" : "rounded-xl"
                }`}
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image Selected</span>
            )}
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload className="w-5 h-5 text-blue-500" />
            Choose Image
          </Button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <DialogFooter className="p-5 border-t flex justify-between">
          {/* DELETE */}
          {currentImage && (
            <Button
              variant="destructive"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDeleteClick}
            >
              <Trash2 className="w-5 h-5" />
              Delete Photo
            </Button>
          )}

          {/* SAVE / UPLOAD BUTTON */}
          <Button
            disabled={!fileToUpload}
            onClick={handleUploadClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            Save Photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
