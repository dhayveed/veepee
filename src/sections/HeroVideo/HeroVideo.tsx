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
    const video = videoRef.current;
    const mask = maskRef.current;

    if (!section || !video || !mask) return;

    const setup = () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,

            onUpdate(self) {
              if (!video.duration) return;

              video.currentTime = video.duration * self.progress;
            },
          },
        })

        .to(mask, {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          ease: "none",
          duration: 0.2,
        })

        .to({}, { duration: 0.8 });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadeddata", setup, { once: true });
    }
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
            autoPlay
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
          />
        </div>

        <div className="scroll-hint">Scroll to reveal</div>

        <div className="hero-fade" />
      </div>
    </section>
  );
}
