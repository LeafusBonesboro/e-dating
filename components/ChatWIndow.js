"use client";
import { useState } from "react";

export default function ChatWindow({ characterId, characterName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", content: userMessage }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ characterId, userMessage }),
    });

    const data = await res.json();
    if (data.reply) {
      setMessages((prev) => [
        ...prev,
        { sender: "character", content: data.reply },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-black/30 p-4">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[75%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            <strong>{msg.sender === "user" ? "You" : characterName}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg p-2 bg-gray-900 text-white"
          placeholder="Say something..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-600 text-white px-4 rounded-lg hover:bg-pink-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
