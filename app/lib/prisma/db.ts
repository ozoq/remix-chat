import { PrismaClient } from "@prisma/client";

declare global {
  var __db: PrismaClient | undefined;
}

function initProductionPrismaClient() {
  return new PrismaClient();
}

function initDevelopmentPrismaClient() {
  if (global.__db === undefined) {
    return (global.__db = new PrismaClient());
  }
  global.__db?.$connect();
  return global.__db;
}

const db =
  process.env.NODE_ENV === "production"
    ? initProductionPrismaClient()
    : initDevelopmentPrismaClient();

export { db };
