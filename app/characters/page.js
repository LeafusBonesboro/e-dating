import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function CharactersPage() {
  const characters = await prisma.character.findMany();

  return (
    <div className="p-6 grid grid-cols-6 gap-4">
      {characters.map((char) => (
        <Link
          key={char.id}
          href={`/characters/${char.id}`}
          className="bg-gray-900 p-4 rounded shadow hover:shadow-lg transition"
        >
          <img
            src={char.avatarUrl}
            alt={char.name}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="mt-2 font-semibold">{char.name}</h2>
        </Link>
      ))}
    </div>
  );
}
