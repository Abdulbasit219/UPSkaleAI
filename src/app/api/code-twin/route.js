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
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

export async function POST(request) {
  try {
    const { messages, context, currentCode, learningMode, isBeginner } =
      await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Conversation history is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are **CodeTwin** – A supportive AI Coding Mentor.
Your goal is to help users learn programming logic by providing clear, concise, and educational guidance.

**Current Context:**
- **Code in Editor:**
\`\`\`javascript
${currentCode || "// Editor is empty"}
\`\`\`
- **User Preference:** ${isBeginner ? "Beginner-friendly (simple analogies, no jargon)" : "Standard technical level"}

**Guidelines:**
1. **Be Concise:** Don't write long essays. Get straight to the point.
2. **Teach, Don't Provide:** Explain the concept. Don't just give the full code solution immediately.
3. **Use Markdown:** Use bolding, lists, and headers to make your response visually structured and easy to read.
4. **Interactive:** End your response with a helpful follow-up question that checks their understanding.
5. **Tone:** Be encouraging, professional, and mentor-like.

**Important:** If the user asks about something specific like "What is HTML?", explain it clearly using simple analogies but stay focused on its relationship to the coding they are doing.
`;

    // Map history to @google/genai format
    let conversationHistory = messages.map((msg) => ({
      role: msg.type === "ai" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Inject current state into prompt
    const stateInjection = `[Context: ${context}. User is currently using ${learningMode} mode. Beginner focus is ${isBeginner ? "ON" : "OFF"}.]`;

    if (conversationHistory.length > 0) {
      conversationHistory[0].parts[0].text = `System Instruction: ${systemPrompt}\n\n${stateInjection}\n\nUser Message: ${conversationHistory[0].parts[0].text}`;
    }

    const response = await retryWithBackoff(async () => {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: conversationHistory,
      });
    });

    const responseText =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    // Mock analysis generation based on the interaction (Real implementation would use a separate AI call or structured output)
    const analysis = {
      errors:
        currentCode?.includes("while") &&
        !currentCode?.includes("++") &&
        !currentCode?.includes("--")
          ? ["Possible Infinite Loop detected"]
          : [],
      optimizations: currentCode?.includes("var")
        ? ["Variable declaration: Use 'let' or 'const' instead of 'var'"]
        : ["No major optimizations needed for this beginner level."],
      concepts: ["Logic Flow", "Control Structures"],
      difficulty: isBeginner ? "Beginner" : "Intermediate",
    };

    return NextResponse.json({
      success: true,
      content: responseText,
      analysis: analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("CodeTwin API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "AI service temporarily unavailable",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
