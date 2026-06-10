"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const mask = maskRef.current;
    const video = videoRef.current;

    if (!section || !mask || !video) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=900",
        scrub: true,
      },
    });

    tl.to(mask, {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease: "power2.out",
    });

    video.play().catch(() => {});

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-video-section">
      <div className="hero-video-sticky">
        <div className="hero-logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>

        <div ref={maskRef} className="video-mask">
          <video
            ref={videoRef}
            className="hero-video"
            src="/video/hero_video.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />
        </div>

        <div className="scroll-hint">Scroll to reveal</div>

        <div className="hero-fade" />
      </div>
    </section>
  );
}
