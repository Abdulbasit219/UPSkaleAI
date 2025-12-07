import { z } from "zod";

// Job creation/update schema
export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  logo: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  remote: z.boolean().optional(),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  experience: z.string().min(1, "Experience level is required"),
  salary: z.string().min(1, "Salary range is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  featured: z.boolean().optional(),
  urgent: z.boolean().optional(),
  category: z
    .enum(["tech", "intern", "remote", "design", "marketing", "sales", "other"])
    .optional(),
  status: z.enum(["active", "closed", "draft"]).optional(),
  companyWebsite: z.string().url().optional().or(z.literal("")),
  applicationDeadline: z.string().datetime().optional().or(z.literal("")),
  benefits: z.array(z.string()).optional(),
});

// Job application schema
export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  resume: z.string().url("Resume must be a valid URL"),
  answers: z.record(z.string()).optional(),
  notes: z.string().optional(),
});

// Job filter/search schema
export const jobFilterSchema = z.object({
  search: z.string().optional(),
  category: z
    .enum(["all", "tech", "intern", "remote", "design", "marketing", "sales", "other"])
    .optional(),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]).optional(),
  remote: z.enum(["true", "false"]).optional(),
  featured: z.enum(["true", "false"]).optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
  sortBy: z.enum(["recent", "salary", "match"]).optional(),
});

// Saved job schema
export const savedJobSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  notes: z.string().optional(),
});
