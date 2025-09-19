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

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {characters.map((char) => (
        <div
          key={char.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
  src={char.avatarUrl}
  alt={char.name}
  className="w-full aspect-square object-cover rounded-t-lg"
/>



          <div className="p-4">
            <h2 className="text-lg font-bold">{char.name}</h2>
            <p className="text-gray-600">{char.bio}</p>
            <Link
              href={`/chat/${char.id}`}
              className="mt-3 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Start Chat
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
