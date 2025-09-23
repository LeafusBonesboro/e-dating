const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input.trim();
  setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
  setInput("");

  try {
    // Only handle normal chat now
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        characterId,
        userMessage,
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
