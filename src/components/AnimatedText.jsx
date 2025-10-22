import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedText (simple + performant)
 * - Slides text upward from below with fade-in when entering viewport
 * - Uses GSAP + ScrollTrigger, performant transform-only animation
 * - Long enough duration so even if scrolled quickly, it’s visible
 */

const AnimatedText = ({ text, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".animated-piece",
        {
          y: 20, // start slightly below
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
          stagger: 0.06,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-text", containerClass)}>
      {text.split("<br />").map((line, i) => (
        <div key={i} className="flex-center flex-wrap gap-1 md:gap-1">
          {line.split(" ").map((word, j) => (
            <span
              key={j}
              className="animated-piece inline-block leading-tight opacity-0 will-change-transform md:text-xl"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;

/* CSS 
-----------------------------------------------------
.animated-text {
  overflow: hidden;
}

.animated-piece {
  display: inline-block;
  transform: translateY(40px);
  opacity: 0;
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .animated-piece {
    transform: none !important;
    opacity: 1 !important;
    transition: none !important;
  }
}
-----------------------------------------------------

Usage:
<AnimatedText text="This text slides up beautifully when visible." />
*/
