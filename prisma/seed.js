// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const characters = [
    {
      name: "Sophia",
      bio: "25-year-old artist from Brooklyn",
      avatarUrl: "https://placehold.co/200x200?text=Sophia",
      loraToken: "sophia-style"
    },
    {
      name: "Maya",
      bio: "Witty writer who enjoys coffee shop dates",
      avatarUrl: "https://placehold.co/200x200?text=Maya",
      loraToken: "maya-style"
    },
    {
      name: "Aria",
      bio: "Gamer girl who streams on weekends",
      avatarUrl: "https://placehold.co/200x200?text=Aria",
      loraToken: "aria-style"
    }
  ];

  for (const char of characters) {
    await prisma.character.upsert({
      where: { name: char.name },
      update: {},
      create: char,
    });
  }

  console.log("✅ Seeded characters!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
