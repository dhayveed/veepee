"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MASK_PHASE_RATIO = 0.2;

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

    let timeline: gsap.core.Timeline;

    const setup = () => {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate(self) {
            const duration = video.duration;

            if (!duration) return;

            video.currentTime =
              duration * self.progress;
          },
        },
      });

      // video.play().catch(() => {});
      // video.pause();

      timeline.to(mask, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 0.2,
      });


      timeline.to({}, { duration: 0.8 });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-video-section"
    >
      <div className="hero-video-sticky">
        <div
          ref={maskRef}
          className="video-mask"
        >
          <video
            ref={videoRef}
            className="hero-video"
            src="/video/hero_video.mp4"
            muted
            preload="auto"
            playsInline
          />
        </div>
        <div className="hero-fade" />
      </div>
    </section>
  );
}
