import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const { characterId } = await req.json();

  try {
    await prisma.like.create({
      data: {
        userId: session.user.id,
        characterId,
      },
    });
  } catch (err) {
    // Ignore unique constraint error (already liked)
    if (err.code !== "P2002") {
      throw err;
    }
  }

  const count = await prisma.like.count({ where: { characterId } });

  return new Response(JSON.stringify({ liked: true, count }));
}
