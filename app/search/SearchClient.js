"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchClient({ characters }) {
  const [query, setQuery] = useState("");

  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search profiles..."
          className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((char) => (
          <Link
            key={char.id}
            href={`/characters/${char.id}`}
            className="bg-gray-800 rounded-lg shadow hover:scale-105 transition transform duration-200"
          >
            <img
              src={char.avatarUrl}
              alt={char.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold">{char.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
