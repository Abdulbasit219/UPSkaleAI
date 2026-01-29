import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";
import CareerRoadmap from "@/models/CareerRoadmap";
import UserCareerProgress from "@/models/UserCareerProgress";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

function mergeUserProgress(milestones, userProgressEntry) {
  return milestones.map((m, idx) => {
    const prog = userProgressEntry?.milestonesProgress?.find(
      (mp) => mp.milestoneIndex === idx,
    );
    return {
      ...m,
      resources_list: m.resources_list || [],
      progress: prog?.progress || 0,
      completed: prog?.completed || false,
    };
  });
}

export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userProgress = session
      ? await UserCareerProgress.find({ userId: session.user._id }).lean()
      : [];

    const paths = await CareerRoadmap.find({}).lean();

    let sanitizedPaths = paths.map((p) => {
      const myProgress = userProgress.find((up) => up.role_key === p.role_key);
      return {
        ...p,
        id: p.role_key,
        milestones: mergeUserProgress(p.milestones, myProgress),
        _id: undefined,
      };
    });

    if (sanitizedPaths.length === 0) {
      sanitizedPaths = [
        {
          id: "frontend_developer",
          role_key: "frontend_developer",
          name: "Frontend Developer",
          overview: "Focuses on the visual and interactive parts of a website.",
          timeline: "6 Months",
          difficulty: "Intermediate",
          color: "from-blue-500 to-cyan-500",
          popularity: 95,
          skills: ["React", "Tailwind", "Next.js"],
          milestones: [
            {
              title: "HTML & CSS Mastery",
              duration: "1 Month",
              skills: ["Flexbox", "Grid"],
              progress: 100,
              completed: true,
              resources: 2,
              resources_list: [
                { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
                { name: "CSS Tricks", url: "https://css-tricks.com" },
              ],
            },
          ],
          jobOpportunities: [
            { role: "Junior Frontend", companies: 200, avgSalary: "$80k" },
          ],
        },
        {
          id: "backend_developer",
          role_key: "backend_developer",
          name: "Backend Developer",
          overview: "Handles server-side logic, databases, and APIs.",
          timeline: "8 Months",
          difficulty: "Advanced",
          color: "from-green-500 to-emerald-500",
          popularity: 92,
          skills: ["Node.js", "Express", "MongoDB"],
          milestones: [
            {
              title: "Server Basics",
              duration: "2 Months",
              skills: ["HTTP", "REST"],
              progress: 50,
              completed: false,
              resources: 1,
              resources_list: [
                { name: "Node.js Guide", url: "https://nodejs.org/en/docs" },
              ],
            },
          ],
          jobOpportunities: [
            { role: "Node.js Dev", companies: 150, avgSalary: "$90k" },
          ],
        },
      ];
    }

    return NextResponse.json({ success: true, paths: sanitizedPaths });
  } catch (error) {
    console.error(" CAREER API ERROR (GET):", error.message);
    return NextResponse.json({
      success: false,
      paths: [],
      error: error.message,
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { targetRole, skipCache } = await req.json();
    if (!targetRole) {
      return NextResponse.json(
        { success: false, message: "Target role is required" },
        { status: 400 },
      );
    }

    const role_key = targetRole.toLowerCase().trim().replace(/\s+/g, "_");

    if (!skipCache) {
      const cached = await CareerRoadmap.findOne({ role_key }).lean();
      if (cached) {
        const myProgress = await UserCareerProgress.findOne({
          userId: session.user._id,
          role_key,
        }).lean();
        return NextResponse.json({
          success: true,
          data: {
            ...cached,
            id: cached.role_key,
            milestones: mergeUserProgress(cached.milestones, myProgress),
            _id: undefined,
          },
        });
      }
    }

    const profile = await UserProfile.findOne({ userId: session.user._id });
    const currentSkills = profile?.skills?.map((s) => s.skillName) || [];

    const prompt = `
You are an expert AI Career Mentor inside an AI-powered career growth platform.

Your responsibility is to generate a **personalized, realistic, and job-oriented career roadmap** for the target role provided.

This roadmap will be used in a UI where:
- Each milestone is clickable
- Clicking a milestone opens a modal with a short explanation
- Users are students, junior developers, or early-career professionals

--------------------------------
TARGET ROLE:
"${targetRole}"

USER CONTEXT:
- Current Skills: ${currentSkills.length > 0 ? currentSkills.join(", ") : "Beginner / No formal skills"}
- Experience Level: Student / Junior Developer
- Goal: Become job-ready for the target role

--------------------------------
INSTRUCTIONS (CRITICAL):

1. Generate **exactly 4–5 milestones** that represent clear career phases.
2. Each milestone must:
   - Close a real skill gap
   - Be practical and industry-aligned
   - Move the user closer to employability

3. For EACH milestone:
   - Title must be simple and beginner-friendly
   - Duration must be realistic
   - Skills must be concrete (no buzzwords)
   - Explanation must be suitable for a modal:
     Explain clearly:
       • What to learn
       • Why this step matters
       • What practical actions to take
       • How this helps in real jobs
   - Do NOT provide full code solutions

4. Learning Resources (STRICT):
   - Provide exactly **3–4 REAL, WORKING URLs per milestone**
   - Prefer:
     • Official documentation
     • Trusted platforms (MDN, React.dev, Node.js, Google)
   - NO placeholders
   - URLs must match the milestone topic

5. Tone:
   - Professional
   - Encouraging
   - Mentor-like
   - Beginner-friendly
   - Career-focused (not academic)

--------------------------------
OUTPUT RULES (MANDATORY):

- Return ONLY valid JSON
- No markdown
- No comments
- No extra text

--------------------------------
EXPECTED JSON FORMAT:

{
  "role_key": "${role_key}",
  "name": "${targetRole}",
  "overview": "A concise professional overview of this career path",
  "timeline": "Estimated total time to become job-ready",
  "difficulty": "Beginner | Intermediate | Advanced",
  "skills": ["Key skill 1", "Key skill 2"],
  "milestones": [
    {
      "title": "Milestone Title",
      "duration": "X months",
      "progress": 0,
      "skills": ["Skill 1", "Skill 2"],
      "resources": 3,
      "resources_list": [
        { "name": "Resource Name", "url": "https://real-link.com" }
      ],
      "completed": false
    }
  ],
  "jobOpportunities": [
    { "role": "Relevant Job Title", "companies": 300, "avgSalary": "$XXk" }
  ],
  "color": "from-purple-500 to-pink-500",
  "popularity": 85,
  "demand": "High",
  "salary": "$80k - $120k",
  "growth": "25%"
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: prompt }],
    });
    const text = result.candidates[0].content.parts[0].text
      .replace(/```json|```/g, "")
      .trim();

    const roadmapData = JSON.parse(text);

    const newRoadmap = await CareerRoadmap.findOneAndUpdate(
      { role_key: roadmapData.role_key },
      { $set: roadmapData },
      { upsert: true, new: true },
    ).lean();

    const myProgress = await UserCareerProgress.findOne({
      userId: session.user._id,
      role_key,
    }).lean();

    return NextResponse.json({
      success: true,
      data: {
        ...newRoadmap,
        id: newRoadmap.role_key,
        milestones: mergeUserProgress(newRoadmap.milestones, myProgress),
        _id: undefined,
      },
    });
  } catch (error) {
    console.error("❌ CAREER API ERROR (POST):", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "AI roadmap generation failed: " + error.message,
      },
      { status: 500 },
    );
  }
}
