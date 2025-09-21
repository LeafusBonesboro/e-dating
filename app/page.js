// app/page.js
import ProfileGrid from "@/components/ProfileGrid";

// temporary mock data (later replace with DB results)
const mockProfiles = Array.from({ length: 20 }).map((_, i) => ({
  name: `Profile ${i + 1}`,
  tagline: "Sample tagline here",
  image: `https://via.placeholder.com/300x200?text=Profile+${i + 1}`,
}));

export default function Home() {
  return (
    <div className="p-6 space-y-12">
      <ProfileGrid title="My Favorites" profiles={mockProfiles} />
      <ProfileGrid title="Recommended" profiles={mockProfiles} />
      <ProfileGrid title="New Members" profiles={mockProfiles} />
    </div>
  );
}
