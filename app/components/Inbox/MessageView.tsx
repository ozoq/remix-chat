import type { Message } from "@prisma/client";

export interface MessageViewProps {
  message: Message;
}

export default function MessageView({ message }: MessageViewProps) {
  return (
    <div className="card bg-base-200 shadow-xl flex-1">
      <div className="card-body gap-5">
        <div className="card-title flex-col items-start">
          <p>{message.senderName}</p>
          <h1 className="text-2xl font-bold">{message.topic}</h1>
        </div>

        <p>{message.body}</p>
      </div>
    </div>
  );
}
