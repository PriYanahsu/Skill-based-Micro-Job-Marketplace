"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/UserContext";

interface Props {
  params: { jobId: string };
}

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const ChatPage: React.FC<Props> = ({ params }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Seed demo messages
    setMessages([
      {
        id: "1",
        author: "Customer",
        text: "Hi, can you share a quick progress update?",
        timestamp: "Now",
      },
      {
        id: "2",
        author: "Worker",
        text: "Yes, uploading the proof shortly.",
        timestamp: "Now",
      },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), author: user?.name || "You", text: text.trim(), timestamp: "Just now" },
    ]);
    setText("");
  };

  return (
    <div className="container py-10 md:py-14">
      <h1 className="text-2xl font-bold mb-4">Chat — Job {params.jobId}</h1>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 md:p-6 space-y-4">
        <div className="h-72 md:h-80 overflow-auto rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-3 text-sm">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-md bg-white px-3 py-2 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-800">{msg.author}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="text-slate-700 mt-1">{msg.text}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-sky-700"
            onClick={send}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
