import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: params.id },
    });
    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }
    return NextResponse.json(character);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch character" }, { status: 500 });
  }
}
