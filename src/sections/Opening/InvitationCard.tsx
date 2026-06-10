"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useAudio } from "@/lib/AudioContext";

type Props = {
  onOpen: () => void;
};

export default function InvitationCard({ onOpen }: Props) {
  const curtainRef = useRef<HTMLDivElement>(null);
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
      duration: 0.35,
      ease: "power2.out",
    });

    tl.to(
      curtainRef.current,
      {
        y: "100%",
        duration: 1.6,
        ease: "power4.inOut",
      },
      "-=0.1",
    );
  };

  return (
    <div className="opening-screen">
      <div ref={curtainRef} className="curtain">
        <button ref={sealRef} className="seal-button" onClick={handleOpen}>
          <img src="/images/seal.png" alt="Seal" />
        </button>

        <p className="tap-text">Tap Seal To Open</p>
      </div>
    </div>
  );
}
