import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";

// Update job status or featured flag
export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { action } = await req.json();

    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    let updateData = {};

    switch (action) {
      case "approve":
        updateData = { status: "active" };
        break;
      case "reject":
        updateData = { status: "closed" };
        break;
      case "hide":
        updateData = { status: "draft" };
        break;
      case "feature":
        updateData = { featured: !job.featured };
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: `Job ${action}ed successfully`,
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 },
    );
  }
}

// Delete job
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const resolvedParams = await params; // ✅ the promise first
    const { id } = resolvedParams;

    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await Job.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 },
    );
  }
}
