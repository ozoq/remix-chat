import { useState } from "react";
import type { Message } from "@prisma/client";
import InboxTable from "./InboxTable";
import Tab from "./Tab";
import NewMessageForm from "../forms/NewMessageForm";
import MessageView from "./MessageView";

export interface InboxProps {
  sent: Message[];
  recieved: Message[];
}

export default function Inbox({ sent, recieved }: InboxProps) {
  const [opened, setOpened] = useState<Message | null>(null);
  const [tab, setTab] = useState<"sent" | "recieved" | "new">("recieved");

  function onTabClick(name: typeof tab) {
    setTab(name);
    setOpened(null);
  }

  function isTabActive(name: typeof tab) {
    return tab === name && !opened;
  }

  return (
    <div className="flex gap-4">
      <div className="btn-group btn-group-vertical">
        <Tab
          isActive={isTabActive("recieved")}
          onClick={() => onTabClick("recieved")}
        >
          Recieved
        </Tab>
        <Tab isActive={isTabActive("sent")} onClick={() => onTabClick("sent")}>
          Sent
        </Tab>
        <Tab isActive={isTabActive("new")} onClick={() => onTabClick("new")}>
          New
        </Tab>
      </div>
      {/* This should be done with a router, why else use remix huh? */}
      {opened ? (
        <MessageView message={opened} />
      ) : tab === "new" ? (
        <NewMessageForm />
      ) : (
        <InboxTable
          messages={tab === "sent" ? sent : recieved}
          setOpened={setOpened}
        />
      )}
    </div>
  );
}
