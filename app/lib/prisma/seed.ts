import { randUserName, randCatchPhrase, randPhrase } from "@ngneat/falso";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  for (let i = 0; i < 10; i++) {
    await seedUser();
  }
  await seedMessages();
}

// Create one user
async function seedUser() {
  const name = randUserName();
  await prisma.user.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name,
    },
  });
}

// Sends messages from every user to every user
async function seedMessages() {
  const names = (await prisma.user.findMany()).map((user) => user.name);
  for (const sender of names) {
    for (const recipient of names) {
      await prisma.message.create({
        data: {
          topic: randCatchPhrase(),
          body: randPhrase(),
          senderName: sender,
          recipientName: recipient,
        },
      });
    }
  }
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
