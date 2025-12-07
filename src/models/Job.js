import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    logo: {
      type: String,
      default: "💼",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: [true, "Job type is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience level is required"],
    },
    salary: {
      type: String,
      required: [true, "Salary range is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one skill is required",
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    urgent: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["tech", "intern", "remote", "design", "marketing", "sales", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    applicants: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    applicationDeadline: {
      type: Date,
    },
    benefits: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Index for better search performance
jobSchema.index({ title: "text", company: "text", description: "text" });
jobSchema.index({ category: 1, status: 1 });
jobSchema.index({ remote: 1 });
jobSchema.index({ createdAt: -1 });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
