import type { Message } from "@prisma/client";

export interface InboxTableProps {
  messages: Message[];
  setOpened: (message: Message) => void;
}

export default function InboxTable({ messages, setOpened }: InboxTableProps) {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Topic</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => (
          <tr
            key={message.id}
            className="m-4 bg-base-100 shadow-xl p-8 hover cursor-pointer"
            onClick={() => setOpened(message)}
          >
            <td>{message.senderName}</td>
            <td>{message.recipientName}</td>
            <td>{message.topic}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
