// app/page.js
import { PrismaClient } from "@prisma/client";
import ProfileGrid from "@/components/ProfileGrid";

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch directly from DB on the server
  const profiles = await prisma.character.findMany();

  return (
    <div className="p-6 space-y-12">
      <ProfileGrid title="My Favorites" profiles={profiles} />
      <ProfileGrid title="Recommended" profiles={profiles} />
      <ProfileGrid title="New Members" profiles={profiles} />
    </div>
  );
}
