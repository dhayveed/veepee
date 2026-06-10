"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WeddingDetails() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items =
      sectionRef.current?.querySelectorAll(
        ".reveal"
      );

    if (!items?.length) return;

    gsap.from(items, {
      y: 40,
      opacity: 0,

      stagger: 0.15,

      duration: 1.2,

      ease: "power3.out",

      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="details-section"
    >
      <div className="details-spacer" />

      <img
        src="/images/backgrounds/divider.png"
        alt=""
        className="details-divider reveal"
      />

      <p className="details-day reveal">
        SUNDAY
      </p>

      <h2 className="details-date reveal">
        21 June 2026
      </h2>

      <p className="details-time reveal">
        Two O&apos;Clock In The Afternoon
      </p>

      <div className="details-star reveal">
        ✦
      </div>

      <h3 className="details-venue reveal">
        Arlington Hotels
      </h3>

      <p className="details-address reveal">
        166 Bakori Road,
        <br />
        PW, Abuja 901101
      </p>

      <p className="details-location reveal">
        Abuja, Nigeria
      </p>

      <a
        href="https://maps.app.goo.gl/gFXbwZwUCuRrTiSx6?g_st=ipc"
        target="_blank"
        rel="noopener noreferrer"
        className="details-button reveal"
      >
        View on Google Maps
      </a>
    </section>
  );
}
