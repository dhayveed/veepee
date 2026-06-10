"use client";

import { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay } from "swiper/modules";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Lightbox from "yet-another-react-lightbox";


import "swiper/css";
import "swiper/css/pagination";
import "yet-another-react-lightbox/styles.css";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
];

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    gsap.from(".gallery-header", {
      y: 60,
      opacity: 0,

      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.fromTo(
      sectionRef.current,
      {
        y: 150,
      },
      {
        y: 0,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="gallery-section"
    >
      <div className="gallery-handle" />
      <div className="gallery-header">
        <h2>PhotoReel</h2>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2800,
          disableOnInteraction: true,
        }}
        slidesPerView={1.08}
        speed={1200}
        centeredSlides
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
      >
        {images.map((image, i) => (
          <SwiperSlide key={image}>
            <div
              className="gallery-card"
              onClick={() => setIndex(i)}
            >
              <img
                src={image}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((src) => ({
          src,
        }))}
      />
    </section>
  );
}
