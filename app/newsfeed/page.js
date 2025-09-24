import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";
import LikeButton from "@/components/LikeButton"; // ⬅️ import it

const prisma = new PrismaClient();

export default async function NewsfeedPage() {
  const characters = await prisma.character.findMany({
    orderBy: { id: "desc" },
    include: {
      _count: {
        select: { likes: true }, // ⬅️ fetch how many likes each character has
      },
    },
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}

      <main className="flex-1 max-w-2xl mx-auto p-6 space-y-6">
        {characters.map((char) => (
          <div key={char.id} className="bg-white rounded-lg shadow p-4">
            {/* Post header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={char.avatarUrl}
                  alt={char.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">{char.name}</span>
              </div>
              <FollowButton characterId={char.id} />
            </div>

            {/* Post text */}
            <p className="mb-3 text-gray-700">{char.bio}</p>

            {/* Post image */}
            <img
              src={char.avatarUrl}
              alt={char.name}
              className="w-full rounded-lg object-cover mb-3"
            />

            {/* Actions */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>👍 {char._count.likes} people liked this</span>
              <div className="flex gap-2">
                <LikeButton
                  characterId={char.id}
                  initialLiked={false} // later we’ll fetch per-user like status
                />
                <Link
                  href={`/characters/${char.id}`}
                  className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
