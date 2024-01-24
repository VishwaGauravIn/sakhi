"use client";

import { SendIcon } from "lucide-react";
import React from "react";
import { FaFemale } from "react-icons/fa";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="relative h-[calc(100vh-190px)] overflow-y-auto hide-scrollbar">
      <main className="flex-1 flex flex-col gap-4 py-4">
        <SakhiMessage message="Hi, I am Sakhi Bot. I am here to help you regarding female wellness." />
        {messages.map((m, index) =>
          m.role !== "user" ? (
            <SakhiMessage message={m.content} key={index} />
          ) : (
            <UserMessage message={m.content} key={index} />
          )
        )}
      </main>
      <footer className="flex items-center h-16 shrink-0 md:px-6 fixed bottom-16 w-[calc(100vw-10px)] gap-2 pr-2 bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex-1 ml-auto sm:flex-initial h-10 w-full"
        >
          <div className="relative h-full flex w-full">
            <FaFemale className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              className="pl-8 w-full h-full pr-2 outline-none"
              placeholder="Type your message..."
              required
              value={input}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button className="rounded-full" size="icon" variant="ghost">
          <SendIcon className="w-6 h-6 stroke-pink-500" />
          <span className="sr-only">Send message</span>
        </button>
      </footer>
    </div>
  );
}

function SakhiMessage({ message, key }) {
  return (
    <div key={key} className="flex items-end">
      <img src="/logo.png" alt="" className="mr-2 w-6 h-6 self-start mt-3" />
      <div className="rounded-lg bg-pink-100 p-4">
        <p className="text-sm whitespace-pre-wrap max-w-[80vw]">{message}</p>
      </div>
    </div>
  );
}

function UserMessage({ message, key }) {
  return (
    <div key={key} className="flex items-end justify-end">
      <div className="rounded-lg bg-blue-100 p-4">
        <p className="text-sm whitespace-pre-wrap max-w-[80vw]">{message}</p>
      </div>
    </div>
  );
}
