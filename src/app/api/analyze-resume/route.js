import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// -------------------------------
// Helper: Extract TEXT from Gemini response
// -------------------------------
function extractGeminiText(result) {
  return (
    result?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text || "")
      .join("") || ""
  );
}

// -------------------------------
// Extract text from PDF using Gemini Vision
// -------------------------------
async function extractPdfTextWithGemini(buffer) {
  const base64 = buffer.toString("base64");

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64,
            },
          },
          {
            text: `
Extract ALL readable text from this PDF.
Return only plain text. No summaries. No analysis.
`,
          },
        ],
      },
    ],
  });

  return extractGeminiText(result);
}

// -------------------------------
// ATS result parser
// -------------------------------
function parseAtsResponse(text, analysisType) {
  if (analysisType !== "percentage") {
    return { raw: text, score: 75, status: "review" };
  }

  const match = text.match(/(\d+)%/);
  const score = match ? parseInt(match[1]) : 70;

  return {
    score,
    status: score >= 80 ? "excellent" : score >= 60 ? "good" : "needs-work",
    raw: text,
  };
}

// -------------------------------
// POST handler
// -------------------------------
export async function POST(request) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get("resume");
    const jobDescription = formData.get("jobDescription") || "";
    const analysisType = formData.get("analysisType") || "percentage";

    if (!resumeFile) {
      return NextResponse.json(
        { error: "No resume uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await resumeFile.arrayBuffer());

    // Extract text using Gemini Vision
    const extractedText = await extractPdfTextWithGemini(buffer);

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 }
      );
    }

    // Build the analysis prompt
    const prompt =
      analysisType === "review"
        ? `
You are an HR expert. Review this resume against the job description.

Job Description:
${jobDescription}

Resume:
${extractedText}

Provide strengths, weaknesses, and improvement suggestions.
`
        : `
You are an ATS scanner. Evaluate this resume against the job description.

Job Description:
${jobDescription}

Resume:
${extractedText}

Respond ONLY in this format:

MATCH PERCENTAGE: [number]%

KEYWORDS FOUND:
- ...

KEYWORDS MISSING:
- ...

FINAL THOUGHTS:
- ...
`;

    // Call Gemini for analysis
    const analysisResult = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const analysisText = extractGeminiText(analysisResult);

    return NextResponse.json({
      success: true,
      extractedTextLength: extractedText.length,
      extractedText,
      analysis: analysisText,
      parsed: parseAtsResponse(analysisText, analysisType),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Server error",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
