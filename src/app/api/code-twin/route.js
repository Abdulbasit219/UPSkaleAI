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
      
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

export async function POST(request) {
  try {
    const { messages, context } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Conversation history is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are **CodeTwin** – The Elite Neural Coding Mentor 🤖💻  
Your mission is to architect breakthroughs, solve complex logical puzzles, and teach users to think like senior engineers.

**Your Role as CodeTwin:**
- Explain architectural patterns, data structures, and algorithms with high-fidelity clarity.
- Provide "Deep Debugging" – don't just fix code; explain the logical fallacy and guide the user to the solution.
- Suggest modern best practices (Clean Code, SOLID, DRY) and performance micro-optimizations.
- Review code snippets for security vulnerabilities and efficiency bottlenecks.
- Be encouraging, precise, and professional.

**Current Context:**
${context || "Pair programming and technical mentorship"}

**Response Structure:**
1. **Conceptual Insight** - A brief high-level summary of the solution or concept.
2. **Logic Breakdown** - Step-by-step technical explanation.
3. **Optimized Implementation** - Clean, production-ready code blocks (Markdown).
4. **Architect's Tip** - A "pro-tip" about scalability or maintenance.

**Critical Boundaries:**
- If code is provided with bugs, highlight the *location* and *reason* before providing the fix.
- Always use modern ECMAScript/Language standards.
- Keep explanations actionable and concise.
`;

    // Map history to @google/genai format
    let conversationHistory = messages.map((msg) => ({
      role: msg.type === "ai" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Ensure history starts with 'user'
    const firstUserIndex = conversationHistory.findIndex(
      (m) => m.role === "user"
    );
    if (firstUserIndex !== -1) {
      conversationHistory = conversationHistory.slice(firstUserIndex);
    }

    // Inject system prompt into the first message
    if (conversationHistory.length > 0) {
      conversationHistory[0].parts[0].text = `System Instruction: ${systemPrompt}\n\nUser Message: ${conversationHistory[0].parts[0].text}`;
    }

    // Use retry with backoff
    const response = await retryWithBackoff(async () => {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash", // Changed to 2.5-flash
        contents: conversationHistory,
      });
    });

    // Extract text safely
    const responseText =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    return NextResponse.json({
      success: true,
      content: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("CodeTwin API Error:", error);

    let errorMessage = "AI service temporarily unavailable";
    let status = 500;

    if (error.message?.includes("API_KEY")) {
      errorMessage = "AI service configuration error";
    } else if (error.status === 429 || error.message?.includes("quota")) {
      errorMessage = "The AI is currently busy. Please try again in 10 seconds.";
      status = 429;
    } else if (error.message?.includes("role")) {
      errorMessage = "Conversation alignment error. Please refresh.";
      status = 400;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
        retryAfter: status === 429 ? 10 : undefined, 
      },
      { status: status }
    );
  }
}