import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      // Check if it's a rate limit error (429)
      const isRateLimit =
        error.message?.includes("429") || error.status === 429;
      if (isRateLimit && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

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

  const result = await retryWithBackoff(async () => {
    return await ai.models.generateContent({
      model: "gemini-2.5-flash",
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
              text: `Extract ALL readable text from this PDF document.
              
Instructions:
- Include every section: contact info, summary, experience, education, skills, certifications, etc.
- Preserve the structure and formatting where possible
- Include all bullet points and descriptions
- Return ONLY the extracted text with no additional commentary

Begin extraction:`,
            },
          ],
        },
      ],
    });
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

  const match = text.match(
    /ATS SCORE:\s*(\d+)\/100|OVERALL SCORE:\s*(\d+)\/100|SCORE:\s*(\d+)\/100|(\d+)\/100/i,
  );
  const score = match
    ? parseInt(match[1] || match[2] || match[3] || match[4])
    : 70;

  return {
    score,
    status: score >= 80 ? "excellent" : score >= 60 ? "good" : "needs-work",
    raw: text,
  };
}

// -------------------------------
// Build analysis prompt based on whether job description is provided
// -------------------------------
function buildAnalysisPrompt(extractedText, jobDescription, analysisType) {
  const hasJobDescription = jobDescription && jobDescription.trim().length > 0;

  if (analysisType === "review") {
    if (hasJobDescription) {
      return `You are an experienced HR professional and career coach. Conduct a thorough resume review against the provided job description.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${extractedText}

Provide a comprehensive analysis with:

1. OVERALL ASSESSMENT
   - How well does this resume align with the job requirements?
   - What's the likelihood of getting an interview?

2. KEY STRENGTHS
   - What makes this candidate stand out for this role?
   - Which experiences/skills best match the job requirements?

3. AREAS FOR IMPROVEMENT
   - What's missing that the job description requires?
   - Which sections need strengthening?

4. SPECIFIC RECOMMENDATIONS
   - How to better tailor this resume for this position
   - Suggested additions, removals, or rephrasing
   - Keywords to incorporate

5. FORMATTING & PRESENTATION
   - Is the resume ATS-friendly?
   - Any formatting issues that could cause problems?

Be specific, actionable, and constructive.`;
    } else {
      return `You are an experienced HR professional and career coach. Conduct a comprehensive resume review and provide professional feedback.

RESUME:
${extractedText}

Provide a detailed analysis with:

1. OVERALL IMPRESSION
   - Professional presentation and formatting
   - Clarity and readability
   - Overall effectiveness

2. CONTENT STRENGTHS
   - What stands out positively?
   - Strong experiences and accomplishments
   - Well-presented skills and qualifications

3. AREAS FOR IMPROVEMENT
   - Sections that need work
   - Missing critical information
   - Vague or weak descriptions

4. SPECIFIC RECOMMENDATIONS
   - How to make experiences more impactful (use metrics, achievements)
   - Better ways to present skills and qualifications
   - What to add, remove, or rephrase

5. ATS OPTIMIZATION
   - Is this resume ATS-friendly?
   - Formatting issues to fix
   - Keyword optimization suggestions

6. INDUSTRY-SPECIFIC ADVICE
   - Based on the candidate's field, what best practices should they follow?

Be specific, actionable, and encouraging while honest about areas needing improvement.`;
    }
  } else {
    // analysisType === "percentage"
    if (hasJobDescription) {
      return `You are an ATS (Applicant Tracking System) scanner. Analyze this resume against the job description and provide a detailed compatibility assessment.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${extractedText}

Provide your analysis in EXACTLY this format:

ATS SCORE: [number]/100

KEYWORD MATCH ANALYSIS:
✓ Keywords Found:
- [list specific keywords/skills from job description found in resume]
- [be specific with examples]

✗ Keywords Missing:
- [list important keywords/skills from job description NOT found in resume]
- [prioritize by importance]

SECTION-BY-SECTION BREAKDOWN:
- Experience Match: [score]/10 - [brief explanation]
- Skills Match: [score]/10 - [brief explanation]
- Education Match: [score]/10 - [brief explanation]
- Format & Readability: [score]/10 - [brief explanation]

STRENGTHS:
- [What this resume does well for this role]
- [Specific matches with job requirements]

IMPROVEMENT AREAS:
- [What would increase the ATS score]
- [Missing qualifications or keywords]

ACTIONABLE RECOMMENDATIONS:
1. [Specific change to make]
2. [Specific keyword to add]
3. [Specific section to improve]

FINAL VERDICT:
[One paragraph summary of whether this resume would likely pass ATS screening for this role]

Be precise with the score (consider keyword matches, experience relevance, skills alignment, and format).`;
    } else {
      return `You are an ATS (Applicant Tracking System) expert. Analyze this resume and provide a comprehensive ATS compatibility score out of 100.

RESUME:
${extractedText}

Evaluate the resume based on general ATS best practices and provide your analysis in EXACTLY this format:

ATS SCORE: [number]/100

ATS COMPATIBILITY BREAKDOWN:
- Format & Structure: [score]/20 - [explanation]
- Keywords & Skills: [score]/20 - [explanation]
- Experience Descriptions: [score]/20 - [explanation]
- Contact & Basic Info: [score]/10 - [explanation]
- Education & Certifications: [score]/10 - [explanation]
- Readability & Parsing: [score]/20 - [explanation]

✓ WHAT'S WORKING:
- [ATS-friendly elements found]
- [Strong points for automated screening]
- [Good practices being followed]

✗ POTENTIAL ATS ISSUES:
- [Formatting problems that might cause parsing errors]
- [Missing standard sections]
- [Elements that ATS systems struggle with]

KEYWORD ANALYSIS:
Industry Keywords Found:
- [List relevant technical/industry keywords present]

Recommended Keywords to Add:
- [Common industry keywords missing]
- [Skills that would improve searchability]

SPECIFIC IMPROVEMENTS FOR ATS:
1. [Formatting fix needed]
2. [Content to add]
3. [Section to optimize]
4. [Keywords to incorporate]
5. [Structure changes]

OVERALL ASSESSMENT:
[2-3 sentences on whether this resume would successfully pass through most ATS systems and what the main priority should be for improvement]

Base your score on: format compatibility, keyword optimization, section clarity, parsing ease, and overall ATS-friendliness.`;
    }
  }
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
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await resumeFile.arrayBuffer());

    // Extract text using Gemini Vision
    const extractedText = await extractPdfTextWithGemini(buffer);

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 },
      );
    }

    // Build the analysis prompt (handles optional job description)
    const prompt = buildAnalysisPrompt(
      extractedText,
      jobDescription,
      analysisType,
    );

    // Call Gemini for analysis
    const analysisResult = await retryWithBackoff(async () => {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
    });

    const analysisText = extractGeminiText(analysisResult);

    return NextResponse.json({
      success: true,
      extractedTextLength: extractedText.length,
      extractedText,
      analysis: analysisText,
      parsed: parseAtsResponse(analysisText, analysisType),
      hasJobDescription: !!(jobDescription && jobDescription.trim().length > 0),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Server error",
        details: err.message,
      },
      { status: 500 },
    );
  }
}
