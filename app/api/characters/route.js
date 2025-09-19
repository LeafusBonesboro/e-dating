// app/api/characters/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/characters → return all characters
export async function GET() {
  try {
    const characters = await prisma.character.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(characters);
  } catch (err) {
    console.error("Error fetching characters:", err);
    return NextResponse.json({ error: "Failed to load characters" }, { status: 500 });
  }
}
