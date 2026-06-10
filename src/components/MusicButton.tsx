"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useAudio } from "@/lib/AudioContext";
import AudioWaves from "@/components/AudioWaves";

export default function MusicButton() {
  const { toggle, isPlaying } = useAudio();

  const buttonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const waves =
      buttonRef.current.querySelectorAll(".wave");

    if (isPlaying) {
      gsap.to(waves, {
        scaleY: () =>
          gsap.utils.random(0.4, 1.5),

        duration: 0.35,

        repeat: -1,
        yoyo: true,

        stagger: {
          each: 0.05,
          repeatRefresh: true,
        },

        transformOrigin: "center center",

        ease: "sine.inOut",
      });
    } else {
      gsap.killTweensOf(waves);

      gsap.to(waves, {
        scaleY: 1,
        duration: 0.2,
      });
    }

    return () => {
      gsap.killTweensOf(waves);
    };
  }, [isPlaying]);

  return (
    <button
      ref={buttonRef}
      className="music-button"
      onClick={toggle}
      aria-label={
        isPlaying
          ? "Pause music"
          : "Play music"
      }
    >
      <AudioWaves />
    </button>
  );
}
