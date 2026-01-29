import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "DevOps",
        "AI/ML",
        "Other",
      ],
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    skills: [{ type: String }],
    tags: {
      type: [String],
      default: [],
    },
    estimatedTime: {
      type: String,
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    totalLessons: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Indexes
CourseSchema.index({ category: 1, isPublished: 1 });
CourseSchema.index({ slug: 1 });

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;
