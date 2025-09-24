import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function FollowingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div className="p-6">Please log in to see your People.</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { follows: { include: { character: true } } },
  });

  if (!user?.follows?.length) {
    return <div className="p-6">You’re not following anyone yet.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My People</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {user.follows.map(({ character }) => (
          <Link
            key={character.id}
            href={`/characters/${character.id}`}
            className="bg-white rounded-md shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={character.avatarUrl}
              alt={character.name}
              className="w-full h-[180px] object-cover rounded-t-md"
            />
            <div className="p-2">
              <h3 className="font-semibold text-sm">{character.name}</h3>
              <p className="text-xs text-gray-500">{character.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
