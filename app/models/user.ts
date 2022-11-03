import type { User } from "@prisma/client";
import { db } from "~/lib/prisma/db.server";

export async function getUserWithMessages(name: User["name"]) {
  return await db.user.findUnique({
    where: {
      name: name,
    },
    include: {
      sentMessages: true,
      receivedMessages: true,
    },
  });
}

export async function getAllUsers() {
  return await db.user.findMany();
}

export async function doesUserExist(name: User["name"]) {
  const user = await db.user.findUnique({
    where: {
      name: name,
    },
  });
  return user !== null;
}

export async function findOrCreateUser(name: User["name"]) {
  return await db.user.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name,
    },
  });
}
