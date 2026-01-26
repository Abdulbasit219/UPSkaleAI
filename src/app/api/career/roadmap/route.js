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

    // 2. Fetch all available roadmap templates from DB
    const paths = await CareerRoadmap.find({}).lean();

    // 3. Transform and Merge Progress
    let sanitizedPaths = paths.map((p) => {
      const myProgress = userProgress.find((up) => up.role_key === p.role_key);
      return {
        ...p,
        id: p.role_key,
        milestones: mergeUserProgress(p.milestones, myProgress),
        _id: undefined,
      };
    });

    // if DB is empty, provide starter defaults
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
    console.error("❌ CAREER API ERROR (GET):", error.message);
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
      You are an AI Career Advisor. Generate a structured career roadmap to become a "${targetRole}".
      
      USER CURRENT SKILLS: ${currentSkills.length > 0 ? currentSkills.join(", ") : "None listed"}
      
      Generate exactly 4-5 milestones representing the learning path.
      Focus on the "Skill Gap" (what's missing between their current skills and the target role).
      
      CRITICAL: For EVERY milestone, you MUST provide exactly 3-4 REAL-WORLD, FUNCTIONAL documentation or tutorial URLs. 
      - Prioritize official project sites (e.g., react.dev, nodejs.org, mdn.io).
      - NEVER use placeholders like "https://..." or "https://example.com".
      - Ensure the URL is specific to the milestone topic.
      
      RETURN ONLY A VALID JSON OBJECT. NO MARKDOWN. NO COMMENTS.
      Format:
      {
        "role_key": "${role_key}",
        "name": "${targetRole}",
        "overview": "A brief professional summary",
        "timeline": "Estimated duration (e.g. 6-8 months)",
        "difficulty": "Beginner|Intermediate|Advanced",
        "skills": ["Array of skills"],
        "milestones": [
          {
            "title": "Module Name",
            "duration": "Duration",
            "progress": 0,
            "skills": ["skill1", "skill2"],
            "resources": 10,
            "resources_list": [
               { "name": "Google Maps SDK - Getting Started", "url": "https://developers.google.com/maps/documentation" },
               { "name": "React Navigation - Native Stack Navigator", "url": "https://reactnavigation.org/docs/native-stack-navigator/" },
               { "name": "MDN - Fetch API Guide", "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" }
            ],
            "completed": false
          }
        ],
        "jobOpportunities": [
          { "role": "Full Stack Engineer", "companies": 500, "avgSalary": "$95k" }
        ],
        "color": "from-purple-500 to-pink-500",
        "popularity": 90
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
