import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function People() {
  // Example: Fetch characters to show in feed
  const characters = await prisma.character.findMany({
    orderBy: { id: "desc" }, // you can swap to createdAt if you add that column later
  });

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">People</h1>

      <div className="space-y-6">
        {characters.map((char) => (
          <div
            key={char.id}
            className="bg-gray-900 rounded-xl shadow-md p-4 flex gap-4 items-start"
          >
            <img
              src={char.avatarUrl}
              alt={char.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{char.name}</h2>
              <p className="text-sm text-gray-400">{char.bio}</p>
              <div className="mt-2 text-sm text-gray-300">
                <p><strong>Age:</strong> {char.age}</p>
                <p><strong>Nationality:</strong> {char.nationality}</p>
                <p><strong>Hobbies:</strong> {char.hobbies}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
