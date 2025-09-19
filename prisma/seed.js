const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const characters = [
    {
      name: "Sophia",
      bio: "25-year-old artist from Brooklyn",
      avatarUrl: "/images/Sophia.jpg",
      loraToken: "sophia-style",
    },
    {
      name: "Maya",
      bio: "Travel blogger who loves exploring new cultures",
      avatarUrl: "/images/Maya.jpg",
      loraToken: "maya-style",
    },
    {
      name: "Lila",
      bio: "Tech enthusiast and gamer from San Francisco",
      avatarUrl: "/images/Lila.jpg",
      loraToken: "lila-style",
    },
  ];

  for (const char of characters) {
    await prisma.character.upsert({
      where: { name: char.name },
      update: {
        bio: char.bio,
        avatarUrl: char.avatarUrl,
        loraToken: char.loraToken,
      },
      create: char,
    });
  }
}

main()
  .then(() => console.log("✅ Seeding complete!"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
