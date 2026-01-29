import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteExperience } from "@/store/slices/profileSlice";
import { toast } from "sonner";
import FormModal from "./FormModal";

const ExperienceSection = ({ experience, isDark }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const handleEdit = (exp) => {
    setSelectedExperience(exp);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedExperience(null);
    setShowModal(true);
  };

  const handleDelete = async (experienceId) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      await dispatch(deleteExperience(experienceId)).unwrap();
      toast.success("Experience deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete experience");
    }
  };

  return (
    <>
      <div
        className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
          isDark
            ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20"
            : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-xl font-bold flex items-center gap-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <Briefcase className="w-5 h-5 text-purple-400" />
            Work Experience
          </h3>
          <button
            onClick={handleAdd}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isDark
                ? "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20"
                : "bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300"
            }`}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {!experience || experience.length === 0 ? (
          <div
            className={`text-center py-12 rounded-lg border-2 border-dashed ${
              isDark
                ? "border-slate-700 bg-slate-800/30"
                : "border-gray-300 bg-gray-50/50"
            }`}
          >
            <Briefcase
              className={`w-12 h-12 mx-auto mb-3 ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No work experience added yet
            </p>
            <button
              onClick={handleAdd}
              className="mt-4 text-sm text-purple-500 hover:text-purple-600 font-medium"
            >
              Add your first experience
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp._id}
                className={`group relative p-4 rounded-lg border transition-all ${
                  isDark
                    ? "bg-slate-800/50 border-slate-700 hover:border-purple-500/30"
                    : "bg-gray-50 border-gray-200 hover:border-purple-300"
                }`}
              >
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(exp)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? "bg-slate-700 hover:bg-slate-600 text-purple-400"
                        : "bg-white hover:bg-gray-100 text-purple-600"
                    }`}
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? "bg-slate-700 hover:bg-red-500/10 text-red-400"
                        : "bg-white hover:bg-red-50 text-red-600"
                    }`}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4
                  className={`font-semibold pr-20 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {exp.title}
                </h4>
                <p
                  className={`text-sm mt-1 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {exp.company}
                </p>
                {exp.location && (
                  <p
                    className={`text-xs mt-1 flex items-center gap-1 ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </p>
                )}
                <p
                  className={`text-xs mt-2 flex items-center gap-1 ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p
                    className={`text-sm mt-3 leading-relaxed ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <FormModal
          type="experience"
          open={showModal}
          setOpen={setShowModal}
          editData={selectedExperience}
          isDark={isDark}
        />
      )}
    </>
  );
};

export default ExperienceSection;
