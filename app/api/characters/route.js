import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const characters = await prisma.character.findMany();
  return new Response(JSON.stringify(characters), {
    headers: { "Content-Type": "application/json" },
  });
}
