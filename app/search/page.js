"use client";
import { useState } from "react";
import { Users, SlidersHorizontal } from "lucide-react";

const mockProfiles = [
  { id: 1, name: "Aisha", age: 25, country: "USA", online: true, image: "/images/Aisha.jpg" },
  { id: 2, name: "Amara", age: 28, country: "India", online: false, image: "/images/Amara.jpg" },
  { id: 3, name: "Camila", age: 22, country: "Brazil", online: true, image: "/images/Camila.jpg" },
  { id: 4, name: "Elena", age: 30, country: "Spain", online: false, image: "/images/Elena.jpg" },
];

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(90);
  const [lookingFor, setLookingFor] = useState("woman");

  const filteredProfiles = mockProfiles.filter((p) => {
    if (tab === "online" && !p.online) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (country && p.country !== country) return false;
    if (p.age < minAge || p.age > maxAge) return false;
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Users size={20} /> Search Profiles
      </h1>

     {/* Nav Tabs */}
<div className="flex gap-4 mb-4 border-b border-gray-700 pb-2">
  <button
    onClick={() => setTab("profiles")}
    className={`capitalize ${
      tab === "profiles" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-400"
    }`}
  >
    Profiles
  </button>

  {["all", "online", "following"].map((t) => (
    <button
      key={t}
      onClick={() => setTab(t)}
      className={`capitalize ${
        tab === t ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-400"
      }`}
    >
      {t}
    </button>
  ))}

  <button
    className="ml-auto flex items-center gap-2 text-gray-300 hover:text-white"
    onClick={() => setFiltersOpen(!filtersOpen)}
  >
    <SlidersHorizontal size={16} /> Filters
  </button>
</div>



      {/* Filters */}
      {filtersOpen && (
        <div className="bg-neutral-900 p-4 rounded-lg mb-6 space-y-3">
          <div>
            <label className="block text-sm mb-1">Country</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. USA"
              className="w-full p-2 rounded bg-neutral-800"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">Min Age</label>
              <input
                type="number"
                value={minAge}
                min={18}
                onChange={(e) => setMinAge(Number(e.target.value))}
                className="w-full p-2 rounded bg-neutral-800"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Max Age</label>
              <input
                type="number"
                value={maxAge}
                max={90}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="w-full p-2 rounded bg-neutral-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Looking For</label>
            <select
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              className="w-full p-2 rounded bg-neutral-800"
            >
              <option value="woman">I am a man looking for a woman</option>
              <option value="man">I am a woman looking for a man</option>
              <option value="both">Open to both</option>
            </select>
          </div>
        </div>
      )}

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search profiles..."
        className="w-full mb-6 p-2 rounded bg-neutral-900"
      />

      {/* Profiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProfiles.map((p) => (
          <div key={p.id} className="bg-neutral-900 rounded-lg overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-2">
              <p className="font-bold">{p.name}, {p.age}</p>
              <p className="text-sm text-gray-400">{p.country}</p>
              {p.online && <span className="text-green-500 text-xs">● Online</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
