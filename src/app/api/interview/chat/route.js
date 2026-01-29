import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId, jobTitle, company, history, message, requirements } =
      await req.json();

    // 1. Fetch User Data to enrich the prompt
    const userId = session.user._id || session.user.id;
    const profile = await UserProfile.findOne({ userId });

    const userContext = profile
      ? `
      User Skills: ${profile.skills?.map((s) => s.skillName).join(", ") || "Not provided"}
      User Bio: ${profile.bio || "Not provided"}
      Experience: ${profile.experience || "Not provided"}
    `
      : "User profile data not available.";

    // 2. Construct System Instructions
    const currentQ = history.filter((m) => m.role === "ai").length + 1;

    const systemPrompt = `
      You are a Senior Technical Recruiter at ${company}. 
      You are conducting a strict 5-QUESTION mock interview for the ${jobTitle} position.
      
      CURRENT STATUS: Question ${currentQ} of 5.
      
      JOB REQUIREMENTS: ${requirements}
      USER SKILLS: ${userContext}

      STRIKT RULES:
      1. This interview MUST last exactly 5 questions.
      2. Question 1: Introduction & Motivation.
      3. Questions 2-4: Deep Technical questions based on Job Requirements and User Skills.
      4. Question 5: Behavioral/Soft Skills question.
      5. After the candidate answers the 5th question, ANY 5th question, DO NOT ask another question. Instead, say exactly: "Thank you for your time. This concludes our mock interview. Please click the button below to see your detailed performance report."
      6. Acknowledge the user's previous answer briefly before asking the next question.
      7. Be firm but professional.

      CONVERSATION HISTORY:
      ${history.map((m) => `${m.role === "ai" ? "Interviewer" : "Candidate"}: ${m.content}`).join("\n")}
      
      Candidate's Latest Message: ${message}
    `;

    // 3. Generate Content using the correct SDK syntax
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    });

    const text =
      result.text || result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return Response.json({
      success: true,
      content: text,
    });
  } catch (error) {
    console.error("Gemini Interview Error:", error);
    return Response.json(
      {
        error: "AI Service failed to respond",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
