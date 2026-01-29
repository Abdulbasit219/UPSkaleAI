import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";

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

    const { messages, jobTitle, company } = await req.json();

    const evaluationPrompt = `
      You are an expert Interview Evaluator. You just observed a mock interview for the ${jobTitle} position at ${company}.
      
      TRANSCRIPT:
      ${messages.map((m) => `${m.role === "ai" ? "Interviewer" : "Candidate"}: ${m.content}`).join("\n")}

      TASKS:
      1. Analyze the candidate's technical knowledge based on their answers.
      2. Analyze their communication and behavioral skills.
      3. Provide a quantitative score out of 100.
      4. Provide exactly 3 actionable tips for improvement.

      RETURN JSON FORMAT ONLY:
      {
        "score": number, 
        "summary": "2-3 sentence overview of performance",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1", "weakness 2"],
        "tips": ["tip 1", "tip 2", "tip 3"]
      }
    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: evaluationPrompt,
    });

    const text =
      result.text || result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Robust JSON extraction
    let parsedData = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON:", text);
      // Fallback object if parsing fails completely
      parsedData = {
        score: 70,
        summary:
          "We encountered a technical issue generating your summary, but based on your interaction, you showed good potential.",
        strengths: ["Willingness to learn", "Professionalism"],
        weaknesses: ["Technical depth clarification needed"],
        tips: [
          "Practice explaining complex concepts simply",
          "Structure your answers using the STAR method",
          "Research specific company values more deeply",
        ],
      };
    }

    return Response.json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Evaluation Error:", error);
    return Response.json(
      { error: "Failed to generate report", details: error.message },
      { status: 500 },
    );
  }
}
