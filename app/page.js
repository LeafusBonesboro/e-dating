import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function HomePage() {
  const characters = await prisma.character.findMany({
  orderBy: { id: "desc" }, // newest first by ID
});


  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar (reuse same as before) */}
      

      {/* Newsfeed */}
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
              <button className="text-sm px-3 py-1 border rounded hover:bg-gray-100">
                Follow
              </button>
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
              <span>👍 {Math.floor(Math.random() * 50)} people liked this</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded hover:bg-gray-100">Like</button>
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
