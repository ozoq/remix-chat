import type { Message } from "@prisma/client";
import { db } from "~/lib/prisma/db.server";

export async function createMessage({
  senderName,
  recipientName,
  topic,
  body,
}: Pick<Message, "senderName" | "recipientName" | "topic" | "body">) {
  return await db.message.create({
    data: {
      sender: {
        connectOrCreate: {
          where: { name: senderName },
          create: { name: senderName },
        },
      },
      recipient: {
        connectOrCreate: {
          where: { name: recipientName },
          create: { name: recipientName },
        },
      },
      topic,
      body,
    },
  });
}
