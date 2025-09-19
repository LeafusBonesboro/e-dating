"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  if (characters.length === 0) {
    return <p className="p-8 text-center">No characters yet... check back soon!</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Meet the AI Women</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => (
          <Link key={char.id} href={`/characters/${char.id}`}>
            <div className="rounded-2xl shadow-md bg-white hover:shadow-xl transition p-4 cursor-pointer">
              <img
                src={char.avatarUrl}
                alt={char.name}
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
              <h2 className="text-xl font-semibold text-center mt-3">{char.name}</h2>
              <p className="text-gray-600 text-sm text-center line-clamp-2">
                {char.bio}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
