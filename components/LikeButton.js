"use client";
import { useState } from "react";

export default function LikeButton({ characterId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleClick = async () => {
    const res = await fetch("/api/like", {
      method: "POST",
      body: JSON.stringify({ characterId }),
    });
    const data = await res.json();

    if (data.liked) {
      setLiked(true);
      setLikes((prev) => prev + 1);
    } else {
      setLiked(false);
      setLikes((prev) => prev - 1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded ${
        liked ? "bg-pink-500 text-white" : "hover:bg-gray-100"
      }`}
    >
      {liked ? "Unlike" : "Like"} ({likes})
    </button>
  );
}
