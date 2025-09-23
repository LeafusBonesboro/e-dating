"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input.trim();
  setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
  setInput("");

  try {
    // Normal chat → call /api/chat
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        characterId,       // ✅ stays the same
        userMessage,       // ✅ now matches your API route
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { sender: characterName, text: data.reply || "..." },
    ]);
  } catch (err) {
    console.error("Message error:", err);
    setMessages((prev) => [
      ...prev,
      { sender: characterName, text: "⚠️ Something went wrong." },
    ]);
  }
};


  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg p-2"
          placeholder="Say something..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-4 rounded-lg hover:bg-pink-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
