import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";

const userNameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validate with zod
    const result = userNameQuerySchema.safeParse(queryParam);
   
    if (!result.success) {
      const userNameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            userNameError?.length > 0
              ? userNameError.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await AuthUser.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is Available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error checking username ${error}`);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
