import React, { useState } from "react";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { deleteEducation } from "@/store/slices/profileSlice";
import FormModal from "./FormModal";

export default function EducationSection({ education = [], isDark }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const dispatch = useDispatch();

  const handleEdit = (edu) => {
    setSelectedEducation(edu);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedEducation(null);
    setShowModal(true);
  };

  const handleDelete = async (educationId) => {
    if (!confirm("Are you sure you want to delete this education?")) return;

    try {
      await dispatch(deleteEducation(educationId)).unwrap();
      toast.success("Education deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete education");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <>
      <div
        className={`rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/70 border-purple-200"
        }`}
      >
        <div className="p-6 border-b border-purple-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  isDark ? "bg-purple-500/10" : "bg-purple-100"
                }`}
              >
                <GraduationCap
                  className={`w-5 h-5 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                />
              </div>
              <h2
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Education
              </h2>
            </div>
            <button
              onClick={handleAdd}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isDark
                  ? "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"
                  : "bg-purple-100 hover:bg-purple-200 text-purple-600"
              }`}
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <div className="p-6">
          {!education || education.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap
                className={`w-12 h-12 mx-auto mb-3 ${
                  isDark ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No education added yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={edu._id || index}
                  className={`p-4 rounded-xl border transition-all group ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                      : "bg-gray-50 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-lg ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {edu.degree}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`}
                      >
                        {edu.institution}
                      </p>

                      {edu.fieldOfStudy && (
                        <p
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {edu.fieldOfStudy}
                        </p>
                      )}

                      <div
                        className={`flex flex-wrap gap-4 mt-3 text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(edu.startDate)} -{" "}
                            {edu.current ? "Present" : formatDate(edu.endDate)}
                          </span>
                        </div>

                        {edu.grade && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Grade:</span>
                            <span>{edu.grade}</span>
                          </div>
                        )}
                      </div>

                      {edu.description && (
                        <p
                          className={`mt-3 text-sm leading-relaxed ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {edu.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(edu)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? "hover:bg-purple-500/20 text-purple-400"
                            : "hover:bg-purple-100 text-purple-600"
                        }`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? "hover:bg-red-500/20 text-red-400"
                            : "hover:bg-red-100 text-red-600"
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <FormModal
          type="education"
          open={showModal}
          setOpen={setShowModal}
          editData={selectedEducation}
          isDark={isDark}
        />
      )}
    </>
  );
}
