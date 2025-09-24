"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function FollowButton({ characterId }) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if user already follows this character
  useEffect(() => {
    if (!session) return;

    const checkFollow = async () => {
      const res = await fetch(`/api/follow/check?characterId=${characterId}`);
      if (res.ok) {
        const data = await res.json();
        setIsFollowing(data.isFollowing);
      }
    };

    checkFollow();
  }, [session, characterId]);

  // Toggle follow/unfollow
  const toggleFollow = async () => {
    if (!session) return alert("You must be signed in to follow");

    const res = await fetch(`/api/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ characterId }),
    });

    if (res.ok) {
      setIsFollowing((prev) => !prev);
    }
  };

  return (
    <button
  onClick={toggleFollow}
  className={`text-sm px-3 py-1 rounded font-medium transition ${
    isFollowing
      ? "bg-pink-500 text-white hover:bg-pink-600"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
  }`}
>
  {isFollowing ? "Following" : "Follow"}
</button>

  );
}
