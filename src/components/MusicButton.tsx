"use client";

import { useAudio } from "@/lib/AudioContext";

export default function MusicButton() {
  const { toggle, isPlaying } = useAudio();

  return (
    <button
      className="music-button"
      onClick={toggle}
    >
      {isPlaying ? "♫" : "♪"}
    </button>
  );
}
