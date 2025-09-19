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

    // 4. Call Ollama
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:1b", // swap if you want llama3
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.response?.trim() || "…";

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
