import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { characterId, userMessage } = await req.json();

    // 0. Validate input early
    if (!characterId) {
      return NextResponse.json({ error: "Missing characterId" }, { status: 400 });
    }
    if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // 1. Load character
    const character = await prisma.character.findUnique({ where: { id: characterId } });
    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // 2. Load last 10 messages for memory
    const history = await prisma.message.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    // 3. Build system prompt
    const systemPrompt = `
You are roleplaying as ${character.name}.
Bio: ${character.bio}.
Speak in a way that reflects ${character.name}'s personality.
Only respond as ${character.name}, never break character.
    `;

    // 4. Build messages array safely
    const messages = [
      { role: "system", content: systemPrompt.trim() },
      ...history
        .filter((m) => typeof m.content === "string" && m.content.trim().length > 0)
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.content.trim(),
        })),
      { role: "user", content: userMessage.trim() },
    ];

    // Debug logs (remove in prod if noisy)
    console.log("API key present:", !!process.env.OPENAI_API_KEY);
    console.log("Messages to OpenAI:", JSON.stringify(messages, null, 2));

    // 5. Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // same as your working live setup
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error response:", errText);
      return NextResponse.json(
        { error: "AI service error", details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "…";

    // 6. Save both user & AI messages
    await prisma.message.create({
      data: {
        content: userMessage.trim(),
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
