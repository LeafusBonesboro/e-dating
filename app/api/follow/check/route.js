import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ isFollowing: false }));

  const { searchParams } = new URL(req.url);
  const characterId = searchParams.get("characterId");

  const follow = await prisma.follow.findFirst({
    where: {
      userId: session.user.id,
      characterId,
    },
  });

  return new Response(JSON.stringify({ isFollowing: !!follow }));
}
