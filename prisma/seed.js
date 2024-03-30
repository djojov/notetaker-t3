import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      create: {
        topics: {
          create: {
            id: "1",
            title: "Notes",
          },
        },
      },
      update: {},
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// package.json
// "prisma": {
//    "seed": "npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.js"
//  },
