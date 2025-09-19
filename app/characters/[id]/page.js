"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CharacterProfile() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`/api/characters/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }, [id]);

  if (!character) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <img
        src={character.avatarUrl}
        alt={character.name}
        className="w-40 h-40 object-cover rounded-full mx-auto"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{character.name}</h1>
      <p className="text-gray-700 text-center mt-2">{character.bio}</p>
      <Link href={`/chat/${character.id}`}>
  <button className="mt-6 w-full py-2 px-4 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600">
    Start Chat
  </button>
</Link>
    </div>
  );
}
