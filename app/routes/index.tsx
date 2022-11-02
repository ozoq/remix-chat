import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/lib/prisma/db";

export async function loader() {
  const messages = await db.message.findMany();
  return json({ messages });
}

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <div>
      {messages.map(({ id, topic, body, senderName, recipientName }) => (
        <div key={id}>
          <p>{topic}</p>
          <p>{body}</p>
          <p>{senderName}</p>
          <p>{recipientName}</p>
        </div>
      ))}
    </div>
  );
}
