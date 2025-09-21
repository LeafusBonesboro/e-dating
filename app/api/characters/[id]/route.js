"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfileGrid({ title, profiles }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;

  const start = page * itemsPerPage;
  const visibleProfiles = profiles.slice(start, start + itemsPerPage);

  const hasPrev = page > 0;
  const hasNext = start + itemsPerPage < profiles.length;

  return (
    <section className="mb-12 relative">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="text-pink-500 text-sm hover:underline">See All</button>
      </div>

      <div className="grid grid-cols-6 gap-4 px-2">
        {visibleProfiles.map((profile) => (
          <Link key={profile.id} href={`/characters/${profile.id}`}>
            <div className="bg-white rounded-md shadow hover:shadow-lg transition cursor-pointer">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-[137px] object-cover rounded-t-md"
              />
              <div className="p-2">
                <h3 className="font-semibold text-sm">{profile.name}</h3>
                <p className="text-xs text-gray-500">{profile.bio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasPrev && (
        <button
          onClick={() => setPage((p) => p - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
        >
          ◀
        </button>
      )}
      {hasNext && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
        >
          ▶
        </button>
      )}
    </section>
  );
}
