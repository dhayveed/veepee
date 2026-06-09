// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function HeroVideo() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const maskRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.to(maskRef.current, {
//       width: "90vw",
//       height: "80vh",
//       borderRadius: "24px",

//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="hero-video-section"
//     >
//       <div className="hero-video-sticky">
//         <div
//           ref={maskRef}
//           className="video-mask"
//         >
//           <video
//             className="hero-video"
//             src="/video/hero_video.mp4"
//             muted
//             autoPlay
//             loop
//             playsInline
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

export default function HeroVideo() {
  return (
    <section className="hero-video-section">
      <div className="hero-video-sticky">
        <div className="video-mask">
          <video
            className="hero-video"
            src="/video/hero_video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
}
