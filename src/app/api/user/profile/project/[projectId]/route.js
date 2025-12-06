import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";
import { getServerSession } from "next-auth";

export async function PUT(req, { params }) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user._id;

  const { projectId } = await params;

  const { title, description, techStack, projectLink, githubLink } =
    await req.json();

  if (!projectId) {
    return Response.json(
      { success: false, message: "Project ID required" },
      { status: 400 }
    );
  }

  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId, "projects._id": projectId },
      {
        $set: {
          "projects.$.title": title,
          "projects.$.description": description,
          "projects.$.techStack": techStack,
          "projects.$.projectLink": projectLink,
          "projects.$.githubLink": githubLink,
        },

        $push: {
          recentActivity: {
            action: `Updated project details: ${title}`,
            icon: "Pencil", 
            color: "text-orange-400", 
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!updatedProfile) {
      return Response.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Project updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
