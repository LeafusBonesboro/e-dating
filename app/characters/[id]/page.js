import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function generateStaticParams() {
  // Fetch all characters to generate their routes
  const characters = await prisma.character.findMany({
    select: { id: true }, // only grab the ID
  });

  return characters.map((char) => ({
    id: char.id,
  }));
}

export default async function CharacterPage({ params }) {
  const { id } = await params;

  const character = await prisma.character.findUnique({
    where: { id },
  });

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
      <img
        src={character.avatarUrl}
        alt={character.name}
        className="w-64 h-64 object-cover rounded-lg mb-4"
      />
      <p><strong>Age:</strong> {character.age}</p>
      <p><strong>Nationality:</strong> {character.nationality}</p>
      <p><strong>Hair:</strong> {character.hairColor}</p>
      <p><strong>Eyes:</strong> {character.eyeColor}</p>
      <p><strong>Hobbies:</strong> {character.hobbies}</p>
      <p className="mt-4">{character.bio}</p>
    </div>
  );
}

