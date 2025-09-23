import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, characterId } = await req.json();

    // Get character from DB
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 }
      );
    }

    // Build contextual prompt
    const fullPrompt = `
    ${character.name}, a ${character.age}-year-old ${character.nationality} woman 
    with ${character.hairColor} hair and ${character.eyeColor} eyes. 
    She enjoys ${character.hobbies}.
    Scene: ${prompt}.
    `;

    console.log("🖼️ Generating image with prompt:", fullPrompt);

    const result = await openai.images.generate({
      model: "gpt-image-1", // or "dall-e-3"
      prompt: fullPrompt,
      size: "1024x1024", // supported sizes only
    });

    // OpenAI only returns base64 or URL depending on your plan
    let imageUrl = result.data[0]?.url || null;

    if (!imageUrl && result.data[0]?.b64_json) {
      // Save base64 image to /public/generated
      const buffer = Buffer.from(result.data[0].b64_json, "base64");
      const fs = require("fs");
      const path = require("path");
      const fileName = `gen-${Date.now()}.png`;
      const filePath = path.join(process.cwd(), "public/generated", fileName);
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/generated/${fileName}`;
    }

    if (!imageUrl) {
      throw new Error("No image returned by OpenAI");
    }

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error("❌ OpenAI Image generation failed:", err);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
