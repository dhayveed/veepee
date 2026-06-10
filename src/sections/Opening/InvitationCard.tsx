"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useAudio } from "@/lib/AudioContext";

type Props = {

  onOpen: () => void;
};

export default function InvitationCard({
  onOpen,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
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

    tl.to(cardRef.current, {
      rotateY: -180,
      duration: 1.5,
      ease: "power3.inOut",
    });
  };

  return (
    <div className="opening-screen">
      <div className="card-scene">
        <div
          ref={cardRef}
          className="invitation-card"
        >
          <div className="card-front">
            <button
              ref={sealRef}
              className="seal-button"
              onClick={handleOpen}
            >
              Seal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
