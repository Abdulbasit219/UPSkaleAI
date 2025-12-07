import connectDB from "@/lib/connectDB";
import JobApplication from "@/models/JobApplication";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// PATCH /api/company/applications/[id] - Update application status
export async function PATCH(request, { params }) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to update applications",
        },
        { status: 401 }
      );
    }

    // Check if user is a company
    if (session.user.role !== "Company") {
      return Response.json(
        {
          success: false,
          message: "Only company users can update applications",
        },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { status, notes } = body;

    // Validate status
    const validStatuses = [
      "pending",
      "reviewing",
      "shortlisted",
      "rejected",
      "accepted",
    ];
    if (status && !validStatuses.includes(status)) {
      return Response.json(
        {
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Find the application
    const application = await JobApplication.findById(id).populate("job");

    if (!application) {
      return Response.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 }
      );
    }

    // Verify that the job belongs to the logged-in company
    const userId = session.user.id || session.user._id || session.user.sub;
    if (application.job.postedBy.toString() !== userId.toString()) {
      return Response.json(
        {
          success: false,
          message: "You are not authorized to update this application",
        },
        { status: 403 }
      );
    }

    // Update the application
    if (status) {
      application.status = status;
    }
    if (notes !== undefined) {
      application.notes = notes;
    }

    await application.save();

    // Populate user and job for the response
    await application.populate("user");

    return Response.json(
      {
        success: true,
        data: application,
        message: `Application ${status === "accepted" ? "approved" : status === "rejected" ? "rejected" : "updated"} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application:", error);
    return Response.json(
      {
        success: false,
        message: "Error updating application",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/company/applications/[id] - Delete an application
export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to delete applications",
        },
        { status: 401 }
      );
    }

    // Check if user is a company
    if (session.user.role !== "Company") {
      return Response.json(
        {
          success: false,
          message: "Only company users can delete applications",
        },
        { status: 403 }
      );
    }

    const { id } = params;

    // Find the application
    const application = await JobApplication.findById(id).populate("job");

    if (!application) {
      return Response.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 }
      );
    }

    // Verify that the job belongs to the logged-in company
    const userId = session.user.id || session.user._id || session.user.sub;
    if (application.job.postedBy.toString() !== userId.toString()) {
      return Response.json(
        {
          success: false,
          message: "You are not authorized to delete this application",
        },
        { status: 403 }
      );
    }

    // Delete the application
    await JobApplication.findByIdAndDelete(id);

    return Response.json(
      {
        success: true,
        message: "Application deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting application:", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting application",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
