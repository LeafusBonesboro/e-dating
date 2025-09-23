"use client";
import { useState } from "react";

export default function ChatWindow({ characterId, characterName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
    setInput("");

    try {
      if (userMessage.startsWith("/image")) {
        const prompt = userMessage.replace("/image", "").trim();

        setMessages((prev) => [
          ...prev,
          { sender: characterName, text: "⚡ Generating image..." },
        ]);

        const res = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, characterName }),
        });

        const data = await res.json();
        if (data.url) {
          setMessages((prev) => [
            ...prev,
            { sender: characterName, image: data.url },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: characterName, text: "❌ Image generation failed." },
          ]);
        }
      } else {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ characterId, userMessage }), // 👈 fixed key
        });

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: characterName, text: data.reply || "..." },
        ]);
      }
    } catch (err) {
      console.error("Message error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: characterName, text: "⚠️ Something went wrong." },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender}: </strong>
            {msg.text && <span>{msg.text}</span>}
            {msg.image && (
              <img
                src={msg.image}
                alt="Generated"
                className="mt-2 rounded-lg max-w-xs"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex p-2 border-t border-gray-700">
        <input
          className="flex-1 p-2 rounded bg-gray-900 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message... (or /image beach)"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-pink-600 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
