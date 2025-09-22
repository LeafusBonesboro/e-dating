import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { characterId, userMessage } = await req.json();

    // 1. Load character
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // 2. Load last 10 messages for memory
    const history = await prisma.message.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    const historyText = history
      .map((m) =>
        `${m.sender === "user" ? "User" : character.name}: ${m.content}`
      )
      .join("\n");

    // 3. Build personality-aware prompt
    const systemPrompt = `
You are roleplaying as ${character.name}.
Bio: ${character.bio}.
Speak in a way that reflects ${character.name}'s personality.
Only respond as ${character.name}, never break character.
    `;

    const prompt = `
${systemPrompt}

Conversation so far:
${historyText}

User: ${userMessage}
${character.name}:
    `;

    
    // 4. Call OpenAI
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini", // you can also use "gpt-4o" or "gpt-3.5-turbo"
    messages: [
      { role: "system", content: systemPrompt },
      ...history.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content,
      })),
      { role: "user", content: userMessage },
    ],
  }),
});

if (!response.ok) {
  throw new Error(`OpenAI error: ${response.statusText}`);
}

const data = await response.json();
const reply = data.choices?.[0]?.message?.content?.trim() || "…";


    // 5. Save messages
    await prisma.message.create({
      data: {
        content: userMessage,
        sender: "user",
        characterId,
      },
    });

    await prisma.message.create({
      data: {
        content: reply,
        sender: "ai",
        characterId,
      },
    });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
