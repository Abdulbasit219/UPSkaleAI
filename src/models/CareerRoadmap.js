import mongoose from "mongoose";

const CareerRoadmapSchema = new mongoose.Schema(
  {
    role_key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    overview: String,
    timeline: String,
    difficulty: String,
    skills: [String],
    milestones: [
      {
        title: String,
        duration: String,
        progress: { type: Number, default: 0 },
        skills: [String],
        resources: { type: Number, default: 0 },
        resources_list: [
          {
            name: String,
            url: String,
          },
        ],
        completed: { type: Boolean, default: false },
      },
    ],
    jobOpportunities: [
      {
        role: String,
        companies: Number,
        avgSalary: String,
      },
    ],
    color: String,
    popularity: Number,
    demand: String,
    salary: String,
    growth: String,
  },
  { timestamps: true },
);

export default mongoose.models.CareerRoadmap ||
  mongoose.model("CareerRoadmap", CareerRoadmapSchema);
