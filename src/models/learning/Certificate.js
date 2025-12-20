import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    certificateId: {
      type: String,
      unique: true,
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    score: Number,
  },
  { timestamps: true }
);

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);

export default Certificate;