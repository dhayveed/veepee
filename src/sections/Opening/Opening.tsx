"use client";

import { useAudio } from "@/lib/AudioContext";

import { useRef } from "react";
import gsap from "gsap";



type OpeningProps = {
  onOpen: () => void;
};

export default function Opening({ onOpen }: OpeningProps) {
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);

  const { play } = useAudio();

  const handleOpen = () => {
    play();
    const tl = gsap.timeline({
      onComplete: onOpen,

    });

    tl.to(sealRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
    });

    tl.to(
      leftDoorRef.current,
      {
        rotateY: -110,
        duration: 1.3,
        ease: "power3.inOut",
      },
      "-=0.1"
    );

    tl.to(
      rightDoorRef.current,
      {
        rotateY: 110,
        duration: 1.3,
        ease: "power3.inOut",
      },
      "<"
    );
  };

  return (
    <div className="opening-screen">
      <div
        ref={leftDoorRef}
        className="door left-door"
      />

      <div
        ref={rightDoorRef}
        className="door right-door"
      />

      <button
        ref={sealRef}
        className="seal-button"
        onClick={handleOpen}
      >
        Seal
      </button>

      <p className="tap-text">
        Tap to Open
      </p>
    </div>
  );
}
