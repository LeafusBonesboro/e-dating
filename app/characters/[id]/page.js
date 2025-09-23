// app/characters/[id]/page.js
import { PrismaClient } from "@prisma/client";
import ChatWindow from "@/components/ChatWindow";

const prisma = new PrismaClient();

export default async function CharacterPage({ params }) {
  const { id } = params;
  const character = await prisma.character.findUnique({ where: { id } });

  if (!character) return <div>Character not found</div>;

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left: Profile Info */}
        <div>
          <img
            src={character.avatarUrl}
            alt={character.name}
            className="w-full max-w-sm rounded-2xl shadow-lg mb-6"
          />
          <h1 className="text-4xl font-extrabold mb-4">{character.name}</h1>
          <p className="text-lg mb-2"><strong>Age:</strong> {character.age}</p>
          <p className="text-lg mb-2"><strong>Nationality:</strong> {character.nationality}</p>
          <p className="text-lg mb-2"><strong>Hair:</strong> {character.hairColor}</p>
          <p className="text-lg mb-2"><strong>Eyes:</strong> {character.eyeColor}</p>
          <p className="text-lg mb-2"><strong>Hobbies:</strong> {character.hobbies}</p>
          <p className="mt-6 text-gray-300">{character.bio}</p>
        </div>

        {/* Right: Chatbox */}
        <div className="bg-gray-800 rounded-2xl shadow-xl flex flex-col h-[600px]">
          <div className="px-4 py-3 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Chat with {character.name}</h2>
          </div>
          <div className="flex-1 p-4">
            <ChatWindow characterId={character.id} characterName={character.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
