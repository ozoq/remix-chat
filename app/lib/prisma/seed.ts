import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  // create stuff
}

(async () => {
  try {
    await seed();
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();