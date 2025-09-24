import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { characterId } = await req.json();

  // Check if already following
  const existing = await prisma.follow.findFirst({
    where: {
      userId: session.user.id,
      characterId,
    },
  });

  if (existing) {
    // Unfollow
    await prisma.follow.delete({ where: { id: existing.id } });
    return new Response("Unfollowed", { status: 200 });
  }

  // Follow
  await prisma.follow.create({
    data: {
      userId: session.user.id,
      characterId,
    },
  });

  return new Response("Followed", { status: 200 });
}
